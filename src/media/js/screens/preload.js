
define(function(require) {
	var Preload = function() {
		Phaser.State.call(this);
	};

	Preload.prototype.preload = function() {

	};

	Preload.prototype.create = function() {
		this.game.state.start("start");
	};

	return Preload;
});