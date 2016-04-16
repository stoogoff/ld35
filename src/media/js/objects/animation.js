
define(function(require) {
	var constants = require("../utils/constants");

	var WidthAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.width += speed * elapsed;

			return parseInt(obj.x + obj.width, 10) > target;
		}
	};

	var HeightAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.height += speed * elapsed;

			return parseInt(obj.y + obj.height, 10) > target;
		}
	};

	var LeftAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.width += speed * elapsed;
			obj.x -= speed * elapsed;

			return parseInt(obj.x, 10) < target;
		}
	};

	var TopAnimation = function(obj, target, speed) {
		return function(elapsed) {
			obj.height += speed * elapsed;
			obj.y -= speed * elapsed;

			return parseInt(obj.y, 10) < target;
		}
	};


	var AnimationGroup = function(left, right, colour, complete) {
		left.setActive(false);
		right.setActive(false);

		this.active = true;
		this.animations = [];
		this.complete = complete || function() {};

		if(left.y == right.y && left.x > right.x || left.x == right.x && left.y > right.y) {
			var tmp = left;

			left = right;
			right = tmp;
		}

		var speed = (right.x - left.width - constants.PAD_HALF) / 500;

		// work out whether it's an x or y animation
		if(left.y == right.y) {
			this.animations.push(new WidthAnimation(left, right.x, speed));
			this.animations.push(new LeftAnimation(right, left.x + left.width, speed));
		}
		else {
			this.animations.push(new HeightAnimation(left, right.y, speed));
			this.animations.push(new TopAnimation(right, left.y + left.height, speed));
		}
	};

	AnimationGroup.prototype.animate = function(elapsed) {
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
			this.complete();
		}

		return !this.active;
	};

	AnimationGroup.prototype.destroy = function() {
		//this.left.width = this.right.x + this.right.width - this.left.x;


		this.right.destroy(); // TODO this may need to be changed for L shaped pieces
		this.left = null;
		this.right = null;

		console.log("called destroy on right")
	};

	return AnimationGroup;
});