
define(function(require) {
	var constants = require("../utils/constants");

	function convertColoursToValues(input) {
		var output = [];

		input.forEach(function(key) {
			output.push(constants.COLOURS[key]);
		});

		return output;
	}

	var Level = function(data) {
		this.par = data.par;
		this.size = data.size;
		this.sequence = convertColoursToValues(data.sequence);
		this.grid = convertColoursToValues(data.grid);
		this.target = convertColoursToValues(data.target);
	};

	Level.prototype.isComplete = function(state) {
		if(state.length != this.target.length) {
			return false;
		}

		var match = 0;

		state.forEach(function(colour, index) {
			if(colour == this.target[index]) {
				match++;
			}
		}.bind(this));

		return match == this.target.length;
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