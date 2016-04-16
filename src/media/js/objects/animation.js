
define(function(require) {
	var constants = require("../utils/constants");

	var WidthAnimation = function(obj, target) {
		return function(elapsed) {
			obj.width += constants.SPEED * elapsed;

			if(parseInt(obj.x + obj.width, 10) > target) {
				objwidth = target - obj.x;

				return false;
			}

			return true;
		}
	};

	var HeightAnimation = function(obj, target) {
		return function(elapsed) {
			obj.height += constants.SPEED * elapsed;

			if(parseInt(obj.y + obj.height, 10) > target) {
				obj.height = target - obj.x;

				return false;
			}

			return true;
		}
	};

	var LeftAnimation = function(obj, target) {
		return function(elapsed) {
			var speed = constants.SPEED * elapsed;

			obj.width += speed;
			obj.x -= speed;

			if(parseInt(obj.x, 10) < target) {
				obj.x = target;

				return false;
			}

			return true;
		}
	};

	var TopAnimation = function(obj, target) {
		return function(elapsed) {
			var speed = constants.SPEED * elapsed;

			obj.height += speed;
			obj.y -= speed;

			if(parseInt(obj.y, 10) < target) {
				obj.y = target;

				return false;
			}

			return true;
		}
	};

	var TopLeftAnimation = function(obj, targetX, targetY) {
		return function(elapsed) {
			var speed = constants.SPEED * elapsed;

			obj.x -= speed;
			obj.y -= speed;
			obj.width += speed;
			obj.height += speed;

			if(parseInt(obj.x, 10) < targetX && parseInt(obj.y, 10) < targetY) {
				obj.x = targetX;
				obj.y = targetY;

				return false;
			}

			return true;
		}
	}


	var Animation = function(from, to, complete) {
		this.active = true;
		this.onComplete = complete || function() {};

		// one block surrounds the other on two side
		if(from.length == 2 && to.length == 2) {
			var targetX = Math.min(to[0].x + to[0].width, to[1].x + to[1].width);
			var targetY = Math.min(to[0].y + to[0].height, to[1].y + to[1].height);

			this.animation = TopLeftAnimation(from[0], targetX, targetY);
		}
		else {
			from = from[0];
			to = to[0];

			if(from.y < to.y) {
				this.animation = HeightAnimation(from, to.y);
			}
			else if(from.y > to.y) {
				this.animation = TopAnimation(from, to.y + to.height)
			}
			else {
				if(from.x < to.x) {
					this.animation = WidthAnimation(from, to.x);
				}
				else {
					this.animation = LeftAnimation(from, to.x + to.width);
				}
			}
		}
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