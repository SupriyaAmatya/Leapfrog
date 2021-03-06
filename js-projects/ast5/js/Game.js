function Game(canvas, ctx) {
    console.log(canvas);
    canvas.width = 350;
    canvas.height = 512;
    var that = this;

    var frames = 0;
    this.pipeArray = [];
    this.maxYPos = -150;

    //load sprite image
    var sprite = new Image();
    sprite.src = 'images/sprite.png';

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

    var score = 0;
    var best = score;

    this.baseGround = new BaseGround(canvas.height);
    this.bird = new Bird(state, frames);
    this.pipe = new Pipe(this.bird);

    this.gameLoop = function() {
        that.control();
        that.draw();
        that.update();
        frames++;
        this.bird = new Bird(state, frames);
        requestAnimationFrame(that.gameLoop);
    }

    this.draw = function() {

        //bg color
        ctx.fillStyle = '#4ec0ca';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        //background image draw
        ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height,
            this.x, this.y, this.width, this.height);
        ctx.drawImage(sprite, this.sX, this.sY, this.width, this.height,
            this.x + this.width, this.y, this.width, this.height);

        this.pipe.draw(ctx, this.pipeArray);
        this.baseGround.draw(ctx);
        this.bird.draw(ctx);


        if (state.current == state.getReady) {
            ctx.drawImage(sprite, 0, 229, 173, 45,
                canvas.width / 2 - 173 / 2, 130, 173, 45);
            ctx.strokeText("Tap to play", 100, 200);
            ctx.font = "22px Teko";
        }

        //game over message
        if (state.current == state.over) {
            ctx.drawImage(sprite, 175, 229, 225, 200,
                canvas.width / 2 - 225 / 2, 150, 225, 200);
        }
        that.renderCurrentScore(ctx);

    }

    this.renderCurrentScore = function() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        let height = 50;

        if (state.current == state.game) {
            ctx.lineWidth = 2; //making it bold
            ctx.font = "30px Teko"; //size and fontstyle
            ctx.fillText(score, canvas.width / 2, height);
            ctx.strokeText(score, canvas.width / 2, height);
        } else if (state.current == state.over) {
            // SCORE VALUE
            ctx.font = "25px Teko";
            ctx.fillText(score, 230, 245);
            ctx.strokeText(score, 230, 245);
            // BEST SCORE
            ctx.fillText(best, 230, 290);
            ctx.strokeText(best, 230, 290);
        }
    }

    this.update = function() {
        if (state.current == state.game) {
            that.bird.update();
            that.baseGround.update();
            that.checkGroundCollision();
            that.generatePipes();
            that.checkPipeCollision();
        }
    }

    this.control = function() {
        var btnX = 130;
        var btnY = 320;
        var btnWidth = 83;
        var btnHeight = 29;

        canvas.addEventListener('click', function(event) {
            switch (state.current) {
                case state.getReady:
                    state.current = state.game;
                    break;
                case state.game:
                    that.bird.flyUp();
                    break;
                case state.over:
                    let rect = canvas.getBoundingClientRect();
                    let clickX = event.clientX - rect.left;
                    let clickY = event.clientY - rect.top;

                    //if clicked on start button
                    if (clickX >= btnX && clickX <= btnX + btnWidth &&
                        clickY >= btnY && clickY <= btnY + btnHeight) {
                        that.restart();
                        state.current = state.getReady;
                    }
                    break;
            }
        });
    }

    this.generatePipes = function() {
        if (state.current != state.game)
            return;

        if (frames % 100 === 0) {
            this.pipeArray.push({
                x: canvas.width,
                y: this.maxYPos * (Math.random() + 1)
            });
        }

        this.pipe.update(this.pipeArray);
    }

    this.checkGroundCollision = function() {
        if (that.bird.y + that.bird.height / 2 === canvas.height - that.baseGround.height) {
            state.current = state.over;
        }
    }

    this.checkPipeCollision = function() {
        for (var i = 0; i < this.pipeArray.length; i++) {
            let p = this.pipeArray[i];
            var bottomPipeYPos = p.y + that.pipe.height + that.pipe.gap;

            //top pipe collision
            if (that.bird.x + that.bird.width / 2 > p.x &&
                that.bird.x - that.bird.width / 2 < p.x + that.pipe.width &&
                that.bird.y + that.bird.width / 2 > p.y &&
                that.bird.y - that.bird.width / 2 < p.y + that.pipe.height
            ) {
                that.bird.y--
                    state.current = state.over;

            }

            //bottom pipe collision
            if (that.bird.x + that.bird.width / 2 > p.x &&
                that.bird.x - that.bird.width / 2 < p.x + that.pipe.width &&
                that.bird.y + that.bird.width / 2 > bottomPipeYPos &&
                that.bird.y - that.bird.width / 2 < bottomPipeYPos + that.pipe.height
            ) {
                state.current = state.over;
            }

            if (p.x + that.pipe.width < 0) {
                this.pipeArray.shift();
                score += 1;
                best = Math.max(score, best);
                localStorage.setItem("best", best);
            }
        }
    }

    this.restart = function() {
        this.pipeArray = [];
        score = 0
        that.bird.reset();
    }

}

var canvas1 = document.getElementById('game-container');
var ctx1 = canvas1.getContext('2d');
var game1 = new Game(canvas1, ctx1).gameLoop();

var canvas2 = document.getElementById('game-container2');
var ctx2 = canvas2.getContext('2d');
var game2 = new Game(canvas2, ctx2).gameLoop();