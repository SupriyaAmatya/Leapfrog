function Sheep(canvas, ctx, width, height, weight) {

    var numberOfFrames = 4;
    this.width = width / numberOfFrames;
    this.height = height;
    this.weight = weight;

    var sX;
    var sY = 0;

    this.y;

    var tickCount;
    var ticksPerFrame;
    var currentFrame;

    var that = this;
    this.lane;

    this.init = function(move) {
        // if (move % 100 >= 0)
        console.log('white');
        tickCount = 0;
        ticksPerFrame = 5;
        currentFrame = 0;
        this.x = canvas.width - 75;
    }

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
    }
    that.y = that.getRandomPosition();


    this.update = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;

            if (currentFrame < numberOfFrames - 1) {
                currentFrame++;
            } else currentFrame = 0;
        }
        that.x -= 2;
    }

    this.draw = function() {
        that.update();
        sX = currentFrame * that.width;

        if (this.weight == 5) {
            ctx.drawImage(smallWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 10) {
            ctx.drawImage(mediumWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 15) {
            ctx.drawImage(largeWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 20) {
            ctx.drawImage(superLargeWhiteSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        // mediumWhite.draw();
        // smallWhite.draw();
    }
}