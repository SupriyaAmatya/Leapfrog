var enemyCarSpeed = 5;
var counter = 0;
var that = this;

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
        this.left = (that.parentElement.offsetWidth / 2) - (that.width / 2); //220
        this.top = 490;

        this.element.style.left = this.left + 'px';
        this.element.style.top = this.top + 'px';
    }

    this.shiftPosition = function(left) {
        this.left += left;

        // console.log('left>>', that.left);
        this.element.style.left = this.left + 'px';
    }

    this.destroyMyCar = function(gameContainer) {
        gameContainer.removeChild(this.element);
    }
}

function Bullet(myCar) {
    this.element = document.createElement('div');

    this.bulletLeft = myCar.left + 35;
    this.bulletTop = myCar.top - 35;
    var bulletWidth = 30;
    var bulletHeight = 30;

    this.createBullet = function(parentElement) {
        this.parentElement = parentElement
            // this.element = bullet;
        this.element.style.width = bulletWidth + 'px';
        this.element.style.height = bulletHeight + 'px';
        this.element.style.background = 'url(images/fireball.png';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundSize = 'contain';
        this.element.style.position = 'absolute';
        this.element.style.left = this.bulletLeft + 'px';
        this.element.style.top = this.bulletTop + 'px';

        this.parentElement.appendChild(this.element);
    }

    this.move = function() {
        this.bulletTop -= 5;
        this.element.style.top = this.bulletTop + 'px';
    }

    this.removeBullet = function(parentElement) {
        parentElement.removeChild(this.element);
    }
}

function PowerUp(parentElement) {
    this.parentElement = parentElement;

    this.y = -100;
    this.x;

    var that = this;
    this.x = 331;

    this.create = function() {
        this.powerUpDiv = document.createElement('div');
        this.powerUpDiv.style.width = '100px';
        this.powerUpDiv.style.height = '100px';
        this.powerUpDiv.style.background = 'url(images/powerup.png)';
        this.powerUpDiv.style.backgroundRepeat = 'no-repeat';
        this.powerUpDiv.style.position = 'absolute';
        this.powerUpDiv.style.backgroundSize = 'contain';
        this.powerUpDiv.style.zIndex = '10';
        this.x = that.getRandomPosition();
        this.powerUpDiv.style.left = this.x + 'px';
        this.powerUpDiv.style.top = this.y + 'px';

        this.parentElement.appendChild(this.powerUpDiv);

    }

    this.update = function() {
        this.y += 5;
        this.powerUpDiv.style.top = this.y + 'px';
    }

    this.removePowerUp = function() {
        this.parentElement.removeChild(this.powerUpDiv);
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
        this.carLeft = that.getRandomPosition();

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

    var score = 0;
    var gameOver;

    var bullet;
    var bulletArray = [];
    var bulletCount = 10;
    var fire = true;

    var powerUp;
    var powerUpArray = [];

    this.init = function() {
        gameContainer = document.getElementById('game-container');
        this.text = document.createElement('h3');
        this.text.innerHTML = 'Press SPACE BAR to fire';
        this.text.style.textAlign = 'center';
        this.text.style.fontSize = '16px';
        this.text.style.position = 'absolute';
        this.text.style.top = '90%';
        this.text.style.background = 'linear-gradient(to right, rgba(0, 204, 102, 0.6) 0%, rgba(255, 102, 153, 0.6) 100%)';
        this.text.style.padding = '0 175px';
        this.text.style.fontWeight = 'lighter';
        this.text.style.borderRadius = '5px';

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
        this.startBtn.style.background = 'linear-gradient(to right, rgba(0, 204, 102, 0.541) 0%, rgba(255, 102, 153, 0.473) 100%)';

        //Score Board
        this.scoreTrack = document.createElement('h2');
        this.scoreTrack.innerHTML = 'Score<br> ' + score;
        this.scoreTrack.style.position = 'absolute';
        this.scoreTrack.style.color = '#ff0066';
        this.scoreTrack.style.marginLeft = '5px';
        this.scoreTrack.style.marginTop = '5px';
        this.scoreTrack.style.fontWeight = 'lighter';
        this.scoreTrack.style.textAlign = 'center';
        this.scoreTrack.style.display = 'none';

        //Bullet Track
        this.bulletTrack = document.createElement('h2');
        this.bulletTrack.innerHTML = 'Bullets<br> ' + bulletCount;
        this.bulletTrack.style.position = 'absolute';
        this.bulletTrack.style.color = '#ff0066';
        this.bulletTrack.style.left = '460px';
        this.bulletTrack.style.marginTop = '5px';
        this.bulletTrack.style.fontWeight = 'lighter';
        this.bulletTrack.style.textAlign = 'center';
        this.bulletTrack.style.float = 'right';
        this.bulletTrack.style.display = 'none';

        gameContainer.appendChild(this.text);
        gameContainer.appendChild(this.startBtn);
        gameContainer.appendChild(this.scoreTrack);
        gameContainer.appendChild(this.bulletTrack);

        this.startBtn.onclick = function() {
            gameContainer.removeChild(that.startBtn);
            gameContainer.removeChild(that.text);
            that.scoreTrack.style.display = 'block';
            that.bulletTrack.style.display = 'block';

            that.startGame();
        }

    }

    this.startGame = function() {
        myCar = new MyCar(gameContainer).init();
        myCar.draw(); //setting initial position of player car.
        road = document.getElementsByClassName('road')[0];

        document.addEventListener('keydown', that.moveMyCar);

        interval = setInterval(that.gameLoop, 10);
    }

    this.gameLoop = function() {
        that.moveBullet();
        that.moveRoad();
        that.generateObstacles();
        that.updateScore();
        that.generatePowerUps();
        // that.refill();
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

    this.moveMyCar = function(event) {
        //left arrow
        if (event.keyCode === 37 && myCar.left != 80) {
            myCar.shiftPosition(-140); // left = 80
        }
        //right arrow
        if (event.keyCode === 39 && myCar.left != 360) {
            myCar.shiftPosition(140); // left = 360
        }

        //for bulltes
        if (event.keyCode == 32 && bulletCount > 0) {
            bullet = new Bullet(myCar);
            bulletArray.push(bullet);
            if (fire) {
                bullet.createBullet(gameContainer);
                bulletCount--;
                that.bulletTrack.innerHTML = 'Bullets<br> ' + bulletCount;
                fire = false;
                setTimeout(function() {
                    fire = true;
                }, 300);
            }

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
            console.log(enemyCars[i]);
            enemyCars[i].move();
            //updating score

            // if (enemyCars[i].carTop >= 600) {
            //     enemyCars[i].destroyCar();
            //     enemyCars.splice(i, 1);
            //     score++;
            //     this.scoreTrack.innerHTML = 'Score<br>' + score;
            // }
        }
    }

    this.updateScore = function() {
        for (var i = 0; i < enemyCars.length; i++) {
            if (enemyCars[i].carTop >= 600) {
                enemyCars[i].destroyCar();
                enemyCars.splice(i, 1);
                score++;
                that.scoreTrack.innerHTML = 'Score<br>' + score;
            }
        }
    }

    this.moveBullet = function() {
        for (var i = 0; i < bulletArray.length; i++) {
            bulletArray[i].move();
        }
    }

    // this.refill = function() {
    //     console.log(counter);
    //     if (counter >= 300 && bulletCount == 0) {
    //         console.log('refill');
    //         bulletCount = 10;
    //         that.bulletTrack.innerHTML = 'Bullets<br> ' + bulletCount;
    //     }
    // }

    this.generatePowerUps = function() {
        if (Math.abs(move) % 700 == 0) {
            if (bulletCount <= 5) {
                powerUp = new PowerUp(gameContainer);
                powerUpArray.push(powerUp);
                powerUp.create();
            }

        }
        for (var i = 0; i < powerUpArray.length; i++) {
            powerUpArray[i].update();
        }
    }

    this.checkCollision = function() {
        var myCarLeft = myCar.left;
        var myCarTop = myCar.top;

        for (i = 0; i < enemyCars.length; i++) {
            // console.log(enemyCars[i].carLeft);
            if (myCarLeft + myCar.width > enemyCars[i].carLeft && myCarLeft < enemyCars[i].carLeft + 100 &&
                myCarTop + myCar.height > enemyCars[i].carTop && myCarTop < enemyCars[i].carTop + 100) {
                clearInterval(interval);
                that.gameOver();
            }
            for (var j = 0; j < bulletArray.length; j++) {
                if (bulletArray[j].bulletLeft + 30 >= enemyCars[i].carLeft && bulletArray[j].bulletLeft <= enemyCars[i].carLeft + 100 &&
                    bulletArray[j].bulletTop + 30 >= enemyCars[i].carTop && bulletArray[j].bulletTop <= enemyCars[i].carTop + 100) {
                    // console.log('destroy');
                    enemyCars[i].destroyCar();
                    enemyCars.splice(i, 1);

                    bulletArray[j].removeBullet(gameContainer);
                    bulletArray.splice(j, 1);
                    score = score + 1;
                    that.scoreTrack.innerHTML = 'Score<br>' + score;
                }
            }
        }
        for (i = 0; i < powerUpArray.length; i++) {
            // console.log(enemyCars[i].carLeft);
            if (myCarLeft + myCar.width > powerUpArray[i].x && myCarLeft < powerUpArray[i].x + 100 &&
                myCarTop + myCar.height > powerUpArray[i].y && myCarTop < powerUpArray[i].y + 100) {

                powerUpArray[i].removePowerUp(gameContainer);
                powerUpArray.splice(i, 1);
                bulletCount += 2;
                that.bulletTrack.innerHTML = 'Bullets <br> ' + bulletCount;
            }
        }
    }



    this.gameOver = function() {
        gameOver = document.getElementsByClassName('game-over')[0];

        gameOver.style.display = 'block';

        this.gameOverTxt = document.createElement('h1');
        this.gameOverTxt.innerHTML = 'GAME OVER!';
        this.gameOverTxt.style.textAlign = 'center';
        this.gameOverTxt.style.margin = '35% auto 4%';
        this.gameOverTxt.style.fontSize = '75px';
        this.gameOverTxt.style.color = '#9afffb';
        gameOver.appendChild(this.gameOverTxt);

        this.currentScoreTxt = document.createElement('h2');
        this.currentScoreTxt.innerHTML = 'Score: ' + score;
        this.currentScoreTxt.style.textAlign = 'center';
        this.currentScoreTxt.style.fontWeight = 'lighter';
        this.currentScoreTxt.style.margin = '4% auto';
        this.currentScoreTxt.style.color = '#9afffb';
        gameOver.appendChild(this.currentScoreTxt);

        this.playAgainBtn = document.createElement('button');
        this.playAgainBtn.innerHTML = 'Play Again';
        this.playAgainBtn.style.padding = '10px'
        this.playAgainBtn.style.fontSize = '22px';
        this.playAgainBtn.style.cursor = 'pointer';
        this.playAgainBtn.style.background = 'linear-gradient(to right, rgba(0, 204, 102, 0.8) 0%, rgba(255, 102, 153, 0.8) 100%)'
        gameOver.appendChild(this.playAgainBtn);

        // this.playAgainBtn.onclick = function() {
        //     document.location.reload();
        // };

        this.playAgainBtn.onclick = that.playAgain;
    }

    this.playAgain = function() {
        gameOver.style.display = 'none';
        gameOver.removeChild(that.gameOverTxt);
        gameOver.removeChild(that.currentScoreTxt);
        gameOver.removeChild(that.playAgainBtn);
        // clearInterval(interval);

        for (var i = 0; i < enemyCars.length; i++) {
            enemyCars[i].destroyCar();
        }
        myCar.destroyMyCar(gameContainer);

        enemyCars = [];
        counter = 0;
        move = 0;
        enemyCarSpeed = 5;

        score = 0;
        that.scoreTrack.innerHTML = 'Score<br> ' + score;

        bulletCount = 10;
        that.bulletTrack.innerHTML = 'Bullets <br> ' + bulletCount;

        that.startGame();
    }
}

var game = new Game();
game.init();