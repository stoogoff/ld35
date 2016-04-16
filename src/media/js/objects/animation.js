
define(function(require) {
	var constants = require("../utils/constants");

	var WidthAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.width += speed * elapsed;

			if(parseInt(obj.x + obj.width, 10) > target) {
				objwidth = target - obj.x;

				return false;
			}

			return true;
		}
	};

	var HeightAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.height += speed * elapsed;

			if(parseInt(obj.y + obj.height, 10) > target) {
				obj.height = target - obj.x;

				return false;
			}

			return true;
		}
	};

	var LeftAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.width += speed * elapsed;
			obj.x -= speed * elapsed;

			if(parseInt(obj.x, 10) < target) {
				obj.x = target;

				return false;
			}

			return true;
		}
	};

	var TopAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.height += speed * elapsed;
			obj.y -= speed * elapsed;

			if(parseInt(obj.y, 10) < target) {
				obj.y = target;

				return false;
			}

			return true;
		}
	};


	var Animation = function(from, to, complete) {
		this.active = true;
		this.onComplete = complete || function() {};

		// always merge the smaller block in to the larger

		if(from.y == to.y) {
			if(from.x < to.x) {
				this.animation = WidthAnimation(from, to.x, constants.SPEED);
			}
			else {
				this.animation = LeftAnimation(from, to.x + to.width, constants.SPEED);
			}
		}

		/*if(first.y == last.y && first.x > last.x || first.x == last.x && first.y > last.y) {
			console.log("switching first and last")

			var tmp = first;

			first = last;
			last = tmp;
		}

		console.log(debugBlock(first))
		console.log(debugBlock(last))

		// TODO handle special case for L shapes
		// TODO handle special case when moving from L shape to a large block

		// work out whether it's an x or y animation
		if(first.y == last.y) {
			console.log("x animation")
			this.animations.push(WidthAnimation(first, last.x, constants.SPEED));
			//this.animations.push(LeftAnimation(last, first.x + first.width + constants.PAD_HALF, constants.SPEED));
		}
		else {
			console.log("y animation")
			this.animations.push(HeightAnimation(first, last.y, constants.SPEED));
			//this.animations.push(TopAnimation(last, first.y + first.height + constants.PAD_HALF, constants.SPEED));
		}*/
	};

	Animation.prototype.animate = function(elapsed) {
		if(!this.active) {
			return;
		}

		this.active = this.animation(elapsed)

		if(!this.active) {
			this.onComplete();
		}
	};

	Animation.prototype.destroy = function() {
		this.animations = null;
	};

	return Animation;
});