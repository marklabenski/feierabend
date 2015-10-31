/**
 * Created by marklabenski on 31.10.15.
 */

require('feierabend/player.js', function () {
    window.game = {};

    var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
    document.body.appendChild(renderer.view);

    var loader = PIXI.loader;


    window.game.getBounds = function getBounds() {
        return {x: 800, y: 600};
    };

    loader.add('player', 'img/player.png');

    loader.once('complete', setup);

    loader.load();


    function setup() {
        // create the root of the scene graph
        var stage = new PIXI.Container();

        // create some textures from an image path
        var playerTexture = PIXI.Texture.fromImage('img/player.png');

        var player = createPlayer(playerTexture);

        stage.addChild(player.getSprite());

        renderer.render(stage);
        animate();
        function animate() {
            requestAnimationFrame(animate);

            // render the container
            renderer.render(stage);
        }

        window.setInterval(function () {
            player.move();

        }, 1000);
        window.addEventListener('keydown', function (event) {

            player.changeDirectionByKeyCode(event.keyCode);
        });


    }
});
