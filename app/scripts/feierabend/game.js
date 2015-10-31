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
        var pausedContainer = new PIXI.DisplayObjectContainer();
        var gameContainer = new PIXI.Container();
        var stage = new PIXI.Container();
        var GAMESTATE = { MENU: 'menu', INGAME: 'ingame'};
        var pauseText = new PIXI.Text("Game is paused\nPress SPACE to continue", {font:"30px Arial", fill:"red"});
        var isPaused = true;
        var gameState = GAMESTATE.INGAME;
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
            stage.removeChildren();
            switch (gameState) {
                case GAMESTATE.INGAME:
                    stage.addChild(gameContainer);
                    if(isPaused) {
                        stage.addChild(pausedContainer);
                    } else {
                        stage.removeChild(pausedContainer);
                        var everySecond = onElapsed(500, timestamp);
                        everySecond(function () {
                            player.move();
                        });
                    }
                    break;
                default:
                    //something
                    break;
            }
            renderer.render(stage);
        };

        var game = {
            getBounds: function getBounds() {
                return {x: gameWidth, y: gameHeight};
            },
            changeGameState: function changeGameState(stateString) {
                if(GAMESTATE[stateString.toUpperCase()] === stateString.toLowerCase())
                    gameState = stateString.toLowerCase();
            },
            pause: function pauseGame() {
                isPaused = true;
            },
            resume: function() {
                isPaused = false;
            },
            init: function init() {
                player = window.createPlayer(loader.resources.player.texture);

                gameContainer.addChild(player.getSprite());

                pausedContainer.addChild(pauseText);
                pausedContainer.width = 400;
                pausedContainer.height = 200;
                pausedContainer.x = gameWidth/2 - pausedContainer.width /2;
                pausedContainer.y = gameHeight/2 - pausedContainer.height /2;

                render();

                window.addEventListener('keydown', function (event) {
                    if(!isPaused) {
                        player.changeDirectionByKeyCode(event.keyCode);
                    }

                    switch(event.keyCode) {
                        case 32:
                            isPaused = !isPaused;
                            break;
                    }
                });
            }
        };
        return Object.create(game);
    };

    window.game = window.game || createGame();

    loader.once('complete', game.init);
    loader.load();
});
