/**
 * Created by marklabenski on 31.10.15.
 */

define(['scripts/feierabend/scene.js',
    'scripts/feierabend/grid.js',
    'scripts/feierabend/level.js',
    'scripts/feierabend/audio.js',
    'scripts/feierabend/score.js',
    'vendor/pixijs/pixi.min',
], function (createScene, createGrid, createLevel, playAudio, score) {
    var gameWidth = 800;
    var gameHeight = 600;
    var gridSize = 50;
    var loader = PIXI.loader;


    var createGame = function createGame(_grid) {
        var assets = [
            {name: 'player', file: 'img/player.png'},
            {name: 'boss', file: 'img/boss.png'},
            {name: 'coffee', file: 'img/coffee.png'},
            {name: 'workmate', file: 'img/workmate.png'},
            {name: 'door', file: 'img/door.png'},
            {name: 'paperjam', file: 'img/paperjam.png'},
            {name: 'notebook', file: 'img/notebook.png'},
            {name: 'background', file: 'img/ground.jpg'},
        ];
        var levels = [
            [
                //{type: 'background', x: 0, y:0},
                {type: 'player', id: 'player', x: 0, y: 0},
                {type: 'boss', id: 'boss', x: 9, y: 10},
                {type: 'coffee', id: 'coffee1', x: 3, y: 3},
                {type: 'coffee', id: 'coffee2', x: 3, y: 8},
                {type: 'coffee', id: 'coffee3', x: 3, y: 9},
                {type: 'workmate', id: 'workmate1', x: 5, y: 8},
                {type: 'workmate', id: 'workmate2', x: 8, y: 8},
                {type: 'door', id: 'door', x: 15, y: 11},
                {type: 'paperjam', id: 'paper1', x: 4, y: 4},
                {type: 'notebook', id: 'notebook1', x: 7, y: 7},
            ]
        ];

        var Url = {
            get get(){
                var vars= {};
                if(window.location.search.length!==0)
                    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
                        key=decodeURIComponent(key);
                        if(typeof vars[key]==="undefined") {vars[key]= decodeURIComponent(value);}
                        else {vars[key]= [].concat(vars[key], decodeURIComponent(value));}
                    });
                return vars;
            }
        };

        var SAVE_KEY = Url.get.saveKey || 'Feierabend_v0.1';
        var renderer = null;
        var gameInstance;
        var gameScene;
        var pauseScene;
        var winScene;
        var currentLevel = null;
        var currentLevelNum = 0;
        var currentScenes = [gameScene, pauseScene, winScene];
        var stage = new PIXI.Container();
        var GAMESTATE = {MENU: 'menu', INGAME: 'ingame', FINISH: 'finish'};
        var pauseText = new PIXI.Text("Game is paused\nPress SPACE to continue", {font: "30px Arial", fill: "red"});
        var winText = new PIXI.Text("Level Complete \nCongratulations!", {font: "20px Arial", fill: "red"});
        var isPaused = false;
        var finishLevel = false;
        var saveFn = undefined;

        var grid = _grid;
        var gameState = GAMESTATE.INGAME;
        var player, workmates = [], boss;
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
            var saveTimer = onElapsed(2000, timestamp);
            var onBossMove = onElapsed(1500, timestamp);

            saveTimer(saveFn);

            switch (gameState) {
                case GAMESTATE.INGAME:
                    if (!isPaused) {
                        onBossMove(function() {
                            boss.move();
                        });
                        onPlayerMove(function () {
                            player.move();
                            playAudio("footstep");

                            //Score
                            score.update(1 + player.workmatesFollowing.length);
                            score.doStep();

                            workmates.map(function (workmate) {
                                workmate.move();
                            });
                            document.querySelector('.debug-grid').innerHTML = grid.visualize();

                            // Pause the game with ESC
                            $('html').on("keydown", function (event) {
                                var canvas = $('canvas');
                                var menu = $('.menu');
                                if (event.which == '27') {
                                    // close the game
                                    canvas.slideUp(600, function () {
                                        // Then open the Menu
                                        menu.slideDown(600, function () {
                                        });
                                    });
                                }
                            });

                        });
                    }
                    break;
                case GAMESTATE.FINISH:
                    stage.addChild(winScene.container);
                    break;
            }
            renderer.render(stage);
        };

        var togglePause = function togglePause() {
            if (isPaused) {
                isPaused = false;
                stage.removeChild(pauseScene.container);
            }
            else {
                isPaused = true;
                stage.addChild(pauseScene.container);
            }
        };

        var loadedLevelObjects = [];

        var game = {
            hasBeenSaved: false,
            save: function save() {
                var saveObject = {gameState: gameState, score: score.getScore(), levelObjects: currentLevel.levelObjects };
                saveObject = JSON.stringify(saveObject);
                localStorage.setItem(SAVE_KEY, saveObject);
                this.hasBeenSaved = true;
            },
            load: function load() {
                var loadObject = JSON.parse(localStorage.getItem(SAVE_KEY));
                if(loadObject) {
                    this.changeGameState(loadObject.gameState);
                    loadedLevelObjects = loadObject.levelObjects;
                    score.setScore(loadObject.score);
                    this.hasBeenSaved = true;
                } else {

                    this.changeGameState(GAMESTATE.INGAME)
                }

            },
            getLoadedObjects: function getLoadedObjects() {
                return loadedLevelObjects;
            },
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
                    case GAMESTATE.FINISH:
                        currentScenes = [gameScene, winScene];
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
                saveFn = this.save;
                renderer = PIXI.autoDetectRenderer(800, 600);
                document.body.appendChild(renderer.view);

                gameScene = createScene();
                var bgSprite = new PIXI.Sprite(loader.resources.background.texture);
                bgSprite.width = gameWidth;
                bgSprite.height = gameHeight;
                gameScene.container.addChild(bgSprite);

                pauseScene = createScene();
                winScene = createScene();

                this.load();

                // creates Level with the index "currentLevel"
                // Level objects are defined in level.js in "levels"
                currentLevel = createLevel(levels[currentLevelNum], loader, this, gameScene, renderer);
                player = currentLevel.player; // player Object
                workmates = currentLevel.workmates; // workmates as Array
                boss = currentLevel.boss;

                pauseScene.container.addChild(pauseText);
                pauseScene.container.width = 400;
                pauseScene.container.height = 200;
                pauseScene.container.x = gameWidth / 2 - pauseScene.container.width / 2;
                pauseScene.container.y = gameHeight / 2 - pauseScene.container.height / 2;


                winScene.container.addChild(winText);
                winScene.container.width = 400;
                winScene.container.height = 200;
                winScene.container.x = gameWidth / 2 - winScene.container.width / 2;
                winScene.container.y = gameHeight / 2 - winScene.container.height / 2;


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

    return {game: game, loader: loader};
});
