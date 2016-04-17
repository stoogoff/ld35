
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Block = require("./block");
	var Animation = require("./animation");
	var Link = require("./link");

	function addOrRemoveBlock(active, block) {
		if(block.active) {
			active.push(block.key);
		}
		else if(active.indexOf(block.key) !== -1) {
			active.splice(active.indexOf(block.key), 1);
		}		
	}

	var Grid = function(game) {
		this.game = game;
		this.level = null;
		this.tile = 0;
		this.blocks = {};
		this.animation = null;

		this.sfx = {
			activate: this.game.add.audio("activate"),
			deactivate: this.game.add.audio("deactivate"),
			badlink: this.game.add.audio("badlink"),
			goodlink: this.game.add.audio("goodlink")
		};
	};

	Grid.prototype.create = function(level) {
		this.blocks = {};
		this.level = level;
		this.tile = parseInt(constants.PLAY_AREA_SIZE / this.level.size, 10) - constants.PAD;

		var colour = 0;
		var currentX = currentY = constants.PAD_HALF;

		for(var y = 0; y < this.level.size; ++y) {
			currentX = constants.PAD_HALF;

			for(var x = 0; x < this.level.size; ++x) {
				var key = helpers.guid();

				this.blocks[key] = new Block(key, this.level.grid[colour++]);
				this.blocks[key].addArea(currentX, currentY, this.tile, this.tile);

				currentX += this.tile + constants.PAD;
			}

			currentY += this.tile + constants.PAD;
		}
	};

	Grid.prototype.getSequence = function() {
		var areas = [];

		for(var key in this.blocks) {
			this.blocks[key].areas.forEach(function(area) {
				var centroid = area.centroid();

				areas.push({
					colour: this.blocks[key].colour,
					x: centroid.x,
					y: centroid.y
				})
			}.bind(this));
		}

		areas.sort(function(a, b) {
			if(a.y == b.y) {
				return a.x > b.x;
			}
			
			return a.y > b.y;
		});

		areas = areas.map(function(a) {
			return a.colour;
		});

		return areas;
	};

	Grid.prototype.activeBlocks = function() {
		var active = [];

		for(var key in this.blocks) {
			if(this.blocks[key].active) {
				active.push(key);
			}
		}

		return active;
	};

	Grid.prototype.activate = function(x, y) {
		var active = this.activeBlocks();
		var activated = active.length;

		// TODO warn the user by flashing or something if they can't select another thing
		var toPlay = null;

		// activate or deactivate
		for(var key in this.blocks) {
			var block = this.blocks[key];

			if(block.contains(x, y)) {
				if(active.length < constants.MAX_ACTIVE) {
					block.active = !block.active;
				}
				else {
					block.active = false;
				}
				
				if(block.active) {
					toPlay = this.sfx.activate;
				}
				else {
					toPlay = this.sfx.deactivate;
				}

				addOrRemoveBlock(active, block);
			}			
		}

		if(active.length == constants.MAX_ACTIVE) {
			var head = this.blocks[active[0]];
			var tail = this.blocks[active[1]];

			var headAdjacent = tail.adjacent(head);
			var tailAdjacent = head.adjacent(tail);

			if(headAdjacent.length > 0 && tailAdjacent.length > 0) {
				toPlay = this.sfx.goodlink;

				console.log("START ANIMATION")
				console.log("headAdjacent.length = " + headAdjacent.length)
				console.log("tailAdjacent.length = " + tailAdjacent.length)

				// head is bigger than tail so merge head into tail rather than tail into head
				if(head.areas.length > tail.areas.length) {
					console.log("switch")
					var tmp = headAdjacent;

					headAdjacent = tailAdjacent;
					tailAdjacent = tmp;
				}

				head.active = tail.active = false;

				var nextColour = this.level.nextSequence(head.colour);

				this.animation = new Animation(headAdjacent, tailAdjacent, function() {
					console.log("complete")

					// set colour, merge blocks
					head.merge(tail);
					head.colour = nextColour;

					delete this.blocks[tail.key];
				}.bind(this));
			}
			else {
				console.log("bad link")
				toPlay = this.sfx.badlink;
			}
		}

		if(toPlay) {
			toPlay.play();
		}

		// the player made a valid move
		return activated != active.length;
	};

	Grid.prototype.render = function() {
		var context = this.game.context;

		for(var key in this.blocks) {
			var block = this.blocks[key];

			block.areas.forEach(function(area) {
				context.fillStyle = block.colour;
				context.globalAlpha = block.active ? constants.ACTIVE : constants.INACTIVE;
				context.fillRect(area.x, area.y, area.width, area.height);
			});
		}

		context.globalAlpha = 1;
	};

	Grid.prototype.update = function(elapsed) {
		if(this.animation == null) {
			return;
		}

		this.animation.animate(elapsed);
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

	var areas = [];

	block.areas.forEach(function(a) {
		areas.push({
			x: a.x,
			y: a.y,
			width: a.width,
			height: a.height
		});
	});

	return {
		key: block.__key,
		areas: areas,
		colour: c
	};
}

function debugRect(rect) {
	var r = {
		x: rect.x,
		y: rect.y,
		width: rect.width,
		height: rect.height
	};

	console.log(r)
}