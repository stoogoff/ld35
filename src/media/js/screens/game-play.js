
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");
	var Grid = require("../objects/grid");
	var Level = require("../objects/level");
	var Target = require("../objects/target");
	var Sequence = require("../objects/sequence");

	var levels = [
		{
			par: 4,
			size: 2,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "RED",
				"GREEN","GREEN"
			],
			target: [
				"GREEN", "GREEN",
				"BLUE", "BLUE"
			]
		},
		{
			par: 6,
			size: 2,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "RED",
				"GREEN","BLUE"
			],
			target: [
				"RED", "RED",
				"RED", "RED"
			]
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "GREEN", "BLUE",
				"RED", "BLUE", "BLUE",
				"GREEN", "RED", "RED"
			],
			target: [
				"RED", "RED", "RED",
				"GREEN", "GREEN", "GREEN",
				"BLUE", "BLUE", "BLUE"
			]
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"BLUE", "RED", "RED",
				"BLUE", "BLUE", "RED",
				"GREEN", "RED", "GREEN"],
			target: [
				"BLUE", "RED", "BLUE",
				"BLUE", "BLUE", "BLUE",
				"BLUE", "RED", "BLUE"
			]
		}
	];



	var GamePlay = function() {
		Phaser.State.call(this);
	};

	GamePlay.prototype.create = function() {
		this.game.add.image(0, 0, "background");

		var sidebar = helpers.createSolid(this.game, 200 - constants.PAD, 600 - constants.PAD, "rgba(50,50,50,0.7)");

		this.game.add.image(600 + constants.PAD_HALF, constants.PAD_HALF, sidebar);

		this.score = {
			moves: 0,
			par: 0
		};

		this.currentLevel = 0;

		this.level = new Level(levels[this.currentLevel]);

		this.target = new Target(this.game);
		this.target.create(this.level);

		this.sequence = new Sequence(this.game);
		this.sequence.create(this.level);

		this.grid = new Grid(this.game);
		this.grid.create(this.level);

		this.mouseDown = false;

		var textX = constants.PLAY_AREA_SIZE + constants.PAD + constants.PAD_HALF;

		this.staticText = {
			level:    this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 2,                             constants.TEXT.LEVEL, constants.STYLES.HUD),
			levelPar: this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 2 + constants.TEXT_PADDING,     constants.TEXT.PAR,   constants.STYLES.HUD),
			moves:    this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 3 + constants.TEXT_PADDING * 2, constants.TEXT.MOVES, constants.STYLES.HUD),
			par:      this.game.add.text(textX, constants.INFO_WIDTH + constants.PAD * 3 + constants.TEXT_PADDING * 3, constants.TEXT.PAR,   constants.STYLES.HUD)
		};

		textX = constants.SCREEN_WIDTH - constants.PAD_HALF - (constants.PAD * 1.5);

		this.dynamicText = {
			level:    this.game.add.text(textX, this.staticText.level.y,    this.currentLevel + 1,       constants.STYLES.HUD),
			levelPar: this.game.add.text(textX, this.staticText.levelPar.y, this.level.par,              constants.STYLES.HUD),
			moves:    this.game.add.text(textX, this.staticText.moves.y,    this.score.moves.toString(), constants.STYLES.HUD),
			par:      this.game.add.text(textX, this.staticText.par.y,      this.score.par.toString(),   constants.STYLES.HUD),
		};

		// TODO retry button
		// TODO show some sort of indicator if they're different colours
		// TODO touch input events
	};

	GamePlay.prototype.nextLevel = function() {
		// TODO some sort of level interstitial

		// update scores
		this.score.par = this.score.moves - this.level.par;
		this.dynamicText.par.text = this.score.par.toString();

		this.score.moves = 0;
		this.dynamicText.moves.text = this.score.moves.toString();

		// load the next level
		this.currentLevel++;

		if(this.currentLevel >= levels.length) {
			this.game.state.start("gameover", true, false, this.score.par);
			return;
		}

		this.level = new Level(levels[this.currentLevel]);

		this.dynamicText.level.text = this.currentLevel + 1;
		this.dynamicText.levelPar.text = this.level.par;

		// inform everything
		this.target.create(this.level);
		this.sequence.create(this.level);
		this.grid.create(this.level);
	};

	GamePlay.prototype.restartLevel = function() {
		// update scores
		this.score.moves = 0;
		this.dynamicText.moves.text = this.score.moves.toString();

		// load the level
		this.level = new Level(levels[this.currentLevel]);

		// inform everything
		this.target.create(this.level);
		this.sequence.create(this.level);
		this.grid.create(this.level);
	};

	GamePlay.prototype.update = function(game) {
		this.grid.update(game.time.elapsed);

		if(!game.input.mousePointer.isDown && this.mouseDown) {
			if(this.grid.activate(game.input.mousePointer.x, game.input.mousePointer.y)) {
				this.score.moves++;
				this.dynamicText.moves.text = this.score.moves;

				// TODO this doesn't want to check during the update but because the animation hasn't completed the getSequence call returns out of date information
				var current = this.grid.getSequence();

				if(this.level.isComplete(current)) {
					console.log("---\n\nFINISHED LEVEL!\n\n---")
					this.nextLevel();
				}
			}
		}

		this.mouseDown = game.input.mousePointer.isDown;
	};

	GamePlay.prototype.render = function() {
		this.grid.render();
		this.target.render();
		this.sequence.render();
	};

	return GamePlay;
});
