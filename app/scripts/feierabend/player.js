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

        var composedPlayer = $.extend({}, Player, createViewable(texture, game, {x: 0, y:0}), movable(game), controllable);
        var playerInstance = Object.create(composedPlayer);
        playerInstance.init();
        return playerInstance;
    };

});
