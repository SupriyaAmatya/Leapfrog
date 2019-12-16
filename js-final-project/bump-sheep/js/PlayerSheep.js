function PlayerSheep(btnY) {

    this.width;
    this.height;
    this.weight;
    this.x = 75;
    this.y = btnY + 10;
    this.dx = 2.5;
    var sX;
    var sY = 0;

    var numberOfFrames = 4;
    var tickCount = 0;
    var ticksPerFrame = 5;
    var currentFrame = 0;

    var that = this;

    this.init = function(width, height, weight) {
        that.width = width / numberOfFrames;
        that.height = height;
        that.weight = weight;
        // that.y = btnY + 10;
    };

    this.draw = function(ctx) {
        sX = currentFrame * that.width;
        if (this.weight == 5) {
            ctx.drawImage(smallBlackSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 10) {
            ctx.drawImage(mediumBlackSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 15) {
            ctx.drawImage(largeBlackSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }

        if (this.weight == 20) {
            ctx.drawImage(superLargeBlackSprite, sX, sY, that.width, that.height,
                that.x, that.y, that.width, that.height);
        }
    };

    this.update = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (currentFrame < numberOfFrames - 1) {
                currentFrame++;
            } else currentFrame = 0;
        }
        that.x += that.dx;
    }
}