/**
 * Created by marklabenski on 26.11.15.
 */
define([], function () {
    return function createViewable(texture, game, gridPos) {
        var sprite;
        //init with texture

        var Viewable = {
            enteredGridTile: null,
            init: function init() {
                if (texture) {
                    sprite = new PIXI.Sprite(texture);

                    sprite.width = game.getGridSize();
                    sprite.height = game.getGridSize();

                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;

                    this.enteredGridTile = game.getGrid().getTileAt(gridPos.x, gridPos.y);
                    this.enteredGridTile.enter(this);

                    sprite.position.x = this.enteredGridTile.getPos().x + sprite.width / 2;
                    sprite.position.y = this.enteredGridTile.getPos().y + sprite.height / 2;
                }
            },
            getGridTile: function getGridTile() {
                return this.enteredGridTile;
            },
            getSprite: function getSprite() {
                return sprite;
            }
        };

        var viewableInstance = Object.create(Viewable);
        return viewableInstance;
    };

});
