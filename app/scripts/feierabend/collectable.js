define(['scripts/feierabend/viewable.js'], function (createViewable) {
    return function createCollectable(id, texture, game, collide, gridPos) {
        var sprite;
        //init with texture

        var Collectable = {
            id: id,
            collideFn: function collideFn(collideObj) {
                collide(collideObj, this);
            },
        };

        var collectableInstance = Object.create(Collectable);
        collectableInstance = $.extend({}, collectableInstance, createViewable(texture, game, gridPos));
        collectableInstance.init();
        return collectableInstance;
    };

});
