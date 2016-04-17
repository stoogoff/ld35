
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
			par: 4,
			size: 2,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "RED",
				"GREEN","RED"
			],
			target: [
				"BLUE", "GREEN",
				"BLUE", "GREEN"
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
			par: 8,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "BLUE", "GREEN",
				"BLUE", "BLUE", "RED",
				"GREEN", "GREEN", "GREEN"],
			target: [
				"GREEN", "RED", "GREEN",
				"RED", "RED", "RED",
				"GREEN", "RED", "GREEN"
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
				"GREEN", "BLUE", "RED",
				"GREEN", "GREEN", "BLUE",
				"RED", "RED", "BLUE"],
			target: [
				"BLUE", "GREEN", "GREEN",
				"BLUE", "GREEN", "RED",
				"GREEN", "GREEN", "RED"
			]
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "GREEN", "RED",
				"GREEN", "GREEN", "BLUE",
				"GREEN", "GREEN", "BLUE"],
			target: [
				"BLUE", "BLUE", "RED",
				"BLUE", "BLUE", "BLUE",
				"GREEN", "BLUE", "BLUE"
			]
		},
		{
			par: 14,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "GREEN", "RED",
				"GREEN", "BLUE", "RED",
				"RED", "BLUE", "BLUE"],
			target: [
				"BLUE", "BLUE", "BLUE",
				"BLUE", "BLUE", "BLUE",
				"GREEN", "GREEN", "GREEN"
			]
		},
		{ // H
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
		},
		{
			par: 12,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"GREEN", "BLUE", "RED",
				"RED", "GREEN", "BLUE",
				"RED", "GREEN", "BLUE"],
			target: [
				"BLUE", "BLUE", "BLUE",
				"GREEN", "BLUE", "RED",
				"GREEN", "BLUE", "RED"
			]
		},
		{
			par: 14,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"BLUE", "RED", "BLUE",
				"BLUE", "GREEN", "GREEN",
				"BLUE", "BLUE", "RED"],
			target: [
				"BLUE", "BLUE", "RED",
				"BLUE", "BLUE", "RED",
				"RED", "RED", "RED"
			]
		},
		{
			par: 14,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE"],
			grid: [
				"RED", "RED", "GREEN",
				"RED", "RED", "BLUE",
				"BLUE", "GREEN", "RED"
			],
			target: [
				"GREEN", "GREEN", "GREEN",
				"GREEN", "RED", "GREEN",
				"GREEN", "GREEN", "GREEN"
			]
		},
		{
			par: 14,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"RED", "GREEN", "BLUE",
				"RED", "GREEN", "BLUE",
				"GREEN", "RED", "RED"
			],
			target: [
				"RED", "RED", "RED",
				"RED", "GREEN", "RED",
				"RED", "RED", "RED"
			]
		},
		{
			par: 10,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"GREEN", "PURPLE", "PURPLE",
				"GREEN", "RED", "RED",
				"BLUE", "GREEN", "GREEN"
			],
			target: [
				"PURPLE", "RED", "RED",
				"PURPLE", "GREEN", "GREEN",
				"PURPLE", "BLUE", "BLUE"
			]
		},
		{
			par: 14,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"RED", "GREEN", "BLUE",
				"RED", "RED", "PURPLE",
				"BLUE", "RED", "GREEN"
			],
			target: [
				"RED", "RED", "RED",
				"RED", "PURPLE", "RED",
				"PURPLE", "PURPLE", "PURPLE"
			]
		},
		{ // issue with animation at the end
			par: 16,
			size: 3,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"PURPLE", "RED", "BLUE",
				"PURPLE", "PURPLE", "RED",
				"GREEN", "GREEN", "BLUE"
			],
			target: [
				"PURPLE", "PURPLE", "PURPLE",
				"PURPLE", "PURPLE", "PURPLE",
				"PURPLE", "PURPLE", "PURPLE"
			]
		},
		{
			par: 24,
			size: 4,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"GREEN", "RED", "RED", "GREEN",
				"GREEN", "PURPLE", "RED", "RED",
				"BLUE", "BLUE", "RED", "RED",
				"PURPLE", "BLUE", "RED", "BLUE"
			],
			target: [
				"RED", "GREEN", "BLUE", "PURPLE",
				"RED", "GREEN", "BLUE", "PURPLE",
				"RED", "GREEN", "BLUE", "PURPLE",
				"RED", "GREEN", "BLUE", "PURPLE"
			]
		},
		{
			par: 28,
			size: 4,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"RED", "PURPLE", "GREEN", "GREEN",
				"RED", "GREEN", "RED", "BLUE",
				"PURPLE", "GREEN", "RED", "RED",
				"BLUE", "GREEN", "RED", "GREEN"
			],
			target: [
				"BLUE", "PURPLE", "PURPLE", "PURPLE",
				"BLUE", "PURPLE", "BLUE", "PURPLE",
				"BLUE", "PURPLE", "BLUE", "PURPLE",
				"BLUE", "BLUE", "BLUE", "PURPLE"
			]
		},
		{
			par: 28,
			size: 4,
			sequence: ["RED", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"GREEN", "PURPLE", "GREEN", "GREEN",
				"RED", "GREEN", "PURPLE", "BLUE",
				"RED", "GREEN", "BLUE", "BLUE",
				"BLUE", "RED", "RED", "GREEN"
			],
			target: [
				"GREEN", "GREEN", "GREEN", "GREEN",
				"GREEN", "RED", "RED", "GREEN",
				"GREEN", "RED", "RED", "GREEN",
				"GREEN", "GREEN", "GREEN", "GREEN"
			]
		},
		{
			par: 26,
			size: 4,
			sequence: ["RED", "ORANGE", "GREEN", "BLUE", "PURPLE"],
			grid: [
				"ORANGE", "PURPLE", "ORANGE", "RED",
				"RED", "BLUE", "RED", "RED",
				"BLUE", "BLUE", "PURPLE", "BLUE",
				"BLUE", "PURPLE", "ORANGE", "BLUE"
			],
			target: [
				"BLUE", "BLUE", "GREEN", "GREEN",
				"BLUE", "BLUE", "BLUE", "GREEN",
				"RED", "BLUE", "BLUE", "BLUE",
				"RED", "RED", "BLUE", "BLUE"
			]
		}

	];
});