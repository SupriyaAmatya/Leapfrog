function SheepGame() {

    var width = 897;
    var height = 668;

    var sX = 0;
    var sY = 0;

    var sheep; //sheep instance
    var playerSheep; //player sheep instance

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

        tiles = new Tiles();
        sheep = new Sheep(canvas, ctx, 314, 70, 5);
        playerSheep = new PlayerSheep(canvas, ctx, 286, 70, 5);

        that.startGame();

    }

    this.startGame = function() {
        //main loop
        ctx.clearRect(0, 0, width, height);

        //map creation
        that.renderMap();

        sheep.init();
        playerSheep.init(that.y);

        ctx.drawImage(bushRight, 0, 0, 88, 565, width - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);

        //go buttons
        that.goBtnControl();

        requestAnimationFrame(that.startGame)
    }

    this.renderMap = function() {
        for (var col = 0; col < mapH; col++) {
            for (var row = 0; row < mapW; row++) {
                switch (gameMap[((col * mapW) + row)]) {
                    case 1:
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

                    case 4:
                        tiles.x = row * tileSize;
                        tiles.y = col * tileSize;
                        tiles.tile4();
                        tiles.draw(ctx);
                        break;
                }
            }
        }
    }

    this.goBtnControl = function() {
        var btnWidth = 76;
        var btnHeight = 76;
        var btnX = 45;
        var btnY;

        //button draw
        for (var i = 180; i <= tileSize * 6; i += 90) {
            btnY = i;
            ctx.drawImage(button, 0, 0, btnWidth, btnHeight, btnX, btnY, btnWidth, btnHeight);
        }

        //click action
        canvas.addEventListener('mousedown', function(event) {
            for (var i = 180; i <= tileSize * 6; i += 90) {
                btnY = i;
                let rect = canvas.getBoundingClientRect();
                let clickX = event.clientX - rect.left;
                let clickY = event.clientY - rect.top;
                if (clickX >= btnX && clickX <= btnX + btnWidth &&
                    clickY >= btnY && clickY <= btnY + btnHeight) {

                    playerSheep.init(btnY);
                }
            }

        });
    }
}

var game = new SheepGame();
game.init();