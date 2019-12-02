var score = 0;
var enemyCarSpeed = 5;
var counter = 0;

function MyCar(parentElement) {
    this.element = null;
    this.width = 100;
    this.height = 100;
    this.parentElement = parentElement;
    this.left;
    this.top;
    var that = this;

    this.init = function() {
        var box = document.createElement('div');
        box.style.width = this.width + 'px';
        box.style.height = this.height + 'px';
        box.style.background = 'url(images/mycar.png)'
        box.style.backgroundRepeat = 'no-repeat';
        box.style.backgroundPosition = 'center';
        box.style.position = 'absolute';
        this.element = box;
        parentElement.appendChild(this.element);

        return this;
    }

    this.draw = function() {
        this.left = (this.parentElement.offsetWidth / 2) - (this.width / 2); //220
        this.top = 490;

        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
    }

    this.shiftPosition = function(left) {
        that.left += left;
        this.element.style.left = that.left + 'px';
    }

    this.destroyMyCar = function(gameContainer) {
        gameContainer.removeChild(this.element);
        // console.log(this.element);
    }
}

function EnemyCar(parentElement) {
    this.element = null;
    this.parentElement = parentElement;
    this.carTop = -100;
    this.carLeft;
    this.lane;
    var that = this;
    this.init = function() {
        this.element = document.createElement('div');
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.background = 'url(images/enemycar.png)';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.position = 'absolute';
        this.carLeft = this.getRandomPosition();

        this.element.style.left = this.carLeft + 'px';

        this.parentElement.appendChild(this.element);

    }

    this.getRandomPosition = function() {
        this.lane = Math.floor(Math.random() * 3) + 1;
        if (this.lane === 1) {
            return 80; //enemy car at lane 1 with left = 80
        } else if (this.lane === 2) {
            return 220;
        } else {
            return 360;
        }
    }

    this.move = function() {
        this.carTop += enemyCarSpeed;
        this.element.style.top = this.carTop + 'px';
    }

    this.destroyCar = function() {
        this.parentElement.removeChild(that.element);
    }
}

function Game() {
    var gameContainer;
    var road;
    var myCar;
    var enemyCar;
    var move = 0;
    var that = this;
    var interval;

    var enemyCars = [];

    var gameOver;

    this.init = function() {
        gameContainer = document.getElementById('game-container');

        //Start Button
        this.startBtn = document.createElement('button');
        this.startBtn.innerHTML = 'Start Game';
        this.startBtn.style.padding = '10px 30px'
        this.startBtn.style.fontSize = '22px';
        this.startBtn.style.cursor = 'pointer';
        this.startBtn.style.position = 'absolute';
        this.startBtn.style.top = '44%';
        this.startBtn.style.left = '33%';
        this.startBtn.style.fontSize = '24px';

        //Score Board
        this.scoreTrack = document.createElement('h2');
        this.scoreTrack.innerHTML = 'Score<br> ' + score;
        this.scoreTrack.style.position = 'absolute';
        this.scoreTrack.style.color = '#e1040a';
        this.scoreTrack.style.marginLeft = '5px';
        this.scoreTrack.style.marginTop = '5px';
        this.scoreTrack.style.fontWeight = 'lighter';
        this.scoreTrack.style.textAlign = 'center';
        this.scoreTrack.style.display = 'none';
        this.startBtn.style.cursor = 'pointer';

        gameContainer.appendChild(this.startBtn);
        gameContainer.appendChild(this.scoreTrack);

        this.startBtn.onclick = function() {
            that.startBtn.style.display = 'none';
            that.scoreTrack.style.display = 'block';
            myCar = new MyCar(gameContainer).init();
            myCar.draw(); //setting initial position of player car.
            that.startGame();
        }

    }

    this.startGame = function() {

        road = document.getElementsByClassName('road')[0];

        document.addEventListener('keydown', function(event) {
            //left arrow
            if (event.keyCode === 37 && myCar.left != 80) {
                myCar.shiftPosition(-140); // left = 80
            }
            //right arrow
            if (event.keyCode === 39 && myCar.left != 360) {
                myCar.shiftPosition(140); // left = 360
            }
        });

        interval = setInterval(that.gameLoop, 10);
    }

    this.gameLoop = function() {
        that.moveRoad();
        that.generateObstacles();
        that.checkCollision();
    }

    this.moveRoad = function() {
        move += 5;
        road.style.backgroundPositionY = move + 'px';

        counter++;

        //speeding up
        if (counter == 2000) {
            enemyCarSpeed += 1;
        }
        if (counter == 4000) {
            enemyCarSpeed += 2;
        }
        if (counter == 8000) {
            enemyCarSpeed += 4;
        }
        if (counter == 10000) {
            enemyCarSpeed += 5;
        }

    }

    this.generateObstacles = function() {
        if (Math.abs(move) % 300 == 0) {
            enemyCar = new EnemyCar(gameContainer);
            enemyCars.push(enemyCar);
            enemyCar.init();
        }
        //move enemy cars
        for (var i = 0; i < enemyCars.length; i++) {
            enemyCars[i].move();
            //updating score
            if (enemyCars[i].carTop >= 600) {
                enemyCars[i].destroyCar();
                enemyCars.splice(i, 1);
                score += 1;
                this.scoreTrack.innerHTML = 'Score<br>' + score;
            }
        }
    }

    this.checkCollision = function() {
        var myCarLeft = myCar.left;
        var myCarTop = myCar.top;
        // console.log(enemyCars);

        for (i = 0; i < enemyCars.length; i++) {
            if (myCarLeft + myCar.width > enemyCars[i].carLeft && myCarLeft < enemyCars[i].carLeft + 100 &&
                myCarTop + myCar.height > enemyCars[i].carTop && myCarTop < enemyCars[i].carTop + 100) {
                // console.log('over');
                clearInterval(interval);
                that.gameOver();
            }
        }
    }

    this.gameOver = function() {
        gameOver = document.getElementsByClassName('game-over')[0];

        gameOver.style.display = 'block';

        this.gameOverTxt = document.createElement('h1');
        this.gameOverTxt.innerHTML = 'GAME OVER!';
        this.gameOverTxt.style.textAlign = 'center';
        this.gameOverTxt.style.margin = '40% auto 4%';
        this.gameOverTxt.style.fontSize = '75px';
        this.gameOverTxt.style.color = '#9afffb';
        gameOver.appendChild(this.gameOverTxt);

        this.currentScore = document.createElement('h2');
        this.currentScore.innerHTML = 'Score: ' + score;
        this.currentScore.style.textAlign = 'center';
        this.currentScore.style.fontWeight = 'lighter';
        this.currentScore.style.margin = '4% auto';
        this.currentScore.style.color = '#9afffb';
        gameOver.appendChild(this.currentScore);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.innerHTML = 'Play Again';
        this.playAgainBtn.style.padding = '10px'
        this.playAgainBtn.style.fontSize = '22px';
        this.playAgainBtn.style.cursor = 'pointer';
        gameOver.appendChild(this.playAgainBtn);

        this.playAgainBtn.onclick = function() {
            document.location.reload();
        };
        // this.playAgainBtn.onclick = that.playAgain;
    }

    // this.playAgain = function() {
    //     gameOver.style.display = 'none';
    //     score = 0;

    //     for (var i = 0; i < enemyCars.length; i++) {
    //         enemyCars[i].destroyCar();
    //     }
    //     move = 0;
    //     enemyCars = [];
    //     myCar.destroyMyCar(gameContainer);

    //     that.init();
    // }
}

var game = new Game();
game.init();