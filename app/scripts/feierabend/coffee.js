define([], function () {
    return function createCoffee(texture, game) {
        var sprite;
        //init with texture

        var Coffee = {
            id: 'coffee',
            enteredGridTile: null,
            init: function init() {
                if (texture) {
                    sprite = new PIXI.Sprite(texture);

                    sprite.width = game.getGridSize();
                    sprite.height = game.getGridSize();

                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;

                    this.enteredGridTile = game.getGrid().getTileAt(3, 3);
                    this.enteredGridTile.enter(this);

                    sprite.position.x = this.enteredGridTile.getPos().x + sprite.width / 2;
                    sprite.position.y = this.enteredGridTile.getPos().y + sprite.height / 2;
                }
            },
            collideFn: function collideFn(collideObj) {
                if (collideObj.id === 'player') {
                    collideObj.speed = 200;
                    setTimeout(function () {
                        collideObj.speed = 500
                    }, 2000);
                    sprite.visible = false;
                }

            },
            getSprite: function getSprite() {
                return sprite;
            }
        };

        var coffeeInstance = Object.create(Coffee);
        coffeeInstance.init();
        return coffeeInstance;
    };

});
