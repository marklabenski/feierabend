require('feierabend/player.js', function () {
    window.createScene = function createScene(_sceneName) {
        var sceneName = _sceneName;
        var sceneContainer;
        var player;

        var scene = {
            init: function() {
                this.container = new PIXI.Container();
            },
            container: null,
        };
        var sceneInstance = Object.create(scene);
        sceneInstance.init();
        return sceneInstance;
    };
});
