define(['scripts/feierabend/viewable.js'], function (createViewable) {
    return function createCollectable(id, texture, game, collide, gridPos) {
        var sprite;
        //init with texture

        var Collectable = {
            collected: false,
            collect: function collect() {
                this.getGridTile().leave(this);
                this.collected = true;
            },
            collideFn: function collideFn(collideObj) {
                collide(collideObj, this);
                this.collect();
            },
        };

        var collectableInstance = Object.create(Collectable);
        collectableInstance = $.extend({}, collectableInstance, createViewable(id, texture, game.getGrid(), gridPos));
        collectableInstance.init();
        return collectableInstance;
    };

});
