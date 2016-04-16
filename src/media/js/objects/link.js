
define(function(require) {
	var Link = function() {
		this.links = [];
		this.acting = false;
	};

	Link.prototype.match = function(a, b) {
		return a.__key == b.__key;
	};

	Link.prototype.add = function(block) {
		for(var i = 0, len = this.links.length; i < len; ++i) {
			if(this.match(this.links[i], block)) {
				return;
			}
		}

		this.links.push(block);
	};

	Link.prototype.has = function(key) {
		for(var i = 0, len = this.links.length; i < len; ++i) {
			if(this.links[i].__key === key) {
				return true;
			}
		}

		return false;
	};

	Link.prototype.merge = function(link) {
		for(var i = 0, len = link.links.length; i < len; ++i) {
			if(!this.has(link.links[i].__key)) {
				this.links.push(link.links);
			}
		}
	};

	Link.prototype.pass = function(from, callback) {
		console.log("passing from " + from.__key)

		for(var i = 0, len = this.links.length; i < len; ++i) {
			if(!this.match(this.links[i], from)) {
				callback(this.links[i]);
			}
		}
	};

	return Link;
});