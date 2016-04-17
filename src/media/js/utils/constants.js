
define(function(require) {
	return {
		OVERLAY_COLOUR: "rgba(0, 0, 0, 1)",

		SCREEN_WIDTH: 800,
		SCREEN_HEIGHT: 600,

		PLAY_AREA_SIZE: 600,

		INFO_WIDTH: 200,
		INFO_HEIGHT: 600,

		SEQUENCE_HEIGHT: 20,

		PAD: 20,
		PAD_HALF: 10,

		MAX_ACTIVE: 2,

		COLOURS: {
			RED: "#cb1f1f",
			ORANGE: "#ffcc15",
			GREEN: "#35b23b",
			BLUE: "#539fed",
			PURPLE: "#9f46bf"
		},

		SPEED: 0.1,

		INACTIVE: 1,
		ACTIVE: 0.7,


		TEXT: {
			MOVES: "Moves: ",
			LEVEL: "Level: ",
			PAR: "Par: "
		},

		TEXT_PADDING: 40,

		STYLES: {
			HUD: {
				font: "bold 20px Arial",
				fill: "#ffffff"
			},
			TITLE: {
				font: "65px Arial",
				fill: "#ffffff",
				align: "center",
				stroke: "black",
				strokeThickness: 2
			},
			BODY: {
				font: "16px Arial",
				fill: "#ffffff"
			},
		}
	};
});