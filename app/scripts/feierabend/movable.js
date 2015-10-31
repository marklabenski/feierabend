/**
 * Created by marklabenski on 31.10.15.
 */
require([], function () {

    window.movable = (function () {
        var DIRECTION= {DOWN: 0, LEFT: 1, TOP: 2, RIGHT: 3};
        var direction= 0;
        var gridSize = window.game.getGridSize();
        var movementIsValid = function movementIsValid(movement, sprite) {
            return sprite.position.x + (movement.x * gridSize) > 0
                && sprite.position.y + (movement.y * gridSize) > 0
                && sprite.position.x + (movement.x * gridSize) < window.game.getBounds().x
                && sprite.position.y + (movement.y * gridSize) < window.game.getBounds().y
        };
        var movable = {
            changeDirection: function changeDirection(change) {
                var newDirection = direction + change;
                if (direction === DIRECTION.DOWN && change === -1) {
                    newDirection = DIRECTION.RIGHT;
                } else if (direction == DIRECTION.RIGHT && change === 1) {
                    newDirection = DIRECTION.DOWN;
                }
                direction = newDirection;
                return direction;
            },
            moveSprite: function moveSprite(sprite) {
                var movement = {x: 0, y: 0};
                if (direction === DIRECTION.DOWN) {
                    movement.y = +1;
                } else if (direction === DIRECTION.LEFT) {
                    movement.x = -1;
                } else if (direction === DIRECTION.TOP) {
                    movement.y = -1;
                } else {
                    movement.x = +1;
                }
                if (movementIsValid(movement, sprite)) {
                    sprite.position.x += movement.x * gridSize;
                    sprite.position.y += movement.y * gridSize;
                }
            },
        };
        return Object.create(movable);
    })();
});
