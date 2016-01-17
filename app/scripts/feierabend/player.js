/**
 * Created by marklabenski on 31.10.15.
 */
define(['scripts/feierabend/movable.js',
    'scripts/feierabend/controllable.js',
    'scripts/feierabend/viewable.js'], function (movable, controllable, createViewable) {
    return function createPlayer(texture, game, pos) {
        var playerInstance;
        var tilingSprite = new PIXI.extras.TilingSprite(texture, 50, 50);
        var animationStep = 0;


        //init with texture

        var Player = {
            speed: 500,
            workmatesFollowing: [],
            enteredGridTile: [],
            move: function () {
                this.moveSprite(this.getSprite());
                this.animate();
            },
            changeDirectionByKeyCode: function (keyCode) {
                this.changeSpriteDirectionByKeyCode(keyCode, this.getSprite());
            },
            animate: function animate() {
                var animationFrame = animationStep++ % 3;

                tilingSprite.tilePosition.x = animationFrame * 50;
            },
            unfollow: function (workmate) {
                var workmateIndex = this.workmatesFollowing.indexOf(workmate);
                //this.workmatesFollowing.splice(index, 1);
                var workmates = this.workmatesFollowing;
                workmates.map(function (workmate, index) {
                    if(index >= workmateIndex) {
                        workmate.stopFollowing();
                    }
                });
                workmates.splice(workmateIndex, workmates.length);
            },
            loseLastWorkmate: function () {
                this.unfollow(this.workmatesFollowing[this.workmatesFollowing.length-1]);
            },
            follow: function (workmate) {
                this.workmatesFollowing.push(workmate);
            },
        };
        var viewable = createViewable('player', texture, game.getGrid(), {x: pos.x, y: pos.y});
        viewable.init();

        var composedPlayer = $.extend({}, Object.create(Player), movable(game), viewable, controllable);


        tilingSprite.tileScale.x = 0.78;
        tilingSprite.tileScale.y = 0.78;
        tilingSprite.tilePosition.x = 100;
        tilingSprite.tilePosition.y = 0;

        composedPlayer.changeSprite(tilingSprite);

        return composedPlayer;
    };

});
