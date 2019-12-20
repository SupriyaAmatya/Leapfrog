function SheepGame(gameState) {

    this.gameState = gameState;
    var width = 897;
    var height = 668;

    var sheep; //sheep instance
    var sheeps = [
        [],
        [],
        [],
        [],
        []
    ];
    var playerSheep; //player sheep instance
    var playerSheeps = [
        [],
        [],
        [],
        [],
        []
    ];

    var collidedSheeps = [
        [],
        [],
        [],
        [],
        []
    ];

    var isBlackSheep = false;

    var button;
    var buttons = [];

    var tiles; // tile map
    var tileSize = 90;

    var temp;
    var frame = 0;
    this.period = 170;
    var move;
    var numberOfLanes = 5;

    //for lane
    var lane = undefined;

    //process bar
    var start = 5;
    var diff;
    var alWhite = 0;
    var alBlack = 0;
    var barTimer = false;

    var gameTime = 1 * 60 * 60; //seconds

    var timeOut;

    this.whiteScore = 0;
    this.blackScore = 0;

    var that = this;
    var modeSelection = document.getElementsByClassName('mode-selection')[0];
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

                    if (frame >= that.period) {
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
        that.renderMap();
        that.drawScore();

        that.renderTime();

        that.createSheep();
        that.updateSheep();
        if (isBlackSheep) {
            that.updatePlayerSheep();
        }

        that.checkCollision();
        that.compareWeight();

        that.drawButton();
        frame++;
        timeOut = setTimeout(that.gameOver, gameTime * 60);
        move = requestAnimationFrame(that.startGame);
    };

    this.renderTime = function() {
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(Math.floor(gameTime / 60) + 's', 445, height - 615);
        ctx.textAlign = 'center';
        setTimeout(function() {
            gameTime--;
        }, 3000)
    }

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

        ctx.font = "Bold 35px Arial";
        ctx.fillText("Player", 150, 660);
        ctx.fillText("Computer", 720, 660);

        that.progressBarWhite();
        that.progressBarBlack();
    };

    this.renderMap = function() {
        for (var row = 0; row < mapH; row++) {
            for (var col = 0; col < mapW; col++) {
                switch (gameMap[row][col]) {
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
        ctx.drawImage(bushRight, 0, 0, 88, 565, width - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);

        buttons.forEach(function(button) {
            button.draw();
        });
    };

    this.createSheep = function() {
        if (move % that.period == 0) {
            temp = Math.floor(Math.random() * 10 + 1);
            sheep = new Sheep();
            if (temp >= 1 && temp <= 5) {
                lane = sheep.init(canvas, 200, 50, 1);
            }
            if (temp >= 6 && temp <= 8) {
                lane = sheep.init(canvas, 320, 60, 3)
            }
            if (temp == 9) {
                lane = sheep.init(canvas, 360, 70, 4)
            }
            if (temp == 10) {
                lane = sheep.init(canvas, 400, 80, 5)
            }

            //specifying Y position of white sheep
            if (lane == 190) {
                sheeps[0].push(sheep);
            }
            if (lane == 280) {
                sheeps[1].push(sheep);
            }
            if (lane == 370) {
                sheeps[2].push(sheep);
            }
            if (lane == 460) {
                sheeps[3].push(sheep);
            }
            if (lane == 550) {
                sheeps[4].push(sheep);
            }
        }
    };

    this.updateSheep = function() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < sheeps[i].length; j++) {
                sheeps[i][j].draw(ctx);
                sheeps[i][j].update();

                //destroy sheep
                if (sheeps[i][j].x <= -100) {
                    that.whiteScore += 1;
                    for (var k = 0; k < collidedSheeps[i].length; k++) {
                        if (collidedSheeps[i][k] == sheeps[i][j]) {
                            collidedSheeps[i].splice(k, 1);
                        }
                    }
                    sheeps[i].splice(j, 1);
                    playerSheeps[i] = [];
                }
            }
        }
    };

    this.createPlayerSheep = function() {
        temp = Math.floor(Math.random() * 10 + 1);
        var btnPosY;
        if (temp >= 1 && temp <= 5) {
            btnPosY = playerSheep.init(200, 50, 1);
        }
        if (temp >= 6 && temp <= 8) {
            btnPosY = playerSheep.init(320, 60, 3);
        }
        if (temp == 9) {
            btnPosY = playerSheep.init(360, 70, 4);
        }
        if (temp == 10) {
            btnPosY = playerSheep.init(400, 80, 5);
        }

        //specifying Y position of black sheep
        if (btnPosY == 190) {
            playerSheeps[0].push(playerSheep);
        }
        if (btnPosY == 280) {
            playerSheeps[1].push(playerSheep);
        }
        if (btnPosY == 370) {
            playerSheeps[2].push(playerSheep);
        }
        if (btnPosY == 460) {
            playerSheeps[3].push(playerSheep);
        }
        if (btnPosY == 550) {
            playerSheeps[4].push(playerSheep);
        }

    };

    this.updatePlayerSheep = function() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < playerSheeps[i].length; j++) {
                playerSheeps[i][j].draw(ctx);
                playerSheeps[i][j].update();

                //destroy sheep
                if (playerSheeps[i][j].x >= canvas.width + 100) {
                    that.blackScore += 1;
                    for (var k = 0; k < collidedSheeps[i].length; k++) {
                        if (collidedSheeps[i][k] == playerSheeps[i][j]) {
                            collidedSheeps[i].splice(k, 1);
                        }
                    }
                    playerSheeps[i].splice(j, 1);
                    sheeps[i] = []
                }
            }
        }
    };

    this.checkCollision = function() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < sheeps[i].length; j++) {

                // collision check
                for (var k = 0; k < playerSheeps[i].length; k++) {

                    if ((playerSheeps[i][k].x + playerSheeps[i][k].width) > sheeps[i][j].x &&
                        playerSheeps[i][k].x < (sheeps[i][j].x + sheeps[i][j].width) &&
                        playerSheeps[i][k].y + playerSheeps[i][k].height > sheeps[i][j].y &&
                        playerSheeps[i][k].y < sheeps[i][j].y + sheeps[i][j].height) {

                        var isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (playerSheeps[i][k] == collidedSheeps[i][l]) {
                                isInCollidedSheeps = true;
                            }
                        }
                        if (!isInCollidedSheeps) {
                            collidedSheeps[i].push(playerSheeps[i][k]);
                        }
                        isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (sheeps[i][j] == collidedSheeps[i][l])
                                isInCollidedSheeps = true;
                        }
                        if (!isInCollidedSheeps)
                            collidedSheeps[i].push(sheeps[i][j]);

                    }
                }
            }
        }

        for (var i = 0; i < 5; i++) {
            //white sheep collision
            for (var j = 0; j < sheeps[i].length; j++) {
                for (var k = 0; k < collidedSheeps[i].length; k++) {

                    if ((collidedSheeps[i][k].x + collidedSheeps[i][k].width) > sheeps[i][j].x &&
                        collidedSheeps[i][k].x < (sheeps[i][j].x + sheeps[i][j].width) &&
                        collidedSheeps[i][k].y + collidedSheeps[i][k].height > sheeps[i][j].y &&
                        collidedSheeps[i][k].y < sheeps[i][j].y + sheeps[i][j].height) {

                        var isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (collidedSheeps[i][k] == collidedSheeps[i][l]) {
                                isInCollidedSheeps = true;
                            }
                        }

                        isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (sheeps[i][j] == collidedSheeps[i][l])
                                isInCollidedSheeps = true;
                        }
                        if (!isInCollidedSheeps)
                            collidedSheeps[i].push(sheeps[i][j]);
                    }
                }
            }

            //black sheep collision
            for (var j = 0; j < playerSheeps[i].length; j++) {

                for (var k = 0; k < collidedSheeps[i].length; k++) {

                    if ((collidedSheeps[i][k].x + collidedSheeps[i][k].width) > playerSheeps[i][j].x &&
                        collidedSheeps[i][k].x < (playerSheeps[i][j].x + playerSheeps[i][j].width) &&
                        collidedSheeps[i][k].y + collidedSheeps[i][k].height > playerSheeps[i][j].y &&
                        collidedSheeps[i][k].y < playerSheeps[i][j].y + playerSheeps[i][j].height) {

                        var isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (collidedSheeps[i][k] == collidedSheeps[i][l]) {
                                isInCollidedSheeps = true;
                            }
                        }

                        isInCollidedSheeps = false;
                        for (var l = 0; l < collidedSheeps[i].length; l++) {
                            if (playerSheeps[i][j] == collidedSheeps[i][l])
                                isInCollidedSheeps = true;
                        }
                        if (!isInCollidedSheeps)
                            collidedSheeps[i].push(playerSheeps[i][j]);
                    }
                }
            }
        }
    };

    this.compareWeight = function() {
        for (var i = 0; i < 5; i++) {
            var weightage = 0;
            for (var j = 0; j < collidedSheeps[i].length; j++) {
                if (collidedSheeps[i][j].playerSheep) {
                    weightage += collidedSheeps[i][j].weight;
                } else {
                    weightage -= collidedSheeps[i][j].weight;
                }
            }
            for (var j = 0; j < collidedSheeps[i].length; j++) {
                collidedSheeps[i][j].setDx(weightage);
            }

            //removing the collided sheeps
            for (var j = 0; j < collidedSheeps[i].length; j++) {
                if (collidedSheeps[i][j] == undefined)
                    return
                if (collidedSheeps[i][j].playerSheep) {
                    if (collidedSheeps[i][j].x <= 0) {
                        collidedSheeps[i].splice(j, 1);
                    }
                } else {
                    if (collidedSheeps[i][j].x >= canvas.width) {
                        collidedSheeps[i].splice(j, 1);
                    }
                }
            }
        }
    };

    this.progressBarWhite = function() {
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
        diff = ((alBlack / 100) * Math.PI * 2 * 10).toFixed(2);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#e0fe53";
        ctx.beginPath();
        ctx.arc(50, 50, 35, start, diff / 15 + start, false);
        ctx.stroke();

        if (alBlack >= that.period) { //playersheep time period
            if (barTimer) {
                alBlack = 0;
                barTimer = false;
            }
        }
        alBlack++;
    };

    this.gameOver = function() {
        window.cancelAnimationFrame(move);
        clearTimeout(timeOut);
        that.displayResult();
    };

    this.displayResult = function() {
        ctx.font = "Bold 60px sans-serif";
        ctx.fillStyle = '#ececec'
        ctx.fillText("Game Over!", width / 2, 150);
        ctx.textAlign = 'center';

        ctx.drawImage(menu, 0, 0, 131, 110, width / 2 + 100, 500, 100, 100)

        that.buttonsAction();
    };

    this.buttonsAction = function() {
        canvas.addEventListener('click', function(event) {
            var clickX = event.clientX;
            var clickY = event.clientY;
            //menu button
            if (clickX >= 548 && clickX <= 648 && clickY >= 500 && clickY <= 600) {
                modeSelection.style.display = 'block';
            }
        });
    };
}