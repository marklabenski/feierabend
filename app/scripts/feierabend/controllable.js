define(function() {
    return {
        changeSpriteDirectionByKeyCode: function changeSpriteDirectionByKeyCode(keyCode, sprite) {


            switch (keyCode) {
                case 37: // arrow left
                    sprite.rotation = this.changeDirection(-1) * (Math.PI * 0.5);
                    break;
                case 39: // arrow right
                    // Do something for "right arrow" key press.
                    sprite.rotation = this.changeDirection(1) * (Math.PI * 0.5);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

        },
    };
});
