define(['scripts/feierabend/viewable.js', 'scripts/feierabend/collectable.js', 'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(queuePos, texture, game, enterGrid) {
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
            queuePosition: queuePos,
            move: function move() {
                if(followingPlayer) {
                    var followMovement1 = followingPlayer.getPathMovement(this.queuePosition-1);
                    var followMovement2 = followingPlayer.getPathMovement(this.queuePosition);
                    this.setDirection(followMovement1.direction);
                    this.moveSpriteTo(this.getSprite(), followMovement2.tile);
                }
            },
        };

        var workmateInstance = Object.create(Workmate);
        workmateInstance = $.extend({}, createCollectable('workmate'+queuePos, texture, game, collideFn, enterGrid), workmateInstance, createMovable(game));
        return workmateInstance;
    };

});
