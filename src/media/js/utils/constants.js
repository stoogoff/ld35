
define(function(require) {
	return {
		// dimensions
		SCREEN_WIDTH: 800,
		SCREEN_HEIGHT: 600,

		PLAY_AREA_SIZE: 600,

		PAD: 20,

		COLOURS: {
			RED: "#ff0000",
			GREEN: "#35b23b",
			BLUE: "#539fed"
		},

		// ------------------------------------------
		// old
		TILE_WIDTH: 160,
		TILE_HEIGHT: 160,

		PLAYER_WIDTH: 120,
		PLAYER_HEIGHT: 120,

		// game constants
		ENEMY_MAX: 20,
		FEAR_RANGE: 460,
		JUMP_SMALL: 275,
		JUMP_FULL: 400,
		GRAVITY_WORLD: 400,
		GRAVITY_PLAYER: 400,

		SPEED_START: 200,
		SPEED_INCREMENT: 40,

		SCORE_KILL: 10,
		SCORE_FALL: 1,

		MUSIC_FADE: 1000,

		// font styles
		STYLE_TITLE: {
			font: "65px Arial",
			fill: "#ffffff",
			align: "center",
			stroke: "black",
			strokeThickness: 2
		},
		STYLE_BODY: {
			font: "16px Arial",
			fill: "#ffffff",
			align: "left"
		},
		STYLE_HUD: {
			font: "bold 16px Arial",
			fill: "#cfcfcf"
		}
	};
});