/**
 * Created by marklabenski on 31.10.15.
 */
var createPlayer = function createPlayer() {
    var playerInstance;
    var sprite;

    //init with texture
    if(arguments[0]) {
        sprite = new PIXI.Sprite(arguments[0]);
        sprite.scale.x = 0.5;
        sprite.scale.y = 0.5;

        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        sprite.position.x = 0+ sprite.width/2;
        sprite.position.y = 0+ sprite.width/2;
    }
    var DIRECTION =  {DOWN:0, LEFT:1, TOP:2, RIGHT:3};
    var direction = 0;
    var changeDirection = function changeDirection(change) {
        var newDirection = direction + change;
        if (direction === DIRECTION.DOWN && change === -1) {
            newDirection = DIRECTION.RIGHT;
        } else if (direction == DIRECTION.RIGHT && change === 1){
            newDirection = DIRECTION.DOWN;
        }
        direction = newDirection;
        return direction;
    };
    var movementIsValid = function movementIsValid(movement) {
        return sprite.position.x + movement.x > 0
            && sprite.position.y + movement.y > 0
            && sprite.position.x + movement.x < window.game.getBounds().x
            && sprite.position.y + movement.y < window.game.getBounds().y
    };
    var Player = {
        getSprite: function getSprite() {
            return sprite;
        },
        move: function move() {
            var movement = {x:0, y:0};
            if(direction === DIRECTION.DOWN) {
                movement.y += sprite.width;
            } else if (direction === DIRECTION.LEFT) {
                movement.x -= sprite.width;
            } else if (direction === DIRECTION.TOP) {
                movement.y -= sprite.width;
            } else {
                movement.x += sprite.width;
            }
            if(movementIsValid(movement)) {
                sprite.position.x += movement.x;
                sprite.position.y += movement.y;
            }
        },
        changeDirectionByKeyCode: function changeDirectionByKeyCode(keyCode) {
            switch (keyCode) {
                case 37: // arrow left
                    sprite.rotation = changeDirection(-1) * (Math.PI * 0.5);
                    break;
                case 39: // arrow right
                    // Do something for "right arrow" key press.
                    sprite.rotation = changeDirection(1) * (Math.PI * 0.5);
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }
        },
    };

    return playerInstance || (playerInstance = Object.create(Player));
};
