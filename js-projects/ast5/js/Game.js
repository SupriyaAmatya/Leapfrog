function Game() {

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    canvas.width = 350;
    canvas.height = 512;
    var that = this;

    var frames = 0;

    //load sprite image
    var sprite = new Image();
    sprite.src = '../images/sprite.png';

    //background image setup
    this.sX = 0;
    this.sY = 0;
    this.width = 276;
    this.height = 228;
    this.x = 0; // destination left position
    this.y = canvas.height - this.height; //destination top position

    //GAME STATE
    var state = {
        current: 0,
        getReady: 0,
        game: 1,
        over: 2
    };

    this.baseGround = new BaseGround(canvas.height);
    this.bird = new Bird(this);

    this.gameLoop = function() {
        that.control();
        that.update();
        that.draw();
        frames++;

        requestAnimationFrame(that.gameLoop);
    }

    this.draw = function() {
        ctx.fillStyle = '#4ec0ca';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //background image draw
        ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height,
            this.x, this.y, this.width, this.height);
        ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height,
            this.x + this.width, this.y, this.width, this.height);

        this.baseGround.draw(ctx);
        this.bird.draw(ctx);

        if (state.current == state.getReady) {
            ctx.drawImage(sprite, 0, 229, 173, 45,
                canvas.width / 2 - 173 / 2, 130, 173, 45);
            ctx.strokeText("Tap to play", 100, 200);
        }


        //game over message
        if (state.current == state.over) {
            ctx.drawImage(sprite, 175, 229, 225, 200,
                canvas.width / 2 - 225 / 2, 150, 225, 200);
        }


    }

    this.update = function() {
        if (state.current == state.game) {
            that.bird.update();
        }
    }

    this.control = function() {
        canvas.addEventListener('click', function(event) {
            switch (state.current) {
                case state.getReady:
                    state.current = state.game;
                    break;
                case state.game:
                    that.bird.flyUp();
                    break;
                case state.over:
                    state.current = state.getReady;
                    break;
            }
        });
    }


}
var game = new Game().gameLoop();





// function Game(gameWidth,gameHeight,canvas) {
//     this.gameWidth = gameWidth;
//     this.gameHeight = gameHeight;

//     var background = new Image();
//     var base = new Image();
//     var bird;

//     background.src = './images/background-day.png';
//     base.src = './images/base.png';

//     var that = this;

//     window.onload = function() {
//         that.init();
//     }

//     this.init = function() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
//         ctx.drawImage(base, 0, 128, canvas.width, canvas.height - base.height);

//         that.startGame();
//     }

//     this.startGame = function() {
//         bird = new Bird(canvas);
//         bird.draw();

//         interval = setInterval(that.gameloop(), 100);
//     }

//     this.gameloop = function() {
//         that.moveBase();
//     }

//     this.moveBase = function() {
//         console.log('move');

//     }
// }


// var game = new Game(GAME_WIDTH,GAME_HEIGHT,canvas);
// game.init();