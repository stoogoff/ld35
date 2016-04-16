
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
		function inner(b) {
			b.active = active;
			b.alpha = b.active ? constants.TRANSPARENT : constants.OPAQUE;
		}

		inner(this);

		if(this.link) {
			this.link.pass(this, inner);
		}
	};

	Block.prototype.toggleActive = function() {
		function inner(b) {
			b.active = !b.active;
			b.alpha = b.active ? constants.TRANSPARENT : constants.OPAQUE;
		}

		inner(this);

		if(this.link) {
			this.link.pass(this, inner);
		}
	};

	Block.prototype.isActive = function() {
		return this.active;
	};

	Block.prototype.setColour = function(colour) {
		function inner(b) {
			b.colour = colour;
			b.loadTexture(b.colours[colour]);
		}

		inner(this);

		if(this.link) {
			this.link.pass(this, inner);
		}
	};

	Block.prototype.dimensions = function(params) {
		function inner(b) {
			var keys = ["x", "y", "width", "height"];

			keys.forEach(function(k) {
				if(params[k]) {
					b[k] = params[k];
				}
			});
		}

		inner(this);

		if(this.link) {
			this.link.pass(this, inner);
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
				return block.hitArea;
			}
		}

		return null;
	};

	/*Block.prototype.addLink = function(link) {
		console.log("linking... " + this.__key)
		this.link = link;
		this.link.add(this);
	};*/

	return Block;
});