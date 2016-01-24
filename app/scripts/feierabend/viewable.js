/**
 * Created by marklabenski on 26.11.15.
 */
define([], function () {
    return function createViewable(id, texture, grid, gridPos) {
        var sprite;
        var animation;
        //init with texture

        var Viewable = {
            id: id,
            enteredGridTile: null,
            gridPos: gridPos,
            visible: true,
            hide: function hide() {
                this.visible = false;
                sprite.visible = false;
            },
            changeSpriteTint: function changeSpriteTint(tint) {
                sprite.tint = tint; // 0x8fa0a1
            },
            changeSprite: function changeSprite(newSprite) {
                sprite = newSprite;

                sprite.width = grid.getTileSize();
                sprite.height = grid.getTileSize();

                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;

                this.enteredGridTile = grid.getTileAt(gridPos.x, gridPos.y);
                this.enteredGridTile.enter(this);

                sprite.position.x = this.enteredGridTile.getPos().x + sprite.width / 2;
                sprite.position.y = this.enteredGridTile.getPos().y + sprite.height / 2;
                return sprite;
            },
            init: function init() {
                if (texture) {
                    sprite = new PIXI.Sprite(texture);

                    this.changeSprite(sprite);
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
