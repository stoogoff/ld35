
define(function(require) {
	return {
		// dimensions
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
			RED: "#ff0000",
			GREEN: "#35b23b",
			BLUE: "#539fed"
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
				fill: "#ffffff",
				align: "right"
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
				fill: "#ffffff",
				align: "left"
			},
		},


		// ------------------------------------------
		// old


		MUSIC_FADE: 1000,

		// font styles


	};
});