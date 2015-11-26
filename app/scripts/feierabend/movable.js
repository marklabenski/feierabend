/**
 * Created by marklabenski on 31.10.15.
 */
define([], function () {

    return function (game) {
        var DIRECTION= {DOWN: 0, LEFT: 1, TOP: 2, RIGHT: 3};
        var direction= 0;
        var onGridTile = null;
        var path = [];

        var movable = {
            changeDirection: function changeDirection(change) {
                var newDirection = direction + change;
                if (direction === DIRECTION.DOWN && change === -1) {
                    newDirection = DIRECTION.RIGHT;
                } else if (direction == DIRECTION.RIGHT && change === 1) {
                    newDirection = DIRECTION.DOWN;
                }
                direction = newDirection;
                this.setDirection(direction);
                return direction;
            },
            setDirection: function setDirection(dir) {
                this.getSprite().rotation = dir * (Math.PI * 0.5);
            },
            setOnGrid: function setOnGrid(tile) {
                onGridTile = tile;
                path.push({'tile': tile, 'direction':direction});
            },
            getPathMovement: function getTileOnPath(offset) {
                if(offset) {
                    return path[path.length - 1 - offset];
                } else {
                    return path[path.length - 1];
                }
            },
            moveSpriteTo: function moveSpriteTo(sprite, moveToTile) {
                if(onGridTile === null)
                    onGridTile = this.enteredGridTile;

                onGridTile.leave(this);
                moveToTile.enter(this);

                var moveX = moveToTile.getPos().x;
                var moveY = moveToTile.getPos().y;

                sprite.position.x = moveX + (sprite.width/2);
                sprite.position.y = moveY + (sprite.height/2);
                onGridTile = moveToTile;


                path.push({'tile': onGridTile, 'direction':direction});
            },
            moveSprite: function moveSprite(sprite) {
                var moveToTile;

                if(onGridTile === null)
                    onGridTile = this.enteredGridTile;

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
                    this.moveSpriteTo(sprite, moveToTile);
                }
            }
        };
        return Object.create(movable);
    };
});
