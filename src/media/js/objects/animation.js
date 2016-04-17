
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
				obj.height = target - obj.y;

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

	var GroupAnimation = function(animations) {
		return function(elapsed) {
			var more = 0;

			animations.forEach(function(animation) {
				if(animation(elapsed)) {
					more++;
				}
			});

			return more == animations.length;
		};
	};

	var Animation = function(from, to, complete) {
		this.active = true;
		this.onComplete = complete || function() {};

		if(from.length > 1 && to.length > 1) {
			from = from[0];

			var animations = [];

			to.forEach(function(target) {
				if(from.initial.y < target.initial.y) {
					animations.push(HeightAnimation(from, target.initial.y));
				}
				else if(from.initial.y > target.initial.y) {
					animations.push(TopAnimation(from, target.initial.y + target.initial.height))
				}
				else {
					if(from.initial.x < target.initial.x) {
						animations.push(WidthAnimation(from, target.initial.x));
					}
					else {
						animations.push(LeftAnimation(from, target.initial.x + target.initial.width));
					}
				}
			});

			this.animation = GroupAnimation(animations);
		}
		else {
			from = from[0];
			to = to[0];

			if(from.initial.y < to.initial.y) {
				this.animation = HeightAnimation(from, to.initial.y);
			}
			else if(from.initial.y > to.initial.y) {
				this.animation = TopAnimation(from, to.initial.y + to.initial.height)
			}
			else {
				if(from.initial.x < to.initial.x) {
					this.animation = WidthAnimation(from, to.initial.x);
				}
				else {
					this.animation = LeftAnimation(from, to.initial.x + to.initial.width);
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