define(function() {
    return {
        changeSpriteDirectionByKeyCode: function changeSpriteDirectionByKeyCode(keyCode, sprite) {
            switch (keyCode) {
                case 37: // arrow left
                    this.applyDirection(1);
                    break;
                case 38: // arrow up
                    this.applyDirection(2);
                    break;
                case 39: // arrow right
                    this.applyDirection(3);
                    break;
                case 40: // arrow down
                    this.applyDirection(0);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

        },
    };
});
