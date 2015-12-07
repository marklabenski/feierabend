'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.


requirejs([
    "scripts/feierabend/game.js",
    "scripts/feierabend/music.js",
    "vendor/jquery/jquery-2.1.4.min.js",
], function(game, playMusic) {
    var bgMusic = playMusic('backgroundMusic');

    window.feierabend = game;

    // get jQuery References
    var menuButtons = $('.menu .buttons li');
    var menu = $('.menu');
    var canvas = $('canvas'); //Es existiert zu diesem Zeitpunkt noch kein Canvas-Objekt :(
    var gameAvailable = false;
    var score = $("#score");

    // If a Button Click
    menuButtons.on('click', function () {
        //Check which button is clicked...

        // Start Game Button
        if ($(this).attr("id") == "startButton") {
            // Close the menu with a slideUp
            menu.slideUp(600, function () {
                // Then open the Game
                score.text(0);
                score.slideToggle(1200);
                /*
                Dieser Teil funktioniert nicht, weil die canvas-Variable leer is
                canvas.hide(600, function () {
                })
                */
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
            canvas.slideUp(600, function () {
                // Then open the Menu
                menu.slideDown(600, function () {
                });
            });
        }
    });

    menuButtons.mouseenter(function () {
        var sound = document.getElementById('click');
        sound.play();
    });
});
