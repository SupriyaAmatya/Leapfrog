function MyCar(parentElement) {
    this.element = null;
    this.width = 100;
    this.height = 100;
    this.parentElement = parentElement;
    this.x = (this.parentElement.offsetWidth / 2) - (this.width / 2);
    console.log(this.x);
    this.y = 490;
    var that = this;

    this.init = function() {
        var box = document.createElement('div');
        box.style.width = this.width + 'px';
        box.style.height = this.height + 'px';
        // box.style.backgroundColor = 'rgb(81, 209, 151)';
        box.style.background = 'url(images/mycar.png)'
        box.style.backgroundRepeat = 'no-repeat';
        box.style.backgroundPosition = 'center';
        box.style.position = 'absolute';
        this.element = box;
        parentElement.appendChild(this.element);

        return this;
    }

    this.draw = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.shiftPosition = function(x) {
        this.x += x;
        console.log(this.x);
        this.element.style.left = this.x + 'px';
    }

}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function EnemyCar(parentElement) {
    this.element = null;
    this.parentElement = parentElement;
    this.carTop = -100;
    this.laneNumber;
    var that = this;
    this.init = function() {
        this.element = document.createElement('div');
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.background = 'url(images/enemycar.png)';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.position = 'absolute';

        this.laneNumber = Math.floor(Math.random() * 3) + 1;
        // console.log('lane>> ', this.laneNumber);
        if (this.laneNumber === 1) {
            this.element.style.left = 80 + 'px'; //enemy car at lane 1 with left = 80
        } else if (this.laneNumber === 2) {
            this.element.style.left = 220 + 'px';
        } else {
            this.element.style.left = 360 + 'px';
        }

        this.parentElement.appendChild(this.element);

    }

    this.move = function() {
        console.log('move');
        this.carTop += 5;
        this.element.style.top = this.carTop + 'px';
    }
}

function Game() {
    var gameContainer;
    var road;
    var myCar;
    // var gameLoop;
    var enemyCar;
    var move = 0;
    var that = this;

    var enemyCars = [];

    this.init = function() {
        gameContainer = document.getElementById('game-container');
        myCar = new MyCar(gameContainer).init();
        myCar.draw(); //setting initial position of player car.
        this.startGame();
    }

    this.startGame = function() {
        // console.log('start');
        road = document.getElementsByClassName('road')[0];

        document.addEventListener('keydown', this.moveMyCar);

        setInterval(this.gameLoop, 15);

    }

    this.moveMyCar = function(event) {
        //left arrow
        if (event.keyCode === 37 && myCar.x != 80) {
            myCar.shiftPosition(-140); // left = 80
        }

        //right arrow
        if (event.keyCode === 39 && myCar.x != 360) {
            myCar.shiftPosition(140); // left = 360
        }
    }

    this.gameLoop = function() {
        that.moveRoad();
        that.generateObstacles();
        // that.checkCollision();
    }

    this.moveRoad = function() {
        move += 5;
        road.style.backgroundPositionY = move + 'px';

    }

    this.generateObstacles = function() {
        if (Math.abs(move) % 300 == 0) {
            console.log(move);
            enemyCar = new EnemyCar(gameContainer);
            enemyCars.push(enemyCar);
            enemyCar.init();
            console.log('enemy added', enemyCars);
        }

        //move enemy cars
        for (var i = 0; i < enemyCars.length; i++) {
            enemyCars[i].move();
        }
    }

}

new Game().init();