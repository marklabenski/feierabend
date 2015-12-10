define(['scripts/feierabend/viewable.js'], function (createViewable) {
    return function createCollectable(id, texture, game, collide, gridPos) {
        var sprite;
        //init with texture

        var Collectable = {
            id: id,
            collect: function collect() {
                this.getGridTile().leave(this);
            },
            collideFn: function collideFn(collideObj) {
                collide(collideObj, this);
                this.collect();
            },
        };

        var collectableInstance = Object.create(Collectable);
        collectableInstance = $.extend({}, collectableInstance, createViewable(texture, game.getGrid(), gridPos));
        collectableInstance.init();
        return collectableInstance;
    };

});
