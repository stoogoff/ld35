
define(function(require) {
	var constants = require("../utils/constants");
	var inherits = require("../utils/inherits");
	
	var Menu = function(title, messages) {
		this.title = title;
		this.messages = messages;

		Phaser.State.call(this);
	};

	inherits(Menu, Phaser.State);

	Menu.prototype.create = function() {
		//this.music = this.game.add.audio("intro", 1, true);
		//this.music.play("", 0, 1, true);

		this.game.stage.backgroundColor = "black";
		
		this.titleText = this.game.add.text(this.game.world.centerX, 100, this.title, constants.STYLES.TITLE);
		this.titleText.anchor.setTo(0.5, 0);

		this.infoText = this.game.add.text(this.game.world.centerX, 220, this.messages.join("\n\n"), constants.STYLES.BODY);
		this.infoText.anchor.setTo(0.5, 0);
		this.infoText.wordWrap = true;
		this.infoText.wordWrapWidth = 400;
	};
	
	Menu.prototype.update = function() {
		if(this.game.input.activePointer.justPressed()) {
			this.game.state.start("play");
		}
	};

	Menu.prototype.shutdown = function() {
		//this.music.stop();
	};

	var Start = function() {
		Menu.call(this, "Colour Block Thing", ["Join same colour blocks together to create a new block", "Click anywhere to start"]);
	};

	inherits(Start, Menu);

	var GameOver = function() {
		Menu.call(this, "Game Over!", ["You finished all the levels currently available.", "Par: $", "Click anywhere to play again"]);
	};

	inherits(GameOver, Menu);

	GameOver.prototype.init = function(par) {
		this.messages[1] = this.messages[1].replace("$", par);
	};

	return {
		Start: Start,
		GameOver: GameOver
	};
});