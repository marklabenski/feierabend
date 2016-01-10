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
], function (createPlayer, createCollectable, createBoss, createWorkmate, createViewable, playMusic, playAudio) {
    return function createLevel(level, loader, game, gameScene, renderer, score) {
        var childrenToAdd = [];
        var workmates = [];
        var player = null;
        var boss = null;
        var levelObjects = [];
        var followPlayer = [];
        var hiddenObjects = [];

        if(game.hasBeenSaved) {
            level.map(function (object) {
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
        level.map(
            function (object) {
                switch (object.type) {
                    case 'background':
                        //var background = createViewable(object.id, loader.resources.background.texture, game.getGrid(), {x: object.x, y: object.y});
                        //PIXI.Sprite.fromImage();
                        /* background.width = renderer.width;
                        background.height = renderer.height;*/

                        //addLevelObject(background);

                        break;
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
                                    eventObj.hide();

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
                                    eventObj.hide();
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
                                    eventObj.hide();
                                }
                            }, {x: object.x, y: object.y});

                        addLevelObject(newObject);
                        break;
                    case 'door':
                        var newObject = createCollectable(object.id, loader.resources.door.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    // play here a win audio
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
                        var texture = loader.resources.workmate.texture;

                        var newWorkmate = createWorkmate(object.id, texture, game, {
                            x: object.x,
                            y: object.y
                        });


                        /*tilingSprite.tilePosition.x += 1;
                        tilingSprite.tilePosition.y += 1;*/

                        if(followPlayer.indexOf(object.id) != -1) {
                            newWorkmate.follow(player);
                        }
                        workmates.push(newWorkmate);
                        addLevelObject(newWorkmate);
                }

            }
        );

        childrenToAdd.map(function(child) {
            gameScene.container.addChild(child);
        });





        return {levelObjects: levelObjects, player: player, workmates: workmates, boss: boss, score: score};
    }

});
