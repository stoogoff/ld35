
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Block = require("./block");
	var Animation = require("./animation");

	function addOrRemoveBlock(active, key, block) {
		if(block.isActive()) {
			active.push(key);
		}
		else if(active.indexOf(key) !== -1) {
			active.splice(active.indexOf(key), 1);
		}		
	}

	var Grid = function(game, colours) {
		this.game = game;
		this.colours = colours;
		this.level = null;
		this.tile = 0;
		this.blocks = {};
		this.animations = [];
	};

	Grid.prototype.render = function(level) {
		this.level = level;
		this.tile = parseInt(constants.PLAY_AREA_SIZE / this.level.size, 10) - constants.PAD;

		var colour = 0;
		var currentX = currentY = constants.PAD_HALF;

		for(var y = 0; y < this.level.size; ++y) {
			currentX = constants.PAD_HALF;

			for(var x = 0; x < this.level.size; ++x) {
				this.blocks[helpers.guid()] = new Block(this.game, currentX, currentY, this.tile, this.level.grid[colour++], this.colours);

				currentX += this.tile + constants.PAD;
			}

			currentY += this.tile + constants.PAD;
		}
	};

	Grid.prototype.activate = function(x, y) {
		var active = [];

		// check for existing active first to prevent more than the max being clicked
		for(var key in this.blocks) {
			addOrRemoveBlock(active, key, this.blocks[key]);
		}

		// activate or deactivate
		for(var key in this.blocks) {
			var block = this.blocks[key];

			if(block.contains(x, y)) {
				if(active.length < constants.MAX_ACTIVE) {
					block.toggleActive();
				}
				else {
					block.setActive(false);
				}
				
				addOrRemoveBlock(active, key, block);
			}			
		}

		if(active.length == constants.MAX_ACTIVE) {
			if(this.adjacent(this.blocks[active[0]], this.blocks[active[1]]) || this.adjacent(this.blocks[active[1]], this.blocks[active[0]])) {
				console.log("CONNECT!")

				var nextColour = this.level.nextSequence(this.blocks[active[0]].colour);

				this.animations.push(new Animation(this.blocks[active[0]], this.blocks[active[1]], nextColour, function() {

					this.blocks[active[0]].destroy();
					this.blocks[active[1]].destroy();
					delete this.blocks[active[0]];
					delete this.blocks[active[1]];

				}.bind(this)));
			}
		}
	};

	// return true if left and right blocks are adjacent to each other in the grid
	Grid.prototype.adjacent = function(left, right) {
		return (((left.x == right.x && left.y == right.y - this.tile - constants.PAD) ||
			(left.y == right.y && left.x == right.x - this.tile - constants.PAD)) &&
			left.colour == right.colour);
	};

	Grid.prototype.update = function(elapsed) {
		this.animations.forEach(function(animation) {
			// TODO remove and destroy if complete
			animation.animate(elapsed);
		});
	};

	// TODO destroy

	return Grid;
});
