function PlayerSheep(canvas, ctx, width, height, weight) {

    var numberOfFrames = 4;
    this.width = width / numberOfFrames;
    this.height = height;
    this.weight = weight;

    var sX;
    var sY = 0;
    this.x = 75;
    this.y;

    var tickCount = 0;
    var ticksPerFrame = 5;
    var currentFrame = 0;

    var that = this;

    this.init = function(btnY) {
        this.y = btnY;
        that.draw();
    }
    this.update = function() {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
            tickCount = 0;
            if (currentFrame < numberOfFrames - 1) {
                currentFrame++;
            } else currentFrame = 0;
        }
        that.x += 2;
        console.log('x=', that.x);
    }

    this.draw = function() {
        that.update();
        console.log('y', this.y);
        sX = currentFrame * that.width;
        ctx.drawImage(smallBlackSprite, sX, sY, that.width, that.height, that.x, that.y, that.width, that.height);
        console.log(smallBlackSprite);
        // if (this.weight == 5) {

        // }
    }
}