
define(function(require) {
	var constants = require("../utils/constants");
	var Block = require("./block");

	var Grid = function(game, size, colours) {
		this.game = game;
		this.size = size;
		this.colours = colours;
		this.tile = parseInt(constants.PLAY_AREA_SIZE / this.size, 10) - constants.PAD;
	};

	Grid.prototype.render = function(level) {
		var colour = 0;
		var currentX = currentY = constants.PAD / 2;

		for(var y = 0; y < this.size; ++y) {
			currentX = constants.PAD / 2;

			for(var x = 0; x < this.size; ++x) {
				var block = new Block(this.game, currentX, currentY, this.tile, this.colours[level[colour++]]);

				/*var block = this.game.add.image(currentX, currentY, this.colours[level[colour++]]);

				block.width = this.tile;
				block.height = this.tile;
				block.anchor.setTo(0, 0);*/

				currentX += this.tile + constants.PAD;
			}

			currentY += this.tile + constants.PAD;
		}
	};

	// TODO destroy

	return Grid;
});