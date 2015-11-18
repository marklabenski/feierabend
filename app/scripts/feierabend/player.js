/**
 * Created by marklabenski on 31.10.15.
 */
define(['scripts/feierabend/movable.js', 'scripts/feierabend/controllable.js'], function(movable, controllable) {
    return function createPlayer() {
        var playerInstance;
        var sprite;
        //init with texture
        var texture = arguments[0];
        var game = arguments[1];

        var Player = {
            enteredGridTile: null,
            init: function init() {
                if(texture) {
                    sprite = new PIXI.Sprite(texture);

                    sprite.width = game.getGridSize();
                    sprite.height = game.getGridSize();

                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;

                    this.enteredGridTile = game.getGrid().getTileAt();

                    sprite.position.x = this.enteredGridTile.getPos().x + sprite.width/2;
                    sprite.position.y = this.enteredGridTile.getPos().y + sprite.height/2;

                    this.setOnGrid(this.enteredGridTile);
                }
            },
            getSprite: function getSprite() {
                return sprite;
            },
            move: function() {

                this.moveSprite(sprite);
            },
            changeDirectionByKeyCode: function(keyCode) {
                this.changeSpriteDirectionByKeyCode(keyCode, sprite);
            }
        };

        var composedPlayer = $.extend({}, Player, movable(game), controllable);
        var playerInstance = Object.create(composedPlayer);
        playerInstance.init();
        return playerInstance;
    };

});
