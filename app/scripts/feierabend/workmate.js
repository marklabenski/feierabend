define(['scripts/feierabend/viewable.js',
        'scripts/feierabend/collectable.js',
        'scripts/feierabend/movable.js',
       'scripts/feierabend/audio.js'], function (createViewable, createCollectable, createMovable, playAudio) {
    return function createWorkmate(id, texture, game, _gender, enterGrid) {
        var followingPlayer = null;
        var queuePosition = 0;

        var tilingSprite = new PIXI.extras.TilingSprite(texture, 50, 50);
        var animationStep = 0;

        var gender = _gender;

        var Workmate = {
            changeQueuePos: function changeQueuePos(change) {
                queuePosition = queuePosition + change;
                return queuePosition;
            },
            stopFollowing: function stopFollowing() {
                followingPlayer = null;
                tilingSprite.tilePosition.y = 50;
                this.collideFn = function() {};
                var _this = this;
                window.setTimeout(function() { game.fadeOutObject(_this); }, 500);
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

            },
        };

        var workmateInstance = Object.create(Workmate);

        var collideFn = function collideFn(collideObj, thisWorkmate) {

            if (collideObj.id === 'player') {
                if(followingPlayer) {
                    collideObj.unfollow(thisWorkmate);
                    followingPlayer = null;
                } else {
                    // any number between 1 and 3 
                    var x = Math.floor(Math.random()*3) +1;
                    
                    switch (x) {
                        case 1:  playAudio("workmate"+gender.toUpperCase()+"1");
                        break;
                        case 2:  playAudio("workmate"+gender.toUpperCase()+"2");
                        break;
                        case 3:  playAudio("workmate"+gender.toUpperCase()+"3");
                        break;
                    }
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
