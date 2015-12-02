/**
 * Created by marklabenski on 31.10.15.
 */

define(['scripts/feierabend/gridtile.js'], function (gridTile) {
    return function createGrid(_tileSize, gridWidth, gridHeight) {
        var gridInstance;
        var tileSize = _tileSize;
        var sceneWidth = gridWidth;
        var sceneHeight = gridHeight;
        var tiles = [];

        var grid = {
            init: function init() {
                for (var x = 0; x < (sceneWidth / tileSize); x += 1) {
                    tiles.push([]);

                    for (var y = 0; y < (sceneHeight / tileSize); y += 1) {
                        var newTile = gridTile(x * tileSize, y * tileSize);
                        //cant set neighbors for first tile
                        if (x > 0) {
                            // set me to east neighbor for western tiles
                            var westernTile = tiles[x - 1][y];
                            westernTile.setEast(newTile);
                            newTile.setWest(westernTile);
                        }
                        if (y > 0) {
                            // set me to south for northern tiles
                            var northernTile = tiles[x][y - 1];
                            northernTile.setSouth(newTile);
                            newTile.setNorth(northernTile);
                        }

                        tiles[x].push(newTile);
                    }
                }
            },
            getTileByPosition: function getTileByPosition(x, y) {
                return tiles[(x /_tileSize)][(y/_tileSize)];
            },
            getTileAt: function getTileAt() {
                var x = arguments[0] || 0;
                var y = arguments[1] || 0;
                return tiles[x][y];
            },
            visualize: function visualize() {
                var string = '<div style="float:left;z-index:1000;position:absolute; left:0; right:0;">';
                for (var x = 0; x < (sceneWidth / tileSize); x += 1) {
                    string += '<div style="display:inline-block;">';

                    for (var y = 0; y < (sceneHeight / tileSize); y += 1) {
                        string += tiles[x][y].visualize();
                    }
                    string += '</div>';
                }
                string += '</div>';
                return string;
            }
        };
        gridInstance = gridInstance || Object.create(grid);
        gridInstance.init();
        return gridInstance;
    };
});
