
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Block = require("./block");
	var Animation = require("./animation");
	var Link = require("./link");

	function addOrRemoveBlock(active, block) {
		if(block.isActive()) {
			active.push(block.__key);
		}
		else if(active.indexOf(block.__key) !== -1) {
			active.splice(active.indexOf(block.__key), 1);
		}		
	}

	var Grid = function(game, colours) {
		this.game = game;
		this.colours = colours;
		this.level = null;
		this.tile = 0;
		this.blocks = {};
		this.animations = [];
		this.linked = [];
	};

	Grid.prototype.render = function(level) {
		this.level = level;
		this.tile = parseInt(constants.PLAY_AREA_SIZE / this.level.size, 10) - constants.PAD;

		var colour = 0;
		var currentX = currentY = constants.PAD_HALF;

		for(var y = 0; y < this.level.size; ++y) {
			currentX = constants.PAD_HALF;

			for(var x = 0; x < this.level.size; ++x) {
				var key = helpers.guid();

				this.blocks[key] = new Block(key, this.game, currentX, currentY, this.tile, this.tile, this.level.grid[colour++], this.colours);

				currentX += this.tile + constants.PAD;
			}

			currentY += this.tile + constants.PAD;
		}
	};

	Grid.prototype.activate = function(x, y) {
		var active = [];

		// check for existing active first to prevent more than the max being clicked
		for(var key in this.blocks) {
			addOrRemoveBlock(active, this.blocks[key]);
		}

		// TODO warn the user by flashing or something if they can't select another thing

		// activate or deactivate
		for(var key in this.blocks) {
			var block = this.blocks[key];

			if(block.contains(x, y)) {
				console.log("HIT: " + key)
				if(active.length < constants.MAX_ACTIVE) {
					block.toggleActive();
				}
				else {
					block.setActive(false);
				}
				
				addOrRemoveBlock(active, block);
			}			
		}

		if(active.length == constants.MAX_ACTIVE) {
			if(this.blocks[active[0]].adjacent(this.blocks[active[1]])) {
				console.log("CONNECT!")

				var nextColour = this.level.nextSequence(this.blocks[active[0]].colour);

				this.animations.push(new Animation(this.blocks[active[0]], this.blocks[active[1]], nextColour, function(x, y, w, h) {
					this.blocks[active[0]].setColour(nextColour);
					this.blocks[active[1]].setColour(nextColour);

					// TODO link blocks together
					// TODO quads should be fully merged

					//var linked = [active[0], active[1]];

					/*this.linked.forEach(function(link) {
						if(link.has(active[0]) || link.has(active[1])) {
							this.blocks[active[0]].link(link);
							this.blocks[active[0]].link(link);
						}
					})*/


					// no links yet
					var link = new Link();

					this.blocks[active[0]].addLink(link);
					this.blocks[active[1]].addLink(link);

					this.linked.push(link);


					debugLinks(this.linked)
					//debugBlocks(this.blocks)

				}.bind(this)));
			}
		}
	};

	Grid.prototype.update = function(elapsed) {
		this.animations.forEach(function(animation) {
			// TODO remove and destroy if complete
			animation.animate(elapsed);
		});
	};

	function debugLinks(linked) {
		linked.forEach(function(l) {
			l.links.forEach(function(b) {
				console.log(debugBlock(b))
			})
		});
	}

	function debugBlocks(blocks) {
		var a = []

		for(var k in blocks) {
			a.push(debugBlock(blocks[k]))
		}

		console.log(a)
	}

	function debugBlock(block) {
		var c = "";

		if(block.colour == constants.COLOURS.RED)
			c = "RED"
		else if(block.colour == constants.COLOURS.GREEN)
			c = "GREEN"
		else if(block.colour == constants.COLOURS.BLUE)
			c = "BLUE"

		return {
			key: block.__key,
			x: block.x,
			y: block.y,
			width: block.width,
			height: block.height,
			colour: c
		};
	}

	// TODO destroy

	return Grid;
});
