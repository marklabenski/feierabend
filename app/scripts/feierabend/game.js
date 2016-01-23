//noinspection SpellCheckingInspection,JSFileReferences
/**
 * Created by marklabenski on 31.10.15.
 */

define(['scripts/feierabend/scene.js',
    'scripts/feierabend/grid.js',
    'scripts/feierabend/level.js',
    'scripts/feierabend/audio.js',
    'scripts/feierabend/score.js',
    'scripts/feierabend/modal.js',
    'scripts/feierabend/countdown.js',
    'vendor/pixijs/pixi.min',

], function (createScene, createGrid, createLevel, playAudio, score, createModal) {
    var gameWidth = 800;
    var gameHeight = 600;
    var gridSize = 50;
    //noinspection AmdModulesDependencies
    var loader = PIXI.loader;
	var grid;

    var createGame = function createGame(_grid) {
        var maxX = (gameWidth/gridSize) - 1;
        var maxY = (gameHeight/gridSize) - 1;
        var assets = [
            {name: 'player', file: 'img/player.png'},
            {name: 'boss', file: 'img/boss.png'},
            {name: 'coffee', file: 'img/coffee.png'},
            {name: 'workmate', file: 'img/workmate.png'},
            {name: 'door', file: 'img/door.png'},
            {name: 'paperjam', file: 'img/paperjam.png'},
            {name: 'notebook', file: 'img/notebook.png'},
            {name: 'background', file: 'img/floor.png'},
            {name: 'wall', file: 'img/wall.png'},
            {name: 'chair', file: 'img/officechair.png'},
            {name: 'plant', file: 'img/plant.png'},
            {name: 'table_end_left', file: 'img/table_end_left.png'},
            {name: 'table_end_right', file: 'img/table_end_right.png'},
            {name: 'table_1', file: 'img/table_1.png'},
            {name: 'table_2', file: 'img/table_2.png'},
            {name: 'table_3', file: 'img/table_3.png'},
        ];
        var levels = [
            {
                timer: 25,
                objects: [
                    {type: 'coffee', id: 'coffee1', x: 2, y: 5},
                    {type: 'coffee', id: 'coffee2', x: 4, y: 2},
                    {type: 'coffee', id: 'coffee3', x: 12, y: 8},

                    {type: 'door', id: 'door', x: maxX-1, y: maxY-1},
                    {type: 'paperjam', id: 'paper1', x: 9, y: 5},

                    {type: 'plant', id: 'plant1', x: 4, y: 1},
                    {type: 'plant', id: 'plant2', x: 9, y: 1},
                    {type: 'plant', id: 'plant3', x: 14, y: 1},
                    {type: 'plant', id: 'plant4', x: 15, y: 9},
                    {type: 'plant', id: 'plant5', x: 8, y: 10},

                    {type: 'table_end_left', id: 'table1', x: 3, y: 3},
                    {type: 'table_end_right', id: 'table2', x: 4, y: 3},
                    {type: 'table_1', id: 'table3', x: 3, y: 5},
                    {type: 'table_2', id: 'table4', x: 4, y: 5},
                    {type: 'table_end_left', id: 'table5', x: 3, y: 7},
                    {type: 'table_end_right', id: 'table6', x: 4, y: 7},
                    {type: 'table_1', id: 'table7', x: 3, y: 9},
                    {type: 'table_2', id: 'table8', x: 8, y: 3},
                    {type: 'table_end_left', id: 'table9', x: 9, y: 3},
                    {type: 'table_end_right', id: 'table10', x: 9, y: 4},
                    {type: 'table_1', id: 'table11', x: 8, y: 7},
                    {type: 'table_2', id: 'table12', x: 9, y: 7},
                    {type: 'table_end_left', id: 'table13', x: 8, y: 9},
                    {type: 'table_end_right', id: 'table14', x: 9, y: 9},
                    {type: 'table_1', id: 'table15', x: 12, y: 3},
                    {type: 'table_2', id: 'table16', x: 13, y: 3},
                    {type: 'table_end_left', id: 'table17', x: 12, y: 6},
                    {type: 'table_1', id: 'table19', x: 12, y: 7},
                    {type: 'table_2', id: 'table20', x: 13, y: 7},
                    {type: 'table_end_right', id: 'table22', x: 12, y: 9},
                    {type: 'table_1', id: 'table23', x: 13, y: 9},

                    {type: 'chair', id: 'chair1', x: 4, y: 4},
                    {type: 'chair', id: 'chair2', x: 4, y: 6},
                    {type: 'chair', id: 'chair3', x: 4, y: 8},
                    {type: 'chair', id: 'chair4', x: 11, y: 6},


                    {type: 'workmate', id: 'workmate1', x: 3, y: 4},
                    {type: 'workmate', id: 'workmate2', x: 3, y: 6},
                    {type: 'workmate', id: 'workmate3', x: 10, y: 3},
                    {type: 'workmate', id: 'workmate4', x: 9, y: 8},
                    {type: 'workmate', id: 'workmate5', x: 13, y: 6},
                    {type: 'workmate', id: 'workmate6', x: 14, y: 9},

                    {type: 'boss', id: 'boss', x: 12, y: 6},
                    {type: 'player', id: 'player', x: 1, y: 1},
                ]
            },
            {
                timer: 20,
                objects: [
                    {type: 'coffee', id: 'coffee1', x: 2, y: 7},
                    {type: 'coffee', id: 'coffee2', x: 4, y: 6},
                    {type: 'coffee', id: 'coffee3', x: 7, y: 10},
                    {type: 'coffee', id: 'coffee4', x: 11, y: 8},

                    {type: 'paperjam', id: 'paper1', x: 10, y: 4},
                    {type: 'paperjam', id: 'paper2', x: 4, y: 8},

                    {type: 'table_end_left', id: 'table1', x: 3, y: 1},
                    {type: 'table_end_right', id: 'table2', x: 4, y: 1},
                    {type: 'table_1', id: 'table3', x: 4, y: 3},
                    {type: 'table_2', id: 'table4', x: 3, y: 5},
                    {type: 'table_end_left', id: 'table5', x: 3, y: 6},
                    {type: 'table_end_right', id: 'table6', x: 3, y: 7},
                    {type: 'table_1', id: 'table7', x: 3, y: 8},
                    {type: 'table_2', id: 'table8', x: 3, y: 9},
                    {type: 'table_end_left', id: 'table9', x: 2, y: 10},
                    {type: 'table_end_right', id: 'table10', x: 1, y: 10},
                    {type: 'table_1', id: 'table11', x: 7, y: 1},
                    {type: 'table_2', id: 'table12', x: 8, y: 1},
                    {type: 'table_end_left', id: 'table13', x: 11, y: 1},
                    {type: 'table_end_right', id: 'table14', x: 12, y: 1},
                    {type: 'table_1', id: 'table15', x: 13, y: 1},
                    {type: 'table_2', id: 'table16', x: 7, y: 3},
                    {type: 'table_end_left', id: 'table17', x: 8, y: 3},
                    {type: 'table_1', id: 'table19', x: 9, y: 3},
                    {type: 'table_2', id: 'table20', x: 10, y: 3},
                    {type: 'table_end_right', id: 'table22', x: 11, y: 3},
                    {type: 'table_1', id: 'table23', x: 12, y: 3},
                    {type: 'table_end_left', id: 'table24', x: 7, y: 4},
                    {type: 'table_end_right', id: 'table25', x: 11, y: 6},
                    {type: 'table_1', id: 'table26', x: 11, y: 7},
                    {type: 'table_2', id: 'table27', x: 7, y: 7},
                    {type: 'table_end_left', id: 'table28', x: 8, y: 7},
                    {type: 'table_1', id: 'table29', x: 7, y: 9},
                    {type: 'table_2', id: 'table30', x: 8, y: 9},
                    {type: 'table_end_right', id: 'table31', x: 14, y: 8},
                    {type: 'table_1', id: 'table32', x: 14, y: 9},
                    {type: 'table_end_right', id: 'table33', x: 10, y: 9},
                    {type: 'table_1', id: 'table34', x: 11, y: 9},
                    {type: 'table_1', id: 'table34', x: 12, y: 9},

                    {type: 'plant', id: 'plant1', x: 3, y: 10},
                    {type: 'plant', id: 'plant2', x: 6, y: 1},
                    {type: 'plant', id: 'plant3', x: 9, y: 9},
                    {type: 'plant', id: 'plant4', x: 13, y: 3},
                    {type: 'plant', id: 'plant5', x: 13, y: 9},
                    {type: 'plant', id: 'plant6', x: 14, y: 1},

                    {type: 'chair', id: 'chair1', x: 4, y: 4},
                    {type: 'chair', id: 'chair2', x: 4, y: 5},
                    {type: 'chair', id: 'chair3', x: 8, y: 4},
                    {type: 'chair', id: 'chair4', x: 12, y: 4},
                    {type: 'chair', id: 'chair5', x: 10, y: 6},

                    {type: 'door', id: 'door', x: maxX-1, y: maxY-1},

                    {type: 'workmate', id: '1', x: 4, y: 2, gender: 'w'},
                    {type: 'workmate', id: '2', x: 4, y: 7},
                    {type: 'workmate', id: '3', x: 4, y: 9, gender: 'w'},
                    {type: 'workmate', id: '4', x: 1, y: 9},
                    {type: 'workmate', id: '5', x: 10, y: 1},
                    {type: 'workmate', id: '6', x: 9, y: 4, gender: 'w'},
                    {type: 'workmate', id: '7', x: 11, y: 4},
                    {type: 'workmate', id: '8', x: 8, y: 6},
                    {type: 'workmate', id: '9', x: 10, y: 8},

                    {type: 'player', id: 'player', x: 1, y: 1},
                    {type: 'boss', id: 'boss', x: 9, y: 3},
                ],
            },

        ];


        levels.map(function(currentLevel) {
            var levelObjects = currentLevel.objects;
            for(var i=0; i <= maxX;i++) {
                levelObjects.push({type: 'wall', id:'wall_' + i + '_' + '0', x: i, y: 0});
                levelObjects.push({type: 'wall', id:'wall_' + i + '_' + maxY, x: i, y: maxY});
            }

            for(var v=1; v <= maxY-1;v++) {
                levelObjects.push({type: 'wall', id:'wall_' + '0' + '_' + v, x: 0, y: v});
                levelObjects.push({type: 'wall', id:'wall_' + maxX + '_' + v, x: maxX, y: v});
            }
        });


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

        //noinspection JSUnresolvedVariable
        var SAVE_KEY = Url.get.saveKey || 'Feierabend_v0.1';
        var renderer = null;
        var gameInstance;
        var gameScene;
        var winScene;
        var currentLevel = null;
        var currentLevelNum = 0;
        var pauseModal = createModal('.modal', '.modal-overlay', 'Game is paused. <br >Please hit SPACE to continue.', 'PAUSE');
        var finishModal = createModal('.modal', '.modal-overlay', 'finish', 'finish');

		    var $levelInfo = $("#level");
        //noinspection JSUnusedAssignment
        var currentScenes = [gameScene, winScene];
        //noinspection AmdModulesDependencies
        var stage = new PIXI.Container();
        var GAMESTATE = {MENU: 'menu', INGAME: 'ingame', FINISH: 'finish', GAMEEND: 'gameend', PAUSE: 'pause'};
        //noinspection AmdModulesDependencies
        var pauseText = new PIXI.Text("Game is paused\nPress SPACE to continue", {font: "30px Arial", fill: "red"});
        var isPaused = false;
        var finishLevel = false;
        var gameEnd = false;
        var saveFn = undefined;
        var levelBeginTime;
        var levelEndTime;
        var deltaTime;
        var countdownElapsed = false;

        var fadeOutObjects = [];

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

        var fadeOuts = function() {

            if(fadeOutObjects.length >= 1) {

                fadeOutObjects.map(function(fadeOutObj) {
                    var sprite = fadeOutObj.getSprite();
                    if(sprite.alpha > 0.01) {
                        sprite.alpha-= 0.01;
                    }
                    else {
                        fadeOutObj.hide();
                        fadeOutObjects.splice(fadeOutObjects.indexOf(fadeOutObj, 1));
                        gameScene.container.removeChild(sprite);
                    }

                });
            }
        };

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
            fadeOutObject: function fadeOutObject(obj) {
                fadeOutObjects.push(obj);
            },
            getLoadedObjects: function getLoadedObjects() {
                return loadedLevelObjects;
            },
            getBounds: function getBounds() {
                return {x: gameWidth, y: gameHeight};
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
                        currentScenes = [gameScene];
                        break;
                    case GAMESTATE.FINISH:
                        currentScenes = [gameScene];
                        break;
                }

                currentScenes.map(function (scene) {
                    stage.addChild(scene.container);
                });
            },
            pause: function pauseGame() {
                togglePause();
            },
            isGamePaused: function() {
                return isPaused;
            },

            resetAssets: function resetAssets() {
                player = null;
                workmates = null;
                boss = null;
            },

            initLevel: function initLevel(currentLevelNum) {
                if(levels[currentLevelNum] != null) {
                    if(finishLevel) {
                        // end Time measure
                        levelEndTime = new Date().getTime();
                        // needed time for currentLevel in seconds
                        deltaTime = (levelEndTime - levelBeginTime) / 1000;
                        finishLevel = false;
                        currentLevel.countdown.destroy();
                        countdownElapsed = false;
                    }
                    // start Time measure
                    levelBeginTime = new Date().getTime();
                    this.resetAssets();
                    // creates Level with the index "currentLevel"
                    // Level objects are defined in level.js in "levels"
                    gameScene.container.removeChildren();
                    //noinspection AmdModulesDependencies
                    var bgSprite = new PIXI.Sprite(loader.resources.background.texture);
                    bgSprite.width = gameWidth;
                    bgSprite.height = gameHeight;
                    gameScene.container.addChild(bgSprite);
                    grid = createGrid(gridSize, gameWidth, gameHeight);
                    currentLevel = createLevel(levels[currentLevelNum], loader, this, gameScene, renderer, score);
                    $levelInfo.text("Level: " + (currentLevelNum + 1));
                    player = currentLevel.player; // player Object
                    workmates = currentLevel.workmates; // workmates as Array
                    boss = currentLevel.boss;
                    score = currentLevel.score;
                }
            },

            stopCountDown: function(){
                countdownElapsed = true;
            },

            init: function init() {
                saveFn = this.save;
                //noinspection AmdModulesDependencies
                renderer = PIXI.autoDetectRenderer(800, 600);
                document.body.appendChild(renderer.view);

                gameScene = createScene();

                winScene = createScene();

                this.load();
                this.initLevel(currentLevelNum);

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
                            if(!countdownElapsed){
                                score.update(1 + player.workmatesFollowing.length, false);
                                score.doStep();
                            }                            

                            workmates.map(function (workmate) {
                                workmate.move();
                            });
                            document.querySelector('.debug-grid').innerHTML = grid.visualize();
                        });
                    } else {
                        game.changeGameState("PAUSE");
                    }
                    fadeOuts();
                    break;
                case GAMESTATE.FINISH:
                    currentLevelNum += 1;
                    if(levels[currentLevelNum] != null) {
                        finishLevel = true;
                        game.initLevel(currentLevelNum);
                        game.changeGameState("INGAME");
                    } else {
                        game.changeGameState("GAMEEND");
                        gameEnd = true;
                    }
                    break;
                case GAMESTATE.GAMEEND:
                    if(gameEnd) {
                        $('#entry-highscore').css("display", "block");
                        $('#entry-highscore_points_points').append(JSON.parse(score.getScore()));
                        gameEnd = false;
                    }
                    break;
                case GAMESTATE.PAUSE:
                    if(isPaused) {
                        $('#pause-menu').css("display", "block");
                    } else {
                        $('#pause-menu').css("display", "none");
                        game.changeGameState("INGAME");
                    }
                    break;
            }
            renderer.render(stage);
        };

        var togglePause = function togglePause() {
            if (isPaused) {
                isPaused = false;
                //stage.removeChild(pauseScene.container);
                pauseModal.hide();
            }
            else {
                isPaused = true;
                pauseModal.show();
                //stage.addChild(pauseScene.container);
            }
        };

        var loadedLevelObjects = [];

        //noinspection JSUnusedAssignment
        gameInstance = gameInstance || Object.create(game);
        return gameInstance;
    };

    grid = createGrid(gridSize, gameWidth, gameHeight);

    var game = createGame(grid);

    //noinspection AmdModulesDependencies
    loader.once('complete', $.proxy(game.init, game));

    return {game: game, loader: loader};
});
