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
    return function createLevel(level, loader, game, gameScene, renderer) {
        var childrenToAdd = [];
        var workmates = [];
        var player;
        var boss;
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

                                    playAudio("workOnPaper");
                                    setTimeout(function () {

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

                                    playAudio("workOnNotebook");
                                    setTimeout(function () {

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
                        
                    case 'workmateM':
                        var newWorkmate = createWorkmate(object.id, loader.resources.workmate.texture, game, {
                            x: object.x,
                            y: object.y
                        });
                        if(followPlayer.indexOf(object.id) != -1) {
                            var min = 1;
                            var max = 3;
                            var x = (Math.random() * (max - min)) + min;
                            switch (x) {
                            case '1':  playAudio("workmateM1");
                            break;
                            case '2':  playAudio("workmateM2");
                            break;
                            case '3':  playAudio("workmateM3");
                            break;
                            newWorkmate.follow(player);
                        }
                        workmates.push(newWorkmate);
                        addLevelObject(newWorkmate);
                        break;
                            
                        case 'workmateW':
                        var newWorkmate = createWorkmate(object.id, loader.resources.workmate.texture, game, {
                            x: object.x,
                            y: object.y
                        });
                        if(followPlayer.indexOf(object.id) != -1) {
                            var min = 1;
                            var max = 3;
                            var x = (Math.random() * (max - min)) + min;
                            switch (x) {
                            case '1':  playAudio("workmateW1");
                            break;
                            case '2':  playAudio("workmateW2");
                            break;
                            case '3':  playAudio("workmateW3");
                            break;
                            newWorkmate.follow(player);
                        }
                        workmates.push(newWorkmate);
                        addLevelObject(newWorkmate);
                        break;
                            
                            
                }

            }
        );
                
        childrenToAdd.map(function(child) {
            gameScene.container.addChild(child);
        });



        return {levelObjects: levelObjects, player: player, workmates: workmates, boss: boss};
    }

});
