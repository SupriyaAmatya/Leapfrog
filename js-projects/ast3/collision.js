function Box(parentElement) {
    this.width = 40;
    this.height = 40;
    this.x;
    this.y;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;
    // var speed = 2;
    this.dx = 10;
    this.dy = 10;

    this.init = function() {
        var box = document.createElement('div');
        box.style.width = this.width + 'px';
        box.style.height = this.height + 'px';
        box.style.backgroundColor = 'rgb(81, 209, 151)';
        box.style.background = 'url(images/ant-icon.png)';
        box.style.backgroundSize = 'contain';
        box.style.backgroundRepeat = 'no-repeat';
        box.style.position = 'absolute';
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = that.antKilled;

        this.draw();

        return this;
    }

    this.draw = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    this.move = function(width, height) {
        //collision with container
        if (this.x + this.dx > width - this.width || this.x + this.dx < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy > height - this.height || this.y + this.dy < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    }

    this.antKilled = function(event) {
        var clickedAnt = event.target;
        parentElement.removeChild(clickedAnt);
    }

    this.checkCollision = function(boxes) {
        for (var i = 0; i < boxes.length; i++) {
            if (this.x + this.width > boxes[i].x && this.x < boxes[i].x + boxes[i].width &&
                this.y + this.height > boxes[i].y && this.y < boxes[i].y + boxes[i].height) {
                this.dx = -this.dx;
                this.dy = -this.dy;
                boxes[i].dx = -boxes[i].dx;
                boxes[i].dy = -boxes[i].dy;
            }
        }
    }

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(parentElement, boxCount) {

    var boxes = [];
    var MAX_WIDTH = 900;
    var MAX_HEIGHT = 600;
    this.parentElement = parentElement;
    this.boxCount = boxCount;
    var that = this;

    this.startGame = function() {

        for (var i = 0; i < this.boxCount; i++) {
            var box = new Box(parentElement).init();

            var boxPosX = getRandomArbitrary(0, MAX_WIDTH - box.width);
            var boxPosY = getRandomArbitrary(0, MAX_HEIGHT - box.height);
            box.setPosition(boxPosX, boxPosY);

            for (var i = 0; i < boxes.length; i++) {
                if (boxPosX >= boxes[i].x && boxPosX <= boxes[i].x + boxes[i].width) {
                    if (boxPosY >= boxes[i].y && boxPosY <= boxes[i].y + boxes[i].height) {
                        // box.setPosition(getRandomArbitrary(0, MAX_WIDTH - box.width), getRandomArbitrary(0, MAX_HEIGHT - box.height));
                        var boxPosX = getRandomArbitrary(0, MAX_WIDTH - box.width);
                        var boxPosY = getRandomArbitrary(0, MAX_HEIGHT - box.height);
                        box.setPosition(boxPosX, boxPosY);
                    }
                }
            }
            box.draw();
            boxes.push(box);

        }
        setInterval(this.moveBoxes.bind(this), 100)
    }

    this.moveBoxes = function() {
        for (var i = 0; i < this.boxCount; i++) {
            boxes[i].move(MAX_WIDTH, MAX_HEIGHT);
            boxes[i].checkCollision(boxes);
        }
    }
}
var parentElement = document.getElementById('container');
new Game(parentElement, 15).startGame();

var boxContainer = document.getElementById('box-container');
new Game(boxContainer, 5).startGame();