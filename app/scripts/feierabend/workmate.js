define(['scripts/feierabend/viewable.js',
        'scripts/feierabend/collectable.js',
        'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(id, texture, game, enterGrid) {
        var followingPlayer = null;
        var queuePosition = 0;


        var Workmate = {
            changeQueuePos: function changeQueuePos(change) {
                queuePosition = queuePosition + change;
                return queuePosition;
            },
            stopFollowing: function stopFollowing() {
                followingPlayer = null;
            },
            follow: function follow(player) {

                player.follow(this);
                queuePosition = player.workmatesFollowing.length-1;
                followingPlayer = player;
            },
            move: function move() {
                if(followingPlayer) {
                    var queuePosDirection = followingPlayer.getPathMovement(queuePosition);
                    var queuePosMovement = followingPlayer.getPathMovement(queuePosition+1);
                    this.setRotationByDirection(queuePosDirection.direction);
                    this.moveSpriteTo(this.getSprite(), queuePosMovement.tile);
                }
            },
        };

        var workmateInstance = Object.create(Workmate);

        var collideFn = function collideFn(collideObj, thisWorkmate) {

            if (collideObj.id === 'player') {
                if(followingPlayer) {
                    collideObj.unfollow(thisWorkmate);
                    followingPlayer = null;
                } else {
                    workmateInstance.follow(collideObj);
                }
            }
        };

        workmateInstance = $.extend({}, createCollectable(id, texture, game, collideFn, enterGrid), workmateInstance, createMovable(game));
        return workmateInstance;
    };

});
