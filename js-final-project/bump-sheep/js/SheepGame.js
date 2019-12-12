function SheepGame() {

    var width = 897;
    var height = 668;

    var laneWidth = 897;
    var laneHeight = 450;

    var sX = 0;
    var sY = 0;

    var sheep; //sheep instance
    var tiles; // tile map
    var tileSize = 90;

    var that = this;

    this.x = 0;
    this.y = 170;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;

        sheep = new Sheep(canvas, ctx, 314, 70, 5);
        tiles = new Tiles();

        that.startGame();

    }

    this.startGame = function() {
        //main loop
        ctx.clearRect(0, 0, width, height);
        that.renderMap();
        sheep.init();

        ctx.drawImage(bushRight, 0, 0, 88, 565, laneWidth - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);
        requestAnimationFrame(that.startGame)
    }

    this.renderMap = function() {
        for (var col = 0; col < mapH; col++) {
            for (var row = 0; row < mapW; row++) {
                switch (gameMap[((col * mapW) + row)]) {
                    case 1:
                        console.log(tiles);
                        tiles.x = row * tileSize;
                        tiles.y = col * tileSize;
                        tiles.tile1();
                        tiles.draw(ctx);
                        break;

                    case 2:
                        tiles.x = row * tileSize;
                        tiles.y = col * tileSize;
                        tiles.tile2();
                        tiles.draw(ctx);
                        break;

                    case 3:
                        tiles.x = row * tileSize;
                        tiles.y = col * tileSize;
                        tiles.tile3();
                        tiles.draw(ctx);
                        break;
                }
            }
        }
    }

}

var game = new SheepGame();
game.init();