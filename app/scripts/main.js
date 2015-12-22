'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.


requirejs([
    "scripts/feierabend/game.js",
    "scripts/feierabend/music.js",
    "scripts/feierabend/highscore.js",
    "scripts/feierabend/highscore.js",
    "vendor/jquery/jquery-2.1.4.min.js",
    "vendor/smothScrolling/smothScrolling.js",
], function(game, playMusic) {
	
    var bgMusic = playMusic('backgroundMusic');

    window.feierabend = game;

    // get jQuery References
    var menuButtons = $('.menu .buttons li');
    var mainpage = $('#mainpage');
    var score = $("#infoPanel");

    var scorelist = $("#highscore-lists");
	
    var gameAvailable = false;

    // If a Button Click
    menuButtons.on('click', function () {
        //Check which button is clicked...

        // Start Game Button
        if ($(this).attr("id") == "startButton") {
            // Close the Highscorelist
            scorelist.hide();

            // Close the menu with a slideUp
            mainpage.slideUp(600, function () {
				
				if(gameAvailable) {
					var canvas = $('canvas');
					canvas.slideDown(1000);
				}
                
            });
            // Init the game...
            if (!gameAvailable) {
				//score.text(0);
				score.show(1200);
                feierabend.loader.load();
                gameAvailable = true;
            }
        } else if ($(this).attr("id") == "highscoreButton") {

        }

    });

    menuButtons.mouseenter(function () {
        var sound = document.getElementById('click');
        sound.play();
    });

    showHighscoreList();
    initSmothScrolling ();

});
