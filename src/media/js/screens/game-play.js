
define(function(require) {
	var constants = require("../utils/constants");
	//var Block = require("../objects/block");
	var helpers = require("../utils/helpers");
	var Grid = require("../objects/grid");
	var Colours = require("../objects/colours");






	var size = 3;


	var colourSequence = [constants.COLOURS.RED, constants.COLOURS.GREEN, constants.COLOURS.BLUE];
	var fills = {};
	var blocks = [];


	var level = [
		constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.GREEN,constants.COLOURS.BLUE,
		constants.COLOURS.BLUE, constants.COLOURS.GREEN, constants.COLOURS.GREEN, constants.COLOURS.RED,
		constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.GREEN,
		constants.COLOURS.BLUE, constants.COLOURS.BLUE, constants.COLOURS.GREEN, constants.COLOURS.GREEN,
		constants.COLOURS.RED, constants.COLOURS.RED
	];







	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		var sidebar = helpers.createSolid(this.game, 200 - constants.PAD / 2, 600 - constants.PAD, "#333");

		this.game.add.image(600, constants.PAD / 2, sidebar);

		var colours = Colours(this.game);
		var grid = new Grid(this.game, size, colours);

		grid.render(level);


		// TODO tap on block
		// TODO tap on second block
		// TODO merge blocks if they're the same colour
		// TODO show some sort of indiciator if they're different colours
	};

	GamePlay.prototype.update = function(game) {

	};

	return GamePlay;
});
