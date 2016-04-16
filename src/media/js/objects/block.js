
define(function(require) {
	var inherits = require("../utils/inherits");
	var constants = require("../utils/constants");

	var Block = function(key, game, x, y, w, h, colour, colours) {
		Phaser.Image.call(this, game, x, y, colours[colour]);

		this.__key = key;
		this.width = w;
		this.height = h;
		this.anchor.setTo(0, 0);
		this.hitArea = new Phaser.Rectangle(x, y, w, h);
		this.colour = colour;
		this.colours = colours;
		this.animation = null;
		this.active = false;
		this.link = null;

		this.adjacencyPoint = new Phaser.Point(this.hitArea.centerX, this.hitArea.centerY);

		game.add.existing(this);
	};

	inherits(Block, Phaser.Image);

	Block.prototype.contains = function(x, y) {
		return this.hitArea.contains(x, y);
	};

	Block.prototype.setActive = function(active) {
		this.active = active;
		this.alpha = this.active ? constants.TRANSPARENT : constants.OPAQUE;

		if(this.link) {
			this.link.pass(this, function(linked) {
				linked.active = active;
				linked.alpha = linked.active ? constants.TRANSPARENT : constants.OPAQUE;
			});
		}
	};

	Block.prototype.toggleActive = function() {
		this.active = !this.active;
		this.alpha = this.active ? constants.TRANSPARENT : constants.OPAQUE;

		if(this.link) {
			this.link.pass(this, function(linked) {
				linked.active = !linked.active;
				linked.alpha = linked.active ? constants.TRANSPARENT : constants.OPAQUE;
			});
		}
	};

	Block.prototype.isActive = function() {
		return this.active;
	};

	Block.prototype.setColour = function(colour) {
		this.colour = colour;
		this.loadTexture(this.colours[colour]);

		if(this.link) {
			this.link.pass(this, function(linked) {
				linked.colour = colour;
				linked.loadTexture(linked.colours[colour]);
			});
		}
	};

	Block.prototype.adjacent = function(block) {
		if(block.colour != this.colour) {
			return false;
		}

		var p  = this.adjacencyPoint;
		var w = this.hitArea.width;
		var h = this.hitArea.height;

		var points = [
			new Phaser.Point(p.x - w, p.y), // left
			new Phaser.Point(p.x + w, p.y), // right
			new Phaser.Point(p.x, p.y - h), // above
			new Phaser.Point(p.x, p.y + h)  // below
		];

		for(var i = 0, len = points.length; i < len; ++i) {
			if(block.hitArea.contains(points[i].x, points[i].y)) {
				return true;
			}
		}

		return false;
	};

	Block.prototype.addLink = function(link) {
		console.log("linking... " + this.__key)
		this.link = link;
		this.link.add(this);
	};

	return Block;
});