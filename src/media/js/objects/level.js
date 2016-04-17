
define(function(require) {
	var Level = function(data) {
		this.par = data.par;
		this.size = data.size;
		this.sequence = data.sequence;
		this.grid = data.grid;
		this.target = data.target;
	};

	Level.prototype.isComplete = function(state) {
		// return true if state matches target
	};

	Level.prototype.nextSequence = function(colour) {
		for(var i = 0, len = this.sequence.length; i < len; ++i) {
			if(this.sequence[i] == colour) {
				var next = i + 1;

				return this.sequence[next < len ? next : 0];
			}
		}
	};

	return Level;
});