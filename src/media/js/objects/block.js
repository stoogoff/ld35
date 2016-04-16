
define(function(require) {
	var inherits = require("../utils/inherits");

	var Block = function(game, x, y, size, colour, colours) {
		Phaser.Image.call(this, game, x, y, colours[colour]);

		this.width = size;
		this.height = size;
		this.anchor.setTo(0, 0);
		this.hitArea = new Phaser.Rectangle(x, y, size, size);
		this.colour = colour;
		this.colours = colours;
		this.animation = null;
		this.active = false;

		game.add.existing(this);
	};

	inherits(Block, Phaser.Image);

	Block.prototype.contains = function(x, y) {
		return this.hitArea.contains(x, y);
	};

	Block.prototype.setActive = function(active) {
		this.active = active;
		this.alpha = this.active ? 0.7 : 1;
	};

	Block.prototype.toggleActive = function() {
		this.active = !this.active;
		this.alpha = this.active ? 0.7 : 1;
	};

	Block.prototype.isActive = function() {
		return this.active;
	};

	return Block;
});