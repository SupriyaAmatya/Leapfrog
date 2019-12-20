function DuelMode(gameState) {
    this.gameState = gameState;
    var width = 897;
    var height = 668;
    var blackSheep;
    var whiteSheep;
    var that = this;

    var sX,
        sY = 0;
    this.x;
    this.y;

    //for animation
    var tickCount = 0;
    var ticksPerFrame = 5;
    var currentFrame = 0;
    var numberOfFrames = 4;

    var state = {
        current: 0,
        getReady: 0,
        set: 1,
        game: 2,
        over: 3
    };

    this.frame = 0;

    this.counter = [{ sX: 0, sY: 0 },
        { sX: 90, sY: 0 },
        { sX: 183, sY: 0 },
        { sX: 241, sY: 0 },
    ]

    var interval, timeOut;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;
        blackSheep = new PlayerSheep();
        whiteSheep = new Sheep();

        blackSheep.init(360, 70, 15);
        blackSheep.x = 50;
        blackSheep.dx = 20;
        blackSheep.y = height / 2 + 30;
        whiteSheep.init(canvas, 360, 70, 15);
        whiteSheep.x = width - whiteSheep.width - 50;
        whiteSheep.y = height / 2 + 30;
        whiteSheep.dx = -20

        that.startGame();
    };


    this.startGame = function() {
        that.control();
        that.draw();
        that.animate();
        // that.readyBtnClicked();
        that.checkCollision();
        requestAnimationFrame(that.startGame);
    };

    this.control = function() {
        canvas.addEventListener('click', function(event) {
            var clickX = event.clientX;
            var clickY = event.clientY;
            if (clickX >= width / 2 - 50 && clickX <= width / 2 - 50 + 110 &&
                clickY >= blackSheep.y + 200 && clickY <= blackSheep.y + 200 + 40) {

                state.current = state.set;
                timeOut = setTimeout(function() {
                    state.current = state.game;
                }, 3000);
            }
        });
        switch (state.current) {
            case state.game:
                clearTimeout(timeOut);
                document.addEventListener('keydown', that.move);
                break;
            case state.over:
                console.log('over');
                break;
        }
    };

    this.draw = function() {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(duelBg, 0, sY, width, height, 0, 0, width, height);
        sX = currentFrame * 90;
        ctx.drawImage(largeWhiteSprite, sX, sY, 90, 70,
            whiteSheep.x, whiteSheep.y, 90, 70);
        ctx.drawImage(largeBlackSprite, sX, sY, 90, 70,
            blackSheep.x, blackSheep.y, 90, 70);

        if (state.current == state.getReady) {
            ctx.drawImage(readyBtn, 0, sY, 190, 75,
                width / 2 - 50, blackSheep.y + 200, 110, 40);
            ctx.font = "Bold 22px Ariel";
            ctx.fillStyle = '#ececec';
            ctx.fillText("Press Space Bar ", 80, 600);
            ctx.fillText("Press Up Arrow ", 680, 600);
        }

        // if (state.current == state.set) {
        //     var sX = currentFrame * 305;
        //     ctx.drawImage(counter, sX, 0, 305, 141,
        //         width / 2, height / 2, 305, 141);
        // }

        if (state.current == state.over) {
            //game over
            // ctx.drawImage()
        }
    };

    this.animate = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (currentFrame < numberOfFrames - 1) {
                currentFrame++;
            } else currentFrame = 0;
        }

        if (state.current == state.set) {
            var ticksPerFrameCount = 1000;
            var tickCountTimer = 0;
            tickCountTimer += 1;
            if (tickCountTimer > ticksPerFrameCount) {
                tickCountTimer = 0;
                ctx.fillText("hello", 500, 500);
            }
        }
    };

    this.move = function(event) {
        interval = setInterval(function() {
            //space bar
            if (event.keyCode == 32) {
                blackSheep.x += blackSheep.dx;
            }
            //up arrow
            if (event.keyCode == 38) {
                whiteSheep.x += whiteSheep.dx;
            }
        }, 1000 / 24);
    };

    this.checkCollision = function() {
        if ((blackSheep.x + blackSheep.width) > whiteSheep.x &&
            blackSheep.x < (whiteSheep.x + whiteSheep.width) &&
            blackSheep.y + blackSheep.height > whiteSheep.y &&
            blackSheep.y < whiteSheep.y + whiteSheep.height) {

            blackSheep.dx = 0;
            whiteSheep.dx = 0;
            state.current = state.over;
        }
        if (state.current == state.over) {
            clearInterval(interval);
        }
    }
}
// new DuelMode().init();