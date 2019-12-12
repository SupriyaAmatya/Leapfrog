function Sheep(canvas, ctx, width, height, weight) {

    var numberOfFrames = 4;
    this.width = width / numberOfFrames;
    this.height = height;
    this.weight = weight;

    var sX;
    var sY = 0;
    this.x = canvas.width - 75;
    this.y = 170;

    var tickCount = 0;
    var ticksPerFrame = 5;


    var currentFrame = 0;
    var that = this;

    this.lane;

    // var smallWhite = {
    //     width: 314 / numberOfFrames,
    //     height: 70,
    //     weight: 5,
    //     draw: function() {
    //         sX = currentFrame * smallWhite.width;
    //         ctx.drawImage(smallWhiteSprite, sX, sY, this.width, this.height, that.x, that.y, this.width, this.height);
    //     }
    // }

    this.init = function() {
        that.draw();
    }

    this.getRandomPosition = function() {
        that.lane = Math.floor(Math.random() * 5) + 1;
        if (that.lane == 1) {
            return 170;
        } else if (that.lane == 2) {
            return 260;
        } else if (that.lane == 3) {
            return 350;
        } else if (that.lane == 4) {
            return 440;
        } else
            return 530;
    }

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
        ctx.drawImage(smallWhiteSprite, sX, sY, this.width, this.height, that.x, that.y, this.width, this.height);
        // mediumWhite.draw();
        // smallWhite.draw();
    }
}