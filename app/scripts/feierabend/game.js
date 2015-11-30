/**
 * Created by marklabenski on 31.10.15.
 */

define(['scripts/feierabend/player.js',
    'scripts/feierabend/scene.js',
    'scripts/feierabend/grid.js',
    'scripts/feierabend/collectable.js',
    'scripts/feierabend/workmate.js',
    'vendor/pixijs/pixi.min'
], function (createPlayer, createScene, createGrid, createCollectable, createWorkmate) {
    var gameWidth = 800;
    var gameHeight = 600;
    var gridSize = 50;
    var loader = PIXI.loader;
    var levels = [
        [
            {type: 'player', id: 'player', x: 0, y: 0},
            {type: 'coffee', id: 'coffee1', x: 3, y: 3},
            {type: 'coffee', id: 'coffee2', x: 3, y: 8},
            {type: 'workmate', id: '1', x: 5, y: 8},
            {type: 'workmate', id: '2', x: 8, y: 8}
        ]
    ];


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
        var player, coffee, workmates = [];
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
            var afterPlayerMove = onElapsed(player.speed + 1, timestamp);

            switch (gameState) {
                case GAMESTATE.INGAME:
                    if (!isPaused) {
                        onPlayerMove(function () {
                            player.move();
                            workmates.map(function (workmate) {
                                workmate.move();
                            });
                        });
                        afterPlayerMove(function () {
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
            changeGameState: function changeGameState(stateString) {
                stage.removeChildren();
                if (GAMESTATE[stateString.toUpperCase()] === stateString.toLowerCase())
                    gameState = stateString.toLowerCase();

                switch (gameState) {
                    case GAMESTATE.INGAME:
                        currentScenes = [pauseScene, gameScene];
                        break;
                    default:
                        //something
                        break;
                }

                currentScenes.map(function (scene) {
                    stage.addChild(scene.container);
                });
            },
            pause: function pauseGame() {
                togglePause();
            },
            getGrid: function getGrid() {
                return grid;
            },
            createLevel: function createLevel() {
                levels[currentLevel].map(
                    function (object) {
                        switch (object.type) {
                            case 'player':
                                player = createPlayer(loader.resources.player.texture, game);
                                gameScene.container.addChild(player.getSprite());
                                break;
                            case 'coffee':
                                var newObject = createCollectable(object.id, loader.resources.coffee.texture, game,
                                    function collideFn(collideObj, eventObj) {
                                        if (collideObj.id === 'player') {
                                            collideObj.speed = 200;
                                            setTimeout(function () {
                                                collideObj.speed = 500
                                            }, 2000);
                                            eventObj.getSprite().visible = false;
                                        }
                                    }, {x: object.x, y: object.y});
                                gameScene.container.addChild(newObject.getSprite());
                                break;
                            case 'workmate':
                                var newWorkmate = createWorkmate(1, loader.resources.workmate.texture, game, {
                                    x: object.x,
                                    y: object.y
                                });
                                workmates.push(newWorkmate);
                                gameScene.container.addChild(newWorkmate.getSprite());
                        }

                    }
                );
            },
            init: function init() {
                renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight, {backgroundColor: 0x1099bb});
                document.body.appendChild(renderer.view);

                gameScene = createScene();
                pauseScene = createScene();

                this.createLevel();

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
