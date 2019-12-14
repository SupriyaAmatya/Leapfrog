function SheepGame() {

    var width = 897;
    var height = 668;

    var sheep; //sheep instance
    var sheeps = [];
    var playerSheep; //player sheep instance
    var playerSheeps = [];

    var blackSheep = false;

    var button;
    var buttons = [];

    var tiles; // tile map
    var tileSize = 90;

    var temp;
    var frame = 0;
    var numberOfLanes = 5;

    var that = this;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;

        tiles = new Tiles();

        that.createButtons();
        that.buttonClickAction();

        that.startGame();
    };

    this.createButtons = function() {
        for (var i = 0; i < numberOfLanes; i++) {
            button = new GoButton(ctx, i);
            buttons.push(button);
        }
    };

    this.buttonClickAction = function() {
        canvas.addEventListener('click', function(event) {
            var clickX = event.clientX;
            var clickY = event.clientY;
            for (var i = 0; i < numberOfLanes; i++) {
                if (clickX >= buttons[i].btnX && clickX <= buttons[i].btnX + buttons[i].btnWidth &&
                    clickY >= buttons[i].btnY && clickY <= buttons[i].btnY + buttons[i].btnHeight) {

                    blackSheep = true;
                    playerSheep = new PlayerSheep(buttons[i].btnY);
                    that.createPlayerSheep();

                }
            }
        });
    };

    //game loop
    this.startGame = function() {
        ctx.clearRect(0, 0, width, height);

        //map creation
        that.renderMap();

        that.createSheep();
        that.updateSheep();

        if (blackSheep) {
            that.updatePlayerSheep();
        }
        ctx.drawImage(bushRight, 0, 0, 88, 565, width - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);

        //go buttons
        that.drawButton();

        frame++;
        requestAnimationFrame(that.startGame);
    };

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
    };

    this.drawButton = function() {
        buttons.forEach(function(button) {
            button.draw();
        });
    };

    this.createSheep = function() {
        temp = Math.floor(Math.random() * 10 + 1);
        sheep = new Sheep(playerSheep);
        if (temp >= 1 && temp <= 5) {
            sheep.init(canvas, 200, 50, 5);
        }
        if (temp >= 6 && temp <= 8) {
            sheep.init(canvas, 320, 60, 10)
        }
        if (temp == 9) {
            sheep.init(canvas, 360, 70, 15)
        }
        if (temp == 10) {
            sheep.init(canvas, 400, 80, 20)
        }
    };

    this.updateSheep = function() {
        if (frame % 200 == 0) {
            sheeps.push(sheep);
            // console.log('length', sheeps.length);
        }

        for (var i = 0; i < sheeps.length; i++) {
            sheeps[i].draw(ctx);
            sheeps[i].update();
            //destroy sheep
            if (sheeps[i].whiteSheepX < -(sheeps[i].width - 70)) {
                sheeps.shift();
            }
        }

    };


    this.createPlayerSheep = function() {
        temp = Math.floor(Math.random() * 10 + 1);
        if (temp >= 1 && temp <= 5) {
            playerSheep.init(200, 50, 5);
        }
        if (temp >= 6 && temp <= 8) {
            playerSheep.init(320, 60, 10);
        }
        if (temp == 9) {
            playerSheep.init(360, 70, 15);
        }
        if (temp == 10) {
            playerSheep.init(400, 80, 20);
        }
        playerSheeps.push(playerSheep);
    };

    this.updatePlayerSheep = function() {
        console.log(playerSheeps.length);
        for (var i = 0; i < playerSheeps.length; i++) {
            playerSheeps[i].draw(ctx);
            playerSheeps[i].update();
            //destroy sheep
            if (playerSheeps[i].x > (canvas.width - 70)) {
                playerSheeps.shift();
            }
        }
    };
}

var game = new SheepGame();
game.init();