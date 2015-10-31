/**
 * Created by marklabenski on 31.10.15.
 */

require(['feierabend/player.js', 'feierabend/scene.js'], function () {
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
        var gameScene;
        var pauseScene;
        var currentScenes = [gameScene, pauseScene];
        var stage = new PIXI.Container();
        var GAMESTATE = { MENU: 'menu', INGAME: 'ingame'};
        var pauseText = new PIXI.Text("Game is paused\nPress SPACE to continue", {font:"30px Arial", fill:"red"});
        var isPaused = false;
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
            var everySecond = onElapsed(500, timestamp);

            switch (gameState) {
                case GAMESTATE.INGAME:
                    if(!isPaused) {
                        everySecond(function () {
                            player.move();
                        });
                    }
                    break;
            }
            renderer.render(stage);
        };

        var togglePause = function() {
            if(isPaused) {
                isPaused = false;
                stage.removeChild(pauseScene.container);
            }
            else {
                isPaused = true;
                stage.addChild(pauseScene.container);
            }
        };

        var game = {
            getBounds: function getBounds() {
                return {x: gameWidth, y: gameHeight};
            },
            changeGameState: function changeGameState(stateString) {
                stage.removeChildren();
                if(GAMESTATE[stateString.toUpperCase()] === stateString.toLowerCase())
                    gameState = stateString.toLowerCase();

                switch (gameState) {
                    case GAMESTATE.INGAME:
                        currentScenes = [pauseScene, gameScene];
                        break;
                    default:
                        //something
                        break;
                }

                currentScenes.map(function(scene){
                    stage.addChild(scene.container);
                });
            },
            pause: function pauseGame() {
                togglePause();
            },
            init: function init() {
                gameScene = createScene();

                pauseScene = createScene();

                player = window.createPlayer(loader.resources.player.texture);
                gameScene.container.addChild(player.getSprite());

                pauseScene.container.addChild(pauseText);
                pauseScene.container.width = 400;
                pauseScene.container.height = 200;
                pauseScene.container.x = gameWidth/2 - pauseScene.container.width /2;
                pauseScene.container.y = gameHeight/2 - pauseScene.container.height /2;

                this.changeGameState(GAMESTATE.INGAME);
                togglePause();
                render();

                window.addEventListener('keydown', function (event) {
                    if(!isPaused) {
                        player.changeDirectionByKeyCode(event.keyCode);
                    }

                    switch(event.keyCode) {
                        case 32:
                            togglePause();
                            break;
                    }
                });
            }
        };
        return Object.create(game);
    };

    window.game = window.game || createGame();

    loader.once('complete', $.proxy(game.init, game));
    loader.load();
});
