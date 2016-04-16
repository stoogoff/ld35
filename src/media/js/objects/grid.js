
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
		this.links = [];
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
console.log("active.length = " + active.length)
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
				var blockLeft = this.blocks[active[0]];
				var blockRight = this.blocks[active[1]];

				console.log("CONNECT!")

				var nextColour = this.level.nextSequence(blockLeft.colour);

				this.animations.push(new Animation(blockLeft, blockRight, nextColour, function() {
					blockLeft.setColour(nextColour);
					blockRight.setColour(nextColour);

					// TODO link blocks together
					// TODO quads should be fully merged

					//var linked = [active[0], active[1]];
					var linkAdded = false;

					var linkLeft = this.getLinkForBlock(blockLeft.__key);
					var linkRight = this.getLinkForBlock(blockRight.__key);

					if(linkLeft && linkRight) {
						// TODO merge
					}
					else if(linkLeft && !linkRight) {
						console.log("found left link, adding right")
						blockRight.addLink(linkLeft);
						linkAdded = true;
					}
					else if(!linkLeft && linkRight) {
						console.log("found right link, adding left")
						blockLeft.addLink(linkRight);
						linkAdded = true;
					}

					// no links yet, create new
					if(!linkAdded) {
						console.log("adding new link")
						var link = new Link();

						this.blocks[active[0]].addLink(link);
						this.blocks[active[1]].addLink(link);

						this.links.push(link);
					}


					debugLinks(this.links)
					//debugBlocks(this.blocks)

				}.bind(this)));
			}
		}
	};

	Grid.prototype.getLinkForBlock = function(key) {
		for(var i = 0, len = this.links.length; i < len; ++i) {
			if(this.links[i].has(key)) {
				console.log("found link for " + key)
				return this.links[i];
			}
		}

		console.log("no link found for " + key)

		return null;
	};

	Grid.prototype.update = function(elapsed) {
		var complete = 0;

		this.animations.forEach(function(animation) {
			// TODO remove and destroy if complete
			if(animation.animate(elapsed)) {
				animation.destroy();
				complete++;
			}
		});

		if(complete == this.animations.length) {
			this.animations = [];
		};
	};

	// TODO destroy

	return Grid;
});



function debugLinks(linked) {
	console.log("LINKS")
	linked.forEach(function(l) {
		l.links.forEach(function(b) {
			console.log(debugBlock(b))
		})
	});
	console.log("--")
}

function debugBlocks(blocks) {
	console.log("BLOCKS")
	var a = []

	for(var k in blocks) {
		a.push(debugBlock(blocks[k]))
	}

	console.log(a)
	console.log("--")
}

function debugBlock(block) {
	var c = "";

	if(block.colour == "#ff0000")
		c = "RED"
	else if(block.colour == "#35b23b")
		c = "GREEN"
	else if(block.colour == "#539fed")
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