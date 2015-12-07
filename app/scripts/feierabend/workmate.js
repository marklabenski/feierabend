define(['scripts/feierabend/viewable.js', 'scripts/feierabend/collectable.js', 'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(number, texture, game, enterGrid) {
        var followingPlayer = null;
        var positionInQueue = 0;
        var followPlayer = function followPlayer(player) {
            positionInQueue = player.workmatesFollowing.length;
            player.workmatesFollowing.push('workmate' + number);
            followingPlayer = player;
        };
        var collideFn = function collideFn(collideObj, thisWorkmate) {
            if (collideObj.id === 'player') {
                if(followingPlayer) {
                    //console.log('player hits ' + thisWorkmate.id);
                } else {
                    followPlayer(collideObj);
                }
            }
        };
        var Workmate = {
            isSolid: true,
            move: function move() {
                if(followingPlayer) {
                    var queuePosDirection = followingPlayer.getPathMovement(positionInQueue);
                    var queuePosMovement = followingPlayer.getPathMovement(positionInQueue+1);
                    this.setRotationByDirection(queuePosDirection.direction);
                    this.moveSpriteTo(this.getSprite(), queuePosMovement.tile);
                }
            },
        };

        var workmateInstance = Object.create(Workmate);
        workmateInstance = $.extend({}, createCollectable('workmate' + number, texture, game, collideFn, enterGrid), workmateInstance, createMovable(game));
        return workmateInstance;
    };

});
