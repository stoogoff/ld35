
define(function(require) {
	return [
		{
			par: 4,
			size: 2,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "RED",
				"GREEN","GREEN"
			],
			target: [
				"GREEN", "GREEN",
				"BLUE", "BLUE"
			]
		},
		{
			par: 6,
			size: 2,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "RED",
				"GREEN","BLUE"
			],
			target: [
				"RED", "RED",
				"RED", "RED"
			]
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "GREEN", "BLUE",
				"RED", "BLUE", "BLUE",
				"GREEN", "RED", "RED"
			],
			target: [
				"RED", "RED", "RED",
				"GREEN", "GREEN", "GREEN",
				"BLUE", "BLUE", "BLUE"
			]
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"BLUE", "RED", "RED",
				"BLUE", "BLUE", "RED",
				"GREEN", "RED", "GREEN"],
			target: [
				"BLUE", "RED", "BLUE",
				"BLUE", "BLUE", "BLUE",
				"BLUE", "RED", "BLUE"
			]
		}
	];
});