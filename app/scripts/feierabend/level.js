/**
 * Created by m-oez on 02.12.2015.
 */

define(['scripts/feierabend/player.js',
    'scripts/feierabend/collectable.js',
    'scripts/feierabend/boss.js',
    'scripts/feierabend/workmate.js',
    'scripts/feierabend/viewable.js',
    'scripts/feierabend/music.js',
    'scripts/feierabend/audio.js',
    'scripts/feierabend/countdown.js',
], function (createPlayer, createCollectable, createBoss, createWorkmate, createViewable, playMusic, playAudio, createCountDown) {

    return function createLevel(level, loader, game, gameScene, renderer, score) {
        var childrenToAdd = [];
        var workmates = [];
        var player = null;
        var boss = null;
        var levelObjects = [];
        var followPlayer = [];
        var hiddenObjects = [];
        

        if(game.hasBeenSaved) {
            level.objects.map(function (object) {
                game.getLoadedObjects().map(function(loadedObject) {
                    if(object.id === loadedObject.id) {
                        object.x = loadedObject.gridPos.x;
                        object.y = loadedObject.gridPos.y;
                        if (loadedObject.id === 'player') {
                            followPlayer = loadedObject.workmatesFollowing;
                        }
                        if (loadedObject.visible === false) {
                            hiddenObjects.push(object.id);
                        }
                    }

                });
            });
        }

        var addLevelObject = function addLevelObject(object) {
            if(hiddenObjects.indexOf(object.id) != -1) {
                object.hide();
                if(object.hasOwnProperty('collected') && object.collected) {
                    object.collect();
                }
            }
            levelObjects.push(object);

            childrenToAdd.push(object.getSprite());
        };
        level.objects.map(
            function (object) {
                switch (object.type) {
                    case 'player':
                        player = createPlayer(loader.resources.player.texture, game, {x: object.x, y: object.y});
                        addLevelObject(player);
                        break;
                    case 'boss':
                        boss = createBoss(loader.resources.boss.texture, game, {x: object.x, y: object.y});
                        addLevelObject(boss);
                        //playAudio('boss');
                        break;
                    case 'coffee':
                        var newObject = createCollectable(object.id, loader.resources.coffee.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    collideObj.speed = 200;
                                    score.update(7, true);
                                    playAudio("drinkCoffee");
                                    playMusic('backgroundMusicFast');
                                    setTimeout(function () {
                                        collideObj.speed = 500;
                                        playMusic('backgroundMusic');
                                    }, 2000);
                                    game.fadeOutObject(eventObj);
                                    this.collideFn = function() {};
                                }
                            }, {x: object.x, y: object.y});

                        addLevelObject(newObject);
                        break;

                    case 'paperjam':
                        var newObject = createCollectable(object.id, loader.resources.paperjam.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    score.update(-10, true);
                                    collideObj.speed = 850;
                                    playAudio("workOnPaper");
									
									                  var filter = new PIXI.filters.GrayFilter();
									                  filter.gray = 0.5;
                                    setTimeout(function () {
                                        collideObj.speed = 500;
                                        playMusic('backgroundMusic');
                                    }, 2000);
                                    game.fadeOutObject(eventObj);
                                    collideObj.loseLastWorkmate();
                                    this.collideFn = function() {};
                                }
                            }, {x: object.x, y: object.y});

                        addLevelObject(newObject);
                        break;

                    case 'notebook':
                        var newObject = createCollectable(object.id, loader.resources.notebook.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    score.update(-6, true);
									                  collideObj.speed = 650;
                                    playAudio("workOnNotebook");
                                    setTimeout(function () {
                                        collideObj.speed = 500;
                                        playMusic('backgroundMusic');
                                    }, 2000);
                                    game.fadeOutObject(eventObj);
                                    collideObj.loseLastWorkmate();
                                    this.collideFn = function() {};
                                }
                            }, {x: object.x, y: object.y});

                        addLevelObject(newObject);
                        break;
                        
                    case 'door':
                        var newObject = createCollectable(object.id, loader.resources.door.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    playAudio("win");
                                    game.changeGameState("FINISH");
                                }
                            }, {x: object.x, y: object.y});

                        addLevelObject(newObject);
                        break;

                    case 'wall':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.wall.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;
                        
                    case 'workmate':
                        var gender;
                        if(object.hasOwnProperty('gender')) {
                            gender = object.gender;
                        } else {
                            gender = 'm'
                        }
                        var newWorkmate = createWorkmate(object.id, loader.resources.workmate.texture, game, gender, {

                            x: object.x,
                            y: object.y
                        });
                        
                        workmates.push(newWorkmate);
                        addLevelObject(newWorkmate);
                        break;

                    case 'chair':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.chair.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'table_end_left':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.table_end_left.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'table_end_right':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.table_end_right.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'table_1':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.table_1.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'table_2':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.table_2.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'table_3':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.table_3.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        //newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;

                    case 'plant':
                        var newObject = createViewable(
                            object.id,
                            loader.resources.plant.texture,
                            game.getGrid(),
                            {x: object.x, y: object.y}
                        );
                        newObject.init();
                        newObject.isSolid = true;

                        addLevelObject(newObject);
                        break;
                }

            }
        );
                
        childrenToAdd.map(function(child) {
            gameScene.container.addChild(child);
        });

 
        var countdown = createCountDown(0, level.timer, game, game.stopCountDown);
        countdown.start();



        return {levelObjects: levelObjects, player: player, workmates: workmates, boss: boss, score: score, countdown: countdown};
    }

});
