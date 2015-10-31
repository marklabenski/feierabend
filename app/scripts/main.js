'use strict';
/**
 * Created by marklabenski on 31.10.15.
 */
    // pixi exposes a premade instance for you to use.

var createRequire = function createRequire() {
    window.exports = window.exports || {};
    var requireInstance;
    var dependencies = [];
    var dfd = $.Deferred();

    var require = {
        require: function(scripts, done) {
            if (!Array.isArray(scripts))
                scripts = [scripts];
            scripts.map(function (script) {
                if (dependencies.indexOf(script) === -1) {
                    dfd.done($.getScript("scripts/" + script).then(function() {}));
                    dependencies.push(script);
                }
            });

            dfd.done(function () {
                done()
            });
            dfd.resolve();
        }
    };

    requireInstance = requireInstance || Object.create(require);

    return requireInstance;
};


window.require = createRequire().require;


require('feierabend/game.js', function () {
});



