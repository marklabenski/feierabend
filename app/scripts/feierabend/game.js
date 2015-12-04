/**
 * Created by marklabenski on 31.10.15.
 */

define([ 'scripts/feierabend/scene.js',
    'scripts/feierabend/grid.js',
    'scripts/feierabend/level.js',
    'vendor/pixijs/pixi.min'
], function (createScene, createGrid, createLevel) {
    var gameWidth = 800;
    var gameHeight = 600;
    var gridSize = 50;
    var loader = PIXI.loader;


    var createGame = function createGame(_grid) {
        var assets = [
            {name: 'player', file: 'img/player.png'},
            {name: 'coffee', file: 'img/coffee.png'},
            {name: 'workmate', file: 'img/workmate.png'},
        ];

        var renderer = null;
        var gameInstance;
        var gameScene;
        var pauseScene;
		var currentLevel = 0;
        var currentScenes = [gameScene, pauseScene];
        var stage = new PIXI.Container();
        var GAMESTATE = {MENU: 'menu', INGAME: 'ingame'};
        var pauseText = new PIXI.Text("Game is paused\nPress SPACE to continue", {font: "30px Arial", fill: "red"});
        var isPaused = false;

        var grid = _grid;
        var gameState = GAMESTATE.INGAME;
        var player, workmates = [];
        var counters = {};

        assets.map(function (asset) {
            loader.add(asset.name, asset.file);
        });

        var onElapsed = function (delta, currentTimestamp) {
            currentTimestamp = currentTimestamp || 0;
            if (!counters[delta])
                counters[delta] = {elapsed: 0, lastTimestamp: currentTimestamp};

            var counter = counters[delta];

            counter.elapsed = currentTimestamp - counter.lastTimestamp;

            return function (isElapsed) {
                if (counter.elapsed > delta) {
                    counter.lastTimestamp = currentTimestamp;
                    isElapsed();
                }
            }
        };

        var render = function render(timestamp) {
            requestAnimationFrame(render);
            var onPlayerMove = onElapsed(player.speed, timestamp);

            switch (gameState) {
                case GAMESTATE.INGAME:
                    if (!isPaused) {
                        onPlayerMove(function () {
                            player.move();
                            workmates.map(function (workmate) {
                                workmate.move();
                            });
                            document.querySelector('.debug-grid').innerHTML = grid.visualize();
                        });
                    }
                    break;
            }
            renderer.render(stage);
        };

        var togglePause = function () {
            if (isPaused) {
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
            getGridSize: function getGridSize() {
                return gridSize;
            },
            getGrid: function getGrid() {
                return grid;
            },

            changeGameState: function changeGameState(stateString) {
                stage.removeChildren();
                if (GAMESTATE[stateString.toUpperCase()] === stateString.toLowerCase())
                    gameState = stateString.toLowerCase();

                switch (gameState) {
                    case GAMESTATE.INGAME:
                        currentScenes = [pauseScene, gameScene];
                        break;
                }

                currentScenes.map(function (scene) {
                    stage.addChild(scene.container);
                });
            },
            pause: function pauseGame() {
                togglePause();
            },
            init: function init() {
                renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight);
                document.body.appendChild(renderer.view);

                gameScene = createScene();
                pauseScene = createScene();
				
				// creates Level with the index "currentLevel"
				// Level objects are defined in level.js in "levels"
                var level = createLevel(currentLevel, loader, game, gameScene, renderer);
                player = level[0]; // player Object
                workmates = level[1]; // workmates as Array

                pauseScene.container.addChild(pauseText);
                pauseScene.container.width = 400;
                pauseScene.container.height = 200;
                pauseScene.container.x = gameWidth / 2 - pauseScene.container.width / 2;
                pauseScene.container.y = gameHeight / 2 - pauseScene.container.height / 2;

                this.changeGameState(GAMESTATE.INGAME);
                togglePause();
                render();

                window.addEventListener('keydown', function (event) {
                    if (!isPaused) {
                        player.changeDirectionByKeyCode(event.keyCode);
                    }

                    switch (event.keyCode) {
                        case 32:
                            togglePause();
                            break;
                    }
                });
            }
        };

        gameInstance = gameInstance || Object.create(game);
        return gameInstance;
    };

    var grid = createGrid(gridSize, gameWidth, gameHeight);

    var game = createGame(grid);
    loader.once('complete', $.proxy(game.init, game));

    return loader;
});
