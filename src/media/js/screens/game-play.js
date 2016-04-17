
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Grid = require("../objects/grid");
	var Colours = require("../objects/colours");
	var Level = require("../objects/level");
	var Target = require("../objects/target");
	var Sequence = require("../objects/sequence");


	/*var level = {
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
	};*/




	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		/*var sidebar = helpers.createSolid(this.game, 200 - constants.PAD, 600 - constants.PAD, "#333");

		this.game.add.image(600 + constants.PAD_HALF, constants.PAD_HALF, sidebar);*/

		//var colours = Colours(this.game);
		this.moves = 0;
		this.par = 0;
		this.currentLevel = 1;

		this.level = new Level({
			par: 6,
			size: 2,
			sequence: [constants.COLOURS.RED, constants.COLOURS.GREEN, constants.COLOURS.BLUE],
			grid: [constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.GREEN,constants.COLOURS.BLUE],
			//target: [constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.RED, constants.COLOURS.RED]
			target: [constants.COLOURS.RED, constants.COLOURS.GREEN, constants.COLOURS.BLUE, constants.COLOURS.RED]
		});

		this.target = new Target(this.game);
		this.target.create(this.level);

		this.sequence = new Sequence(this.game);
		this.sequence.create(this.level);

		this.grid = new Grid(this.game);
		this.grid.create(this.level);

		this.mouseDown = false;

		var textX = constants.PLAY_AREA_SIZE + constants.PAD;

		this.staticText = {
			level:    this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 2,                             constants.TEXT.LEVEL, constants.STYLES.HUD),
			levelPar: this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 2 + constants.HUD_PADDING,     constants.TEXT.PAR,   constants.STYLES.HUD),
			moves:    this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 3 + constants.HUD_PADDING * 2, constants.TEXT.MOVES, constants.STYLES.HUD),
			par:      this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 3 + constants.HUD_PADDING * 3, constants.TEXT.PAR,   constants.STYLES.HUD)
		};

		textX = constants.SCREEN_WIDTH - constants.PAD * 1.5;

		this.dynamicText = {
			level:    this.game.add.text(textX, this.staticText.level.y,    this.currentLevel,     constants.STYLES.HUD),
			levelPar: this.game.add.text(textX, this.staticText.levelPar.y, this.level.par,        constants.STYLES.HUD),
			moves:    this.game.add.text(textX, this.staticText.moves.y,    this.moves.toString(), constants.STYLES.HUD),
			par:      this.game.add.text(textX, this.staticText.par.y,      this.par.toString(),   constants.STYLES.HUD),
		};

		// TODO retry button
		// TODO show some sort of indicator if they're different colours
		// TODO touch input events
	};

	GamePlay.prototype.update = function(game) {
		if(!game.input.mousePointer.isDown && this.mouseDown) {
			if(this.grid.activate(game.input.mousePointer.x, game.input.mousePointer.y)) {
				this.moves++;
				this.dynamicText.moves.text = this.moves;

				// TODO check for level completion
			}
		}

		this.mouseDown = game.input.mousePointer.isDown;
		this.grid.update(game.time.elapsed);
	};

	GamePlay.prototype.render = function() {
		this.grid.render();
		this.target.render();
		this.sequence.render();
	};

	return GamePlay;
});
