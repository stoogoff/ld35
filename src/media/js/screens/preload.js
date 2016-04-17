
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype.preload = function() {
		this.load.image("background", "media/img/background.png");
		this.load.spritesheet("retry", "media/img/retry.png", 180, 40);
		this.load.audio("theme", ["media/audio/music.mp3", "media/audio/music.ogg"]);

		var sfx = ["activate", "badlink", "completelevel", "deactivate", "goodlink"];

		sfx.forEach(function(key) {
			this.load.audio(key, ["media/audio/" + key + ".wav"]);
		}.bind(this));
	};

	Preload.prototype.create = function() {
		this.game.state.start("start");
	};

	return Preload;
});