
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

	/*var TopLeftAnimation = function(obj, targetX, targetY) {
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
	};

	var BottomRightAnimation = function(obj, targetX, targetY) {
		return function(elapsed) {
			var speed = constants.SPEED * elapsed;

			obj.width += speed;
			obj.height += speed;

			if(parseInt(obj.x, 10) < targetX && parseInt(obj.y, 10) < targetY) {
				obj.width = targetX = obj.x;
				obj.height = targetY - obj.y;

				return false;
			}

			return true;
		}
	};*/

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

			console.log("from")
			console.log(from.forEach(debugRect))
			console.log("to")
			console.log(to.forEach(debugRect))

		// one block surrounds the other on two sides
		if(from.length > 1 && to.length > 1) {
			var targetX = Math.min(to[0].x + to[0].width, to[1].x + to[1].width);
			var targetY = Math.min(to[0].y + to[0].height, to[1].y + to[1].height);

			console.log("targetX = " + targetX);
			console.log("targetY = " + targetY);

			from = from[0];

			var animations = [];

			if(from.x < targetX) {
				animations.push(WidthAnimation(from, targetX));
			}
			else if(from.x > targetX) {
				animations.push(LeftAnimation(from, targetX));
			}

			if(from.y < targetY) {
				animations.push(HeightAnimation(from, targetY));
			}
			else if(from.y > targetY) {
				animations.push(TopAnimation(from, targetY));
			}

			this.animation = GroupAnimation(animations);
		}
		else {
			from = from[0];
			to = to[0];

			if(from.y < to.y) {
				console.log("HeightAnimation")
				this.animation = HeightAnimation(from, to.y);
			}
			else if(from.y > to.y) {
				console.log("TopAnimation")
				this.animation = TopAnimation(from, to.y + to.height)
			}
			else {
				if(from.x < to.x) {
					console.log("WidthAnimation")
					this.animation = WidthAnimation(from, to.x);
				}
				else {
					console.log("LeftAnimation")
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