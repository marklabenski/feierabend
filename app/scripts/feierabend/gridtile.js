define([],function() {
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
                return north.collide();
            },
            getSouth: function getSouth(tile) {
                return south.collide();
            },
            getWest: function getWest(tile) {
                return west.collide();
            },
            getEast: function getEast(tile) {
                return east.collide();
            },
            collide: function collide() {
                if(objectsOnTile.length === 0) {
                    return this;
                }
                else
                    return null;
            },
            enter: function(object) {
                objectsOnTile.push(object);
            },
            leave: function(object) {
                if(objectsOnTile.indexOf(object) != -1) {
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


