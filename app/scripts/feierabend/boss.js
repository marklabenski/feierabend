define(['scripts/feierabend/viewable.js',
    'scripts/feierabend/movable.js'], function (createViewable, createMovable) {
    return function createBoss(texture, game, enterGrid) {
        var tilingSprite = new PIXI.extras.TilingSprite(texture, 50, 50);
        var animationStep = 0;
        var collideFn = function collideFn(collideObj, thisObj) {
            /*if (collideObj.id === 'player') {
                if(followingPlayer) {
                    //console.log('player hits ' + thisWorkmate.id);
                } else {
                    follow(collideObj);
                }
            }*/
        };
        var hasMovedRecently = false;
        var Boss = {
            isSolid: true,
           /* changeDirection: function changeDirection() {
                this.setRandomDirection();
            },*/
            animate: function animate() {
                var animationFrame = animationStep++ % 3;

                tilingSprite.tilePosition.x = animationFrame * 50;
            },
            move: function move() {
                if(hasMovedRecently) {
                    this.setRandomDirection();
                    hasMovedRecently = false;
                } else {
                    this.moveSprite(this.getSprite());
                    hasMovedRecently = true;
                    this.animate();
                }

            },
        };

        var viewable = createViewable('boss', texture, game.getGrid(), enterGrid);
        viewable.init();

        var bossInstance = Object.create(Boss);
        bossInstance = $.extend({}, viewable, bossInstance, createMovable(game));


        tilingSprite.tileScale.x = 0.78;
        tilingSprite.tileScale.y = 0.78;
        tilingSprite.tilePosition.x = 100;
        tilingSprite.tilePosition.y = 0;

        bossInstance.changeSprite(tilingSprite);

        return bossInstance;
    };

});
