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

function Game() {
    var gameContainer;
    var road;
    var myCar;
    // var gameLoop;
    var enemyCar;
    var move = 0;
    var that = this;

    this.init = function() {
        var left = 500 - (this.width / 2);
        var bottom = 0;
        gameContainer = document.getElementById('game-container');
        myCar = new MyCar(gameContainer).init();
        myCar.draw(); //setting initial position of car.
        this.startGame();
    }

    this.startGame = function() {
        console.log('start');
        road = document.getElementsByClassName('road')[0];

        document.addEventListener('keydown', this.moveMyCar);

        setInterval(this.gameLoop, 10);

    }

    this.moveMyCar = function(event) {
        //left arrow
        if (event.keyCode === 37 && myCar.x != 80) {
            myCar.shiftPosition(-140); // left = 40
        }

        //right arrow
        if (event.keyCode === 39 && myCar.x != 360) {
            myCar.shiftPosition(140); // left = 400
        }
    }

    this.gameLoop = function() {
        console.log('hiiiii');
        that.moveRoad();
    }

    this.moveRoad = function() {
        move += 5;
        road.style.backgroundPositionY = move + 'px';
    }

}

new Game().init();