
define(function(require) {
	var Block = function(key, colour) {
		this.key = key;
		this.areas = [];
		this.colour = colour;
		this.active = false;
	};

	Block.prototype.addArea = function(x, y, w, h) {
		this.areas.push(new Phaser.Rectangle(x, y, w, h));
	}

	Block.prototype.contains = function(x, y) {
		for(var i = 0, len = this.areas.length; i < len; ++i) {
			if(this.areas[i].contains(x, y)) {
				return true;
			}
		}

		return false;
	};

	Block.prototype.merge = function(block) {
		for(var i = 0, len = block.areas.length; i < len; ++i) {
			var area = block.areas[i];

			this.addArea(area.x, area.y, area.width, area.height);
		}
	};

	Block.prototype.adjacent = function(block) {
		// two blocks of different colours can't be treated as adjacent
		if(block.colour != this.colour) {
			return false;
		}

		var points = [];

		for(var i = 0, len = this.areas.length; i < len; ++i) {
			var area = this.areas[i];

			var p  = new Phaser.Point(area.centerX, area.centerY);
			var w = area.width;
			var h = area.height;

			points.push(new Phaser.Point(p.x - w, p.y)); // left
			points.push(new Phaser.Point(p.x + w, p.y)); // right
			points.push(new Phaser.Point(p.x, p.y - h)); // above
			points.push(new Phaser.Point(p.x, p.y + h)); // below
		}

		var adjacent = [];

		for(var i = 0, ilen = points.length; i < ilen; ++i) {
			for(var j = 0, jlen = block.areas.length; j < jlen; ++j) {
				if(block.areas[j].contains(points[i].x, points[i].y)) {
					adjacent.push(block.areas[j]);
				}
			}
		}

		return adjacent;
	};

	return Block;
});