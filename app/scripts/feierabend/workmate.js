define(['scripts/feierabend/viewable.js',
        'scripts/feierabend/collectable.js',
        'scripts/feierabend/movable.js'], function (createViewable, createCollectable, createMovable) {
    return function createWorkmate(id, texture, game, enterGrid) {
        var followingPlayer = null;
        var queuePosition = 0;
        var tilingSprite = new PIXI.extras.TilingSprite(texture, 50, 50);
        var animationStep = 0;

        var Workmate = {
            changeQueuePos: function changeQueuePos(change) {
                queuePosition = queuePosition + change;
                return queuePosition;
            },
            stopFollowing: function stopFollowing() {
                followingPlayer = null;
                tilingSprite.tilePosition.y = 50;
            },
            follow: function follow(player) {

                player.follow(this);
                queuePosition = player.workmatesFollowing.length-1;
                followingPlayer = player;
            },
            animate: function animate(animation) {
                var animationFrame = animationStep++ % 3;

                tilingSprite.tilePosition.x = animationFrame * 50;

                if(animation === 'walking') {
                    tilingSprite.tilePosition.y = 50;
                } else {
                    tilingSprite.tilePosition.y = 0;
                }

            },
            move: function move() {
                if(followingPlayer) {
                    this.animate('walkingPolonaise');
                    var queuePosDirection = followingPlayer.getPathMovement(queuePosition);
                    var queuePosMovement = followingPlayer.getPathMovement(queuePosition+1);
                    this.setRotationByDirection(queuePosDirection.direction);
                    this.moveSpriteTo(this.getSprite(), queuePosMovement.tile);
                }
                //this.animate('walking');
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

        //standing position


        tilingSprite.tileScale.x = 0.78;
        tilingSprite.tileScale.y = 0.78;
        tilingSprite.tilePosition.x = 100;
        tilingSprite.tilePosition.y = 50;

        workmateInstance.changeSprite(tilingSprite);

        return workmateInstance;
    };

});
