define(function() {
    return {
        changeSpriteDirectionByKeyCode: function changeSpriteDirectionByKeyCode(keyCode, sprite) {


            switch (keyCode) {
                case 37: // arrow left
                    this.changeDirection(-1);
                    break;
                case 39: // arrow right
                    // Do something for "right arrow" key press.
                    this.changeDirection(1);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

        },
    };
});
