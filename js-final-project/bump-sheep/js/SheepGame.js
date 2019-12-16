function SheepGame() {

    var width = 897;
    var height = 668;

    var sheep; //sheep instance
    var sheeps = [];
    var playerSheep; //player sheep instance
    var playerSheeps = [];

    var isBlackSheep = false;

    var button;
    var buttons = [];

    var tiles; // tile map
    var tileSize = 90;

    var temp;
    var frame = 0;
    this.period = 200;
    var move;
    var numberOfLanes = 5;

    //process bar
    var alWhite = 0;
    var alBlack = 0;
    var barTimer = false;

    this.whiteScore = 0;
    this.blackScore = 0;

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
                    if (frame >= 180) {
                        isBlackSheep = true;
                        barTimer = true;
                        playerSheep = new PlayerSheep(buttons[i].btnY);
                        that.createPlayerSheep();
                        frame = 0;
                    }
                }
            }
        });
    };

    //game loop
    this.startGame = function() {
        ctx.clearRect(0, 0, width, height);

        //map creation
        that.renderMap();

        that.drawScore();
        that.createSheep();
        that.updateSheep();

        that.checkBlackWhiteCollision();

        if (isBlackSheep) {
            // console.log(playerSheep.y);
            that.updatePlayerSheep();
        }
        that.drawButton();
        frame++;
        move = requestAnimationFrame(that.startGame);
    };

    this.drawScore = function() {
        ctx.drawImage(score, 0, 0, width, 112, 0, 0, width, 112);
        ctx.font = 'Bold 40px Arial';
        ctx.fillStyle = '#d65508';
        ctx.fillText(that.blackScore, width / 2 - 80, height - 610);
        ctx.textAlign = 'center';

        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(that.whiteScore, width / 2 + 80, height - 610);
        ctx.textAlign = 'center';

        that.progressBarWhite();
        that.progressBarBlack();
    }

    this.renderMap = function() {
        for (var row = 0; row < mapH; row++) {
            for (var col = 0; col < mapW; col++) {
                switch (gameMap[((row * mapW) + col)]) {
                    case 1:
                        tiles.x = col * tileSize;
                        tiles.y = row * tileSize;
                        tiles.tile1();
                        tiles.draw(ctx);
                        break;

                    case 2:
                        tiles.x = col * tileSize;
                        tiles.y = row * tileSize;
                        tiles.tile2();
                        tiles.draw(ctx);
                        break;

                    case 3:
                        tiles.x = col * tileSize;
                        tiles.y = row * tileSize;
                        tiles.tile3();
                        tiles.draw(ctx);
                        break;

                    case 4:
                        tiles.x = col * tileSize;
                        tiles.y = row * tileSize;
                        tiles.tile4();
                        tiles.draw(ctx);
                        break;
                }
            }
        }
    };

    this.drawButton = function() {
        // ctx.drawImage(bushRight, 0, 0, 88, 565, width - 88, 103, 88, 565);
        // ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);

        buttons.forEach(function(button) {
            button.draw();
        });
    };

    this.createSheep = function() {
        if (move % that.period == 0) {
            temp = Math.floor(Math.random() * 10 + 1);
            sheep = new Sheep(frame);
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

            sheeps.push(sheep);
        }
    };

    this.updateSheep = function() {

        for (var i = 0; i < sheeps.length; i++) {
            sheeps[i].draw(ctx);
            sheeps[i].update();
            // sheeps[i].checkCollision(sheeps);
            //destroy sheep
            if (sheeps[i].x < 50) {
                sheeps.splice(i, 1);
                that.whiteScore += 1;
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
        // console.log(playerSheeps.length);
        for (var i = 0; i < playerSheeps.length; i++) {
            playerSheeps[i].draw(ctx);
            playerSheeps[i].update();

            //destroy sheep
            if (playerSheeps[i].x > (canvas.width - 60) || playerSheeps[i].x < 75) {
                playerSheeps.splice(i, 1);
                that.blackScore += 1;
            }
        }
    };

    this.checkBlackWhiteCollision = function() {
        for (var i = 0; i < sheeps.length; i++) {
            for (var j = 0; j < playerSheeps.length; j++) {
                if ((playerSheeps[j].x + playerSheeps[j].width) > sheeps[i].x &&
                    playerSheeps[j].x < (sheeps[i].x + sheeps[i].width) &&
                    playerSheeps[j].y + playerSheeps[j].height > sheeps[i].y &&
                    playerSheeps[j].y < sheeps[i].y + sheeps[i].height) {

                    if (playerSheeps[j].weight > sheeps[i].weight) {
                        playerSheeps[j].dx = 2;
                        sheeps[i].dx = -2;
                    } else if (playerSheeps[j].weight < sheeps[i].weight) {
                        playerSheeps[j].dx = -2;
                        sheeps[i].dx = 2;
                    } else {
                        playerSheeps[j].dx = 0;
                        sheeps[i].dx = 0;
                    }

                }
            }
        }
    };

    this.progressBarWhite = function() {
        var start = 5;
        var diff;
        diff = ((alWhite / 100) * Math.PI * 2 * 10).toFixed(2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#e0fe53";
        ctx.beginPath();
        ctx.arc(width - 50, 50, 35, start, diff / 15 + start, false);
        ctx.stroke();
        if (alWhite >= that.period) {
            alWhite = 0;
        }
        alWhite++;
    };

    this.progressBarBlack = function() {

        var start = 5;
        var diff;
        diff = ((alBlack / 100) * Math.PI * 2 * 10).toFixed(2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#e0fe53";
        ctx.beginPath();
        ctx.arc(50, 50, 35, start, diff / 15 + start, false);
        ctx.stroke();

        if (alBlack >= 180) {
            if (barTimer) {
                alBlack = 0;
                barTimer = false;
            }
        }
        alBlack++;
    };
}

var game = new SheepGame();
game.init();