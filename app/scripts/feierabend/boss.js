define(['scripts/feierabend/viewable.js',
    'scripts/feierabend/movable.js'], function (createViewable, createMovable) {
    return function createBoss(texture, game, enterGrid) {
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
            move: function move() {
                if(hasMovedRecently) {
                    this.setRandomDirection();
                    hasMovedRecently = false;
                } else {
                    this.moveSprite(this.getSprite());
                    hasMovedRecently = true;
                }

            },
        };

        var viewable = createViewable('boss', texture, game.getGrid(), enterGrid);
        viewable.init();

        var bossInstance = Object.create(Boss);
        bossInstance = $.extend({}, viewable, bossInstance, createMovable(game));
        return bossInstance;
    };

});
