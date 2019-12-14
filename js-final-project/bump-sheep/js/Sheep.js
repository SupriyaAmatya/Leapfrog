function Sheep() {

    this.width;
    this.height;
    this.weight;

    var sX;
    var sY = 0;

    this.x;
    this.y;
    this.dx = 2;
    this.lane;

    var numberOfFrames = 4;
    var tickCount = 0;
    var ticksPerFrame = 5;
    var currentFrame = 0;

    var that = this;


    this.init = function(canvas, width, height, weight) {
        // if (move % 100 >= 0)
        that.width = width / numberOfFrames;
        that.height = height;
        that.weight = weight;
        that.x = canvas.width - 75;
        that.y = that.getRandomPosition();

    };

    this.getRandomPosition = function() {
        that.lane = Math.floor(Math.random() * 5) + 1;
        if (that.lane == 1) {
            return 190;
        } else if (that.lane == 2) {
            return 280;
        } else if (that.lane == 3) {
            return 370;
        } else if (that.lane == 4) {
            return 460;
        } else
            return 550;
    };

    this.getPlayerPosY = function(btnY) {

        this.posY = btnY;
        return this.posY;
    };


    this.update = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;

            if (currentFrame < numberOfFrames - 1) {
                currentFrame++;
            } else currentFrame = 0;
        }
        that.x -= that.dx;
    };

    this.draw = function(ctx) {
        sX = currentFrame * that.width;
        if (that.weight == 5) {
            ctx.drawImage(smallWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }
        if (that.weight == 10) {
            ctx.drawImage(mediumWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }
        if (that.weight == 15) {
            ctx.drawImage(largeWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }
        if (that.weight == 20) {
            ctx.drawImage(superLargeWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }
    };
}