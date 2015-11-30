'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.


requirejs([
    "vendor/pixijs/pixi.min",
    "scripts/feierabend/game.js",
    "scripts/feierabend/music.js",
    "vendor/jquery/jquery-2.1.4.min.js",
], function(pixi, game, playMusic) {
    window.feierabend = game;

    var bgMusic = playMusic('backgroundMusic');

    window.feierabend = game;

    // get jQuery References
    var $menuButtons = $('.menu .buttons li');
    var $menu = $('.menu');
    var $canvas = $('canvas');
    var gameAvailable = false;

    // If a Button Click
    $menuButtons.on('click', function () {
        //Check which button is clicked...

        // Start Game Button
        if ($(this).attr("id") == "startButton") {
            // Close the menu with a slideUp
            $menu.slideUp(600, function () {
                // Then open the Game
                $canvas.slideDown(600, function () {
                });
            });
            // Init the game...
            if (!gameAvailable) {
                feierabend.load();
                gameAvailable = true;
            }
        } else if ($(this).attr("id") == "highscoreButton") {
            // do something....
        }

    });

    $('html').on("keydown", function (event) {
        if (event.which == '27') {
            // close the game
            $canvas.slideUp(600, function () {
                // Then open the Menu
                $menu.slideDown(600, function () {
                });
            });
        }
    });

    $menuButtons.mouseenter(function () {
        var sound = document.getElementById('click');
        sound.play();
    });
});
