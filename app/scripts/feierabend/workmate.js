define(['scripts/feierabend/viewable.js',
        'scripts/feierabend/collectable.js',
        'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(id, texture, game, enterGrid) {
        var followingPlayer = null;
        var positionInQueue = 0;
        var follow = function follow(player) {
            positionInQueue = player.workmatesFollowing.length;
            player.workmatesFollowing.push(id);
            followingPlayer = player;
        };
        var collideFn = function collideFn(collideObj, thisWorkmate) {
            if (collideObj.id === 'player') {
                if(followingPlayer) {
                    //console.log('player hits ' + thisWorkmate.id);
                } else {
                    follow(collideObj);
                }
            }
        };
        var Workmate = {
            isSolid: true,
            follow: follow,
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
        workmateInstance = $.extend({}, createCollectable(id, texture, game, collideFn, enterGrid), workmateInstance, createMovable(game));
        return workmateInstance;
    };

});
