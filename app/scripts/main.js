'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.

requirejs([ "vendor/pixijs/pixi.min", "scripts/feierabend/game.js","vendor/jquery/jquery-2.1.4.min.js"], function(pixi, game) {
    window.feierabend = game;

    $('button').on('click', function() {
        feierabend.init();
    });
});
