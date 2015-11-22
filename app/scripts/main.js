'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.

requirejs([ "vendor/pixijs/pixi.min", "scripts/feierabend/game.js", "vendor/howlerjs/howler.min.js","vendor/jquery/jquery-2.1.4.min.js"], function(pixi, game, howler) {

    window.feierabend = game;

    // get jQuery References
    var $menuButtons = $('.menu .buttons li');
    var $menu = $('.menu');
    var $canvas = $('canvas');

    // If a Button Click
    $menuButtons.on('click', function() {
        //Check which button is clicked...

        // Start Game Button
        if($(this).attr("id") == "startButton") {
            // Close the menu with a slideUp
            $menu.slideUp(600, function() {
                // Then open the Game
                $canvas.slideDown(600, function() {
                });
            });
            // Init the game...
            feierabend.init();
        } else if($(this).attr("id") == "highscoreButton") {
            // do something....
        }

    });

    // This function is not complete
    // This function should play a click sound if the user enters a button with the mouse
    $menuButtons.mouseenter(function() {
        var sound = new Howl({
            urls: ['../sound/click.wav']
        });
        sound.play();
    });

});
