define([], function () {
    return function createGridTile(_x, _y) {

        var posX = _x;
        var posY = _y;
        var north = null;
        var south = null;
        var west = null;
        var east = null;
        var objectsOnTile = [];

        var gridTile = {
            setNorth: function setNorth(tile) {
                north = tile;
            },
            setSouth: function setSouth(tile) {
                south = tile;
            },
            setWest: function setWest(tile) {
                west = tile;
            },
            setEast: function setEast(tile) {
                east = tile;
            },
            getNorth: function getNorth(tile) {
                if (north !== null)
                    return north.collide();
                else
                    return null
            },
            getSouth: function getSouth(tile) {
                if (south !== null)
                    return south.collide();
                else
                    return null
            },
            getWest: function getWest(tile) {
                if (west !== null)
                    return west.collide();
                else
                    return null
            },
            getEast: function getEast(tile) {
                if (east !== null)
                    return east.collide();
                else
                    return null
            },
            collide: function collide() {
                if (objectsOnTile.length === 0) {
                    return this;
                }
                else {
                    var solid = false;
                    objectsOnTile.map(function (object) {
                        if (object.hasOwnProperty('isSolid'))
                            solid = true;
                    });
                    if (solid) return null;
                    else return this;
                }
            },
            enter: function (object) {
                objectsOnTile.map(function (objectOnTile) {
                    if (objectOnTile.collideFn !== undefined)
                        objectOnTile.collideFn(object);
                });

                objectsOnTile.push(object);
            },
            leave: function (object) {
                if (objectsOnTile.indexOf(object) != -1) {
                    objectsOnTile.slice(objectsOnTile.indexOf(object))
                }
            },
            getPos: function () {
                return {x: posX, y: posY}
            }
        };
        return Object.create(gridTile);
    };
});


