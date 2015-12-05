/**
 * Created by m-oez on 02.12.2015.
 */

define(['scripts/feierabend/player.js',
    'scripts/feierabend/collectable.js',
    'scripts/feierabend/workmate.js',
    'scripts/feierabend/viewable.js',
    'scripts/feierabend/music.js',
], function (createPlayer, createCollectable, createWorkmate, createViewable, playMusic) {


    var levels = [
        [
            {type: 'background', img: '././img/bg.jpg'},
            {type: 'player', id: 'player', x: 0, y: 0},
            {type: 'coffee', id: 'coffee1', x: 3, y: 3},
            {type: 'coffee', id: 'coffee2', x: 3, y: 8},
            {type: 'coffee', id: 'coffee2', x: 3, y: 9},
            {type: 'workmate', id: '1', x: 5, y: 8},
            {type: 'workmate', id: '2', x: 8, y: 8},
        ]
    ];
	
	var workmates = [];
	
    return function createLevel(currentLevel, loader, game, gameScene, renderer)  {

        levels[currentLevel].map(
            function (object) {

                switch (object.type) {
                    case 'background':
                        var background = PIXI.Sprite.fromImage(object.img);
                        background.width = renderer.width;
                        background.height = renderer.height;
                        gameScene.container.addChild(background);
                        break;
                    case 'player':
                        player = createPlayer(loader.resources.player.texture, game);
                        gameScene.container.addChild(player.getSprite());
                        break;
                    case 'coffee':
                        var newObject = createCollectable(object.id, loader.resources.coffee.texture, game,
                            function collideFn(collideObj, eventObj) {
                                if (collideObj.id === 'player') {
                                    collideObj.speed = 200;
                                    var bgMusic = playMusic('background-music-fast');
                                    setTimeout(function () {
                                        collideObj.speed = 500;
                                        var bgMusic = playMusic('background-music');
                                        //hello michael put your awesome music code here: !
                                        //hallo michael putze dein musicalischen kot hier: !

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

        return [player, workmates];

    }

});