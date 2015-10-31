/**
 * Created by marklabenski on 31.10.15.
 */

require('feierabend/player.js', function (player) {
    var gameWidth = 800;
    var gameHeight = 600;
    var gridSize = 50;

    var assets = [
        { name: 'player', file: 'img/player.png'}
    ];

    var renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight, {backgroundColor: 0x1099bb});
    document.body.appendChild(renderer.view);

    var loader = PIXI.loader;

    assets.map(function(asset) {
        loader.add(asset.name, asset.file);
    });

    var createGame = function createGame() {
        var stage = new PIXI.Container();
        var player;
        var counters = {};

        var onElapsed = function (delta, currentTimestamp) {
            currentTimestamp = currentTimestamp || 0;
            if(!counters[delta])
                counters[delta] = {elapsed: 0, lastTimestamp: currentTimestamp};

            var counter = counters[delta];

            counter.elapsed = currentTimestamp - counter.lastTimestamp;

            return function (isElapsed) {
                if(counter.elapsed > delta) {
                    counter.lastTimestamp = currentTimestamp;
                    isElapsed();
                }
            }
        };

        var render = function render(timestamp) {
            requestAnimationFrame(render);
            var everySecond = onElapsed(500, timestamp);
            everySecond(function() {
                player.move();
            });

            // render the container
            renderer.render(stage);
        };

        var game = {
            getBounds: function getBounds() {
                return {x: gameWidth, y: gameHeight};
            },
            init: function init() {
                player = window.createPlayer(loader.resources.player.texture);

                stage.addChild(player.getSprite());

                renderer.render(stage);

                render();

                window.addEventListener('keydown', function (event) {

                    player.changeDirectionByKeyCode(event.keyCode);
                });
            }
        };
        return Object.create(game);
    };

    window.game = window.game || createGame();

    loader.once('complete', game.init);
    loader.load();
});
