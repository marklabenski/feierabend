/**
 * Created by marklabenski on 31.10.15.
 */
require(['feierabend/game.js', 'feierabend/movable.js', 'feierabend/controllable.js'], function() {
    window.createPlayer = function createPlayer() {
        var playerInstance;
        var sprite;

        //init with texture
        if(arguments[0]) {
            sprite = new PIXI.Sprite(arguments[0]);
            sprite.width = window.game.getGridSize();
            sprite.height = window.game.getGridSize();

            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;

            sprite.position.x = 0+ sprite.width/2;
            sprite.position.y = 0+ sprite.width/2;
        }

        var Player = {
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

        $.extend(Player, movable, controllable);

        return playerInstance || (playerInstance = Object.create(Player));
    };

});
