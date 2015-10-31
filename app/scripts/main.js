'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
 // pixi exposes a premade instance for you to use.

window.require = function require(scripts, done) {
    var dependencies = [];
    var dfd = $.Deferred();
    if(!Array.isArray(scripts))
        scripts = [scripts];
    scripts.map(function (script) {
        if(dependencies.indexOf(script) === -1) {
            dfd.done($.getScript("scripts/" + script));
            dependencies.push(script);
        }
    });

    dfd.done(function () {done()});
    dfd.resolve();
};

require('feierabend/game.js', function(){ debugger;});



