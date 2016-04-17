
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype.preload = function() {
		this.load.image("background", "media/img/background.png");

		var sfx = [];

		sfx.forEach(function(key) {
			this.load.audio(key, ["media/audio/" + key + ".wav"]);
		}.bind(this));
	};

	Preload.prototype.create = function() {
		this.game.state.start("start");
	};

	return Preload;
});