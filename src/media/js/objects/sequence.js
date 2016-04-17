
define(function(require) {
	var constants = require("../utils/constants");
	var Rect = require("./rect");

	var HEIGHT = constants.INFO_HEIGHT - constants.SEQUENCE_HEIGHT - constants.PAD_HALF;

	var Sequence = function(game) {
		this.game = game;
		this.sequence = [];
	};

	Sequence.prototype.create = function(level) {
		var WIDTH = parseInt((constants.INFO_WIDTH - constants.PAD) / level.sequence.length, 10);

		var currentX = constants.PLAY_AREA_SIZE + constants.PAD_HALF;

		for(var i = 0, len = level.sequence.length; i < len; ++i) {
			this.sequence.push(new Rect(currentX, HEIGHT, WIDTH, constants.SEQUENCE_HEIGHT, level.sequence[i]));

			currentX += WIDTH;
		}
	};

	Sequence.prototype.render = function() {
		var context = this.game.context;

		context.globalAlpha = 0.9;

		this.sequence.forEach(function(block) {
			context.fillStyle = block.colour;
			context.fillRect(block.x, block.y, block.width, block.height);
		});

		context.globalAlpha = 1;
	};

	return Sequence;
});