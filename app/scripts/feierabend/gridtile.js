define([],function() {
    return function createGridTile(_x, _y) {

        var posX = _x;
        var posY = _y;
        var north = null;
        var south = null;
        var west = null;
        var east = null;

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
                return north;
            },
            getSouth: function getSouth(tile) {
                return south;
            },
            getWest: function getWest(tile) {
                return west;
            },
            getEast: function getEast(tile) {
                return east;
            },
            getPos: function () {
                return {x: posX, y: posY}
            }
        };
        return Object.create(gridTile);
    };
});


