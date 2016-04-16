
define(function(require) {
	var constants = require("../utils/constants");
	var helpers = require("../utils/helpers");

	return function(game) {
		var colours = {};

		for(var c in constants.COLOURS) {
			colours[constants.COLOURS[c]] = helpers.createSolid(game, 1, 1, constants.COLOURS[c]);
		}

		return colours;
	};
});