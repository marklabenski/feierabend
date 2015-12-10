/**
 * Created by marklabenski on 31.10.15.
 */
define(['scripts/feierabend/movable.js',
        'scripts/feierabend/controllable.js',
        'scripts/feierabend/viewable.js'], function(movable, controllable, createViewable) {
    return function createPlayer(texture, game) {
        var playerInstance;


        //init with texture

        var Player = {
            id: 'player',
            speed: 500,
            workmatesFollowing: [],
            enteredGridTile: [],
            move: function() {
                this.moveSprite(this.getSprite());
            },
            changeDirectionByKeyCode: function(keyCode) {
                this.changeSpriteDirectionByKeyCode(keyCode, this.getSprite());
            }
        };
        var viewable = createViewable(texture, game.getGrid(), {x: 0, y:0});
        viewable.init();
        var composedPlayer = $.extend({}, Player, movable(game), viewable, controllable);
        var playerInstance = Object.create(composedPlayer);

        return playerInstance;
    };

});
