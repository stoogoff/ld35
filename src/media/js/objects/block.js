
define(function(require) {
	var inherits = require("../utils/inherits");

	var Block = function(game, x, y, size, colour) {
		Phaser.Image.call(this, game, x, y, colour);

		this.width = size;
		this.height = size;
		this.anchor.setTo(0, 0);

		game.add.existing(this);
	};

	inherits(Block, Phaser.Image);

	return Block;
});