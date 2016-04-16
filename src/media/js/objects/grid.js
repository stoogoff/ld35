
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Block = require("./block2");
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

	var Grid = function(game, colours) {
		this.game = game;
		this.colours = colours;
		this.level = null;
		this.tile = 0;
		this.blocks = {};
		this.animation = null;
	};

	Grid.prototype.create = function(level) {
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

	Grid.prototype.activeBlocks = function() {
		var active = [];

		for(var key in this.blocks) {
			if(this.blocks[key].active) {
				active.push(key);
			}
		}

		return active;
	}

	Grid.prototype.activate = function(x, y) {
		var active = this.activeBlocks();

		// TODO warn the user by flashing or something if they can't select another thing

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
				
				addOrRemoveBlock(active, block);
			}			
		}

		if(active.length == constants.MAX_ACTIVE) {
			var head = this.blocks[active[0]];
			var tail = this.blocks[active[1]];

			var headAdjacent = tail.adjacent(head);
			var tailAdjacent = head.adjacent(tail);

			if(headAdjacent.length > 0 && tailAdjacent.length > 0) {
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
		}
	};

	Grid.prototype.render = function() {
		var context = this.game.context;

		for(var key in this.blocks) {
			var block = this.blocks[key];

			block.areas.forEach(function(area) {
				context.fillStyle = block.colour;
				context.globalAlpha = block.active ? constants.TRANSPARENT : constants.OPAQUE;
				context.fillRect(area.x, area.y, area.width, area.height);
			});
		}
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

	return {
		key: block.__key,
		x: block.x,
		y: block.y,
		width: block.width,
		height: block.height,
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