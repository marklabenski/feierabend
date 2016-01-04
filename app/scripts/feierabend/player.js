/**
 * Created by marklabenski on 31.10.15.
 */
define(['scripts/feierabend/movable.js',
    'scripts/feierabend/controllable.js',
    'scripts/feierabend/viewable.js'], function (movable, controllable, createViewable) {
    return function createPlayer(texture, game, pos) {
        var playerInstance;


        //init with texture

        var Player = {
            speed: 500,
            workmatesFollowing: [],
            enteredGridTile: [],
            move: function () {
                this.moveSprite(this.getSprite());
            },
            changeDirectionByKeyCode: function (keyCode) {
                this.changeSpriteDirectionByKeyCode(keyCode, this.getSprite());
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
            follow: function (workmate) {
                this.workmatesFollowing.push(workmate);
            },
        };
        var viewable = createViewable('player', texture, game.getGrid(), {x: pos.x, y: pos.y});
        viewable.init();

        var composedPlayer = $.extend({}, Object.create(Player), movable(game), viewable, controllable);

        return composedPlayer;
    };

});
