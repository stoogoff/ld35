
define(function(require) {
	var constants = require("../utils/constants");
	var Rect = require("./rect");


	var Level = function(game) {
		this.game = game;
		this.blocks = [];
	};

	Level.prototype.create = function(level) {
		var tile = parseInt((constants.INFO_WIDTH - constants.PAD) / level.size, 10);
		var colour = 0;

		var currentX = startX = constants.PLAY_AREA_SIZE + constants.PAD_HALF;
		var currentY = constants.PAD_HALF;

		this.blocks = [];

		for(var y = 0; y < level.size; ++y) {
			currentX = startX;

			for(var x = 0; x < level.size; ++x) {
				this.blocks.push(new Rect(currentX, currentY, tile, tile, level.target[colour++]));

				currentX += tile;
			}

			currentY += tile;
		}
	};

	Level.prototype.render = function() {
		var context = this.game.context;

		this.blocks.forEach(function(block) {
			context.fillStyle = block.colour;
			context.fillRect(block.x, block.y, block.width, block.height);
		});
	};

	return Level;
});