function SheepGame() {

    var width = 897;
    var height = 668;

    var sX = 0;
    var sY = 0;
    this.x = 0;
    this.y = 170;

    var sheep; //sheep instance
    var playerSheep; //player sheep instance
    var sheeps = [];

    var tiles; // tile map
    var tileSize = 90;

    var temp;
    var move;

    var that = this;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;

        tiles = new Tiles();


        playerSheep = new PlayerSheep(canvas, ctx, 286, 70, 5);


        that.startGame();

    }

    this.generateSheep = function() {
        temp = Math.floor(Math.random() * 10 + 1);

        if (temp >= 1 && temp <= 5) {
            sheep = new Sheep(canvas, ctx, 200, 50, 5);
        }
        if (temp >= 6 && temp <= 8) {
            sheep = new Sheep(canvas, ctx, 320, 60, 10);
        }
        if (temp == 9) {
            sheep = new Sheep(canvas, ctx, 360, 70, 15);
        }
        if (temp == 10) {
            sheep = new Sheep(canvas, ctx, 400, 80, 20);
        }

    }

    this.startGame = function() {
        //main loop
        ctx.clearRect(0, 0, width, height);

        //map creation
        that.renderMap();
        that.generateSheep();
        that.updateSheep();

        ctx.drawImage(bushRight, 0, 0, 88, 565, width - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);

        //go buttons
        that.goBtnControl();

        move = requestAnimationFrame(that.startGame);
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

    this.updateSheep = function() {
        if (move % 250 == 0) {
            sheeps.push(sheep);
            sheep.init(move);
            console.log('length', sheeps.length);
        }

        for (var i = 0; i < sheeps.length; i++) {
            sheeps[i].draw();
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
                    // console.log(btnY)
                    // console.log(playerSheep);
                    playerSheep.init(btnY);
                }
            }
        });
    }
}

var game = new SheepGame();
game.init();