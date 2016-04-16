
define(function(require) {
	var constants = require("../utils/constants");
	//var Block = require("../objects/block");
	var helpers = require("../utils/helpers");
	var Grid = require("../objects/grid");
	var Colours = require("../objects/colours");


	var fills = {};
	var blocks = [];


	var level = {
		size: 4,
		sequence: [constants.COLOURS.RED, constants.COLOURS.GREEN, constants.COLOURS.BLUE],
		grid: [
			constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.GREEN,constants.COLOURS.BLUE,
			constants.COLOURS.BLUE, constants.COLOURS.GREEN, constants.COLOURS.GREEN, constants.COLOURS.GREEN,
			constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.GREEN, constants.COLOURS.RED,
			constants.COLOURS.BLUE, constants.COLOURS.BLUE, constants.COLOURS.GREEN, constants.COLOURS.GREEN,
			constants.COLOURS.RED, constants.COLOURS.RED
		],
		nextSequence: function(colour) {
			for(var i = 0, len = this.sequence.length; i < len; ++i) {
				if(this.sequence[i] == colour) {
					var next = i + 1;

					return this.sequence[next < len ? next : 0];
				}
			}
		}
	};


	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		var sidebar = helpers.createSolid(this.game, 200 - constants.PAD, 600 - constants.PAD, "#333");

		this.game.add.image(600 + constants.PAD_HALF, constants.PAD_HALF, sidebar);

		var colours = Colours(this.game);

		this.grid = new Grid(this.game, colours);
		this.grid.create(level);

		this.mouseDown = false;

		// TODO show some sort of indicator if they're different colours
		// TODO touch input events
	};

	GamePlay.prototype.update = function(game) {
		if(!game.input.mousePointer.isDown && this.mouseDown) {
			this.grid.activate(game.input.mousePointer.x, game.input.mousePointer.y);
		}

		this.mouseDown = game.input.mousePointer.isDown;
		this.grid.update(game.time.elapsed);
	};

	GamePlay.prototype.render = function() {
		this.grid.render();
	};

	return GamePlay;
});
