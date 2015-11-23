/**
 * Created by marklabenski on 31.10.15.
 */
define([], function () {

    return function (game) {
        var DIRECTION= {DOWN: 0, LEFT: 1, TOP: 2, RIGHT: 3};
        var direction= 0;
        var onGridTile = null;

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
            setOnGrid: function setOnGrid(tile) {
                onGridTile = tile;
            },
            moveSprite: function moveSprite(sprite) {
                var moveToTile;

                if (direction === DIRECTION.DOWN) {
                    moveToTile = onGridTile.getSouth();
                } else if (direction === DIRECTION.LEFT) {
                    moveToTile = onGridTile.getWest();
                } else if (direction === DIRECTION.TOP) {
                    moveToTile = onGridTile.getNorth();
                } else {
                    moveToTile = onGridTile.getEast();
                }
                //moveToTile
                if(moveToTile !== null) {
                    moveToTile.enter(this);

                    var moveX = moveToTile.getPos().x;
                    var moveY = moveToTile.getPos().y;

                    sprite.position.x = moveX + (sprite.width/2);
                    sprite.position.y = moveY + (sprite.height/2);
                    onGridTile = moveToTile;
                    onGridTile.leave();
                }
            }
        };
        return Object.create(movable);
    };
});
