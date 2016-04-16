
define(function(require) {
	var constants = require("../utils/constants");

	var WidthAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.dimensions({
				"width": obj.width + (speed * elapsed)
			});

			if(parseInt(obj.x + obj.width, 10) > target) {
				obj.dimensions({
					"width": target - obj.x
				});

				return true;
			}

			return false;
		}
	};

	var HeightAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.dimensions({
				"height": obj.height + (speed * elapsed)
			});

			if(parseInt(obj.y + obj.height, 10) > target) {
				obj.dimensions({
					"height": target - obj.x
				});

				return true;
			}

			return false;
		}
	};

	var LeftAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.dimensions({
				"width": obj.width + (speed * elapsed),
				"x": obj.x - (speed * elapsed)
			});

			if(parseInt(obj.x, 10) < target) {
				obj.dimensions({
					"x": target
				});

				return true;
			}

			return false;
		}
	};

	var TopAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.dimensions({
				"height": obj.height + (speed * elapsed),
				"y": obj.y - (speed * elapsed)
			});

			if(parseInt(obj.y, 10) < target) {
				obj.dimensions({
					"y": target
				});

				return true;
			}

			return false;
		}
	};


	var Animation = function(left, right, colour, complete) {
		left.setActive(false);
		right.setActive(false);

		this.active = true;
		this.animations = [];
		this.onComplete = complete || function() {};

		if(left.y == right.y && left.x > right.x || left.x == right.x && left.y > right.y) {
			console.log("switching left and right")

			var tmp = left;

			left = right;
			right = tmp;
		}

		var speed = 0.1;

		console.log(debugBlock(left))
		console.log(debugBlock(right))

		// TODO handle special case for L shapes
		// TODO handle special case when moving from L shape to a large block

		// work out whether it's an x or y animation
		if(left.y == right.y) {
			console.log("x animation")
			this.animations.push(new WidthAnimation(left, right.x - constants.PAD_HALF, speed));
			this.animations.push(new LeftAnimation(right, left.x + left.width + constants.PAD_HALF, speed));
		}
		else {
			console.log("y animation")
			this.animations.push(new HeightAnimation(left, right.y - constants.PAD_HALF, speed));
			this.animations.push(new TopAnimation(right, left.y + left.height + constants.PAD_HALF, speed));
		}
	};

	Animation.prototype.animate = function(elapsed) {
		if(!this.active) {
			return false;
		}

		var complete = 0;

		this.animations.forEach(function(animation) {
			if(animation(elapsed)) {
				complete++;
			}
		});

		this.active = complete < this.animations.length;

		if(!this.active) {
			this.onComplete();
		}

		return !this.active;
	};

	Animation.prototype.destroy = function() {
		this.animations = null;
	};

	return Animation;
});