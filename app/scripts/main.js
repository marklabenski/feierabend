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
    window.feierabend = game;

    var bgMusic = playMusic('backgroundMusic');
});
