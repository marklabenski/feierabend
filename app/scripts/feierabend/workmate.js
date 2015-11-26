define(['scripts/feierabend/viewable.js', 'scripts/feierabend/collectable.js', 'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(id, texture, game) {
        var followingPlayer = null;
        var collideFn = function collideFn(collideObj) {
            if (collideObj.id === 'player') {
                if(followingPlayer) {
                    //game.pause();
                    console.log('player hits ' + this.id);
                } else {
                    followingPlayer = collideObj;
                }
            }
        };
        var Workmate = {
            move: function move() {
                if(followingPlayer) {
                    var followMovement1 = followingPlayer.getPathMovement(0);
                    var followMovement2 = followingPlayer.getPathMovement(1);
                    this.setDirection(followMovement1.direction);
                    this.moveSpriteTo(this.getSprite(), followMovement2.tile);
                }
            },
        };

        var workmateInstance = Object.create(Workmate);
        workmateInstance = $.extend({}, createCollectable(id, texture, game, collideFn, {x:6,y:3}), workmateInstance, createMovable(game));
        workmateInstance.init();
        return workmateInstance;
    };

});
