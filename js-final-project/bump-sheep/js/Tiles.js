function Tiles() {
    this.type;
    this.sX;
    this.sY = 0;
    this.x;
    this.y;
    this.width = 90;
    this.height = 90;

    var that = this;

    this.tile1 = function() {
        this.type = 1;
        that.sX = 0;
    }

    this.tile2 = function() {
        this.type = 2;
        that.sX = 1 * that.width;
    }

    this.tile3 = function() {
        this.type = 3;
        that.sX = 2 * that.width;
    }

    this.tile4 = function() {
        this.type = 4;
        that.sX = 3 * that.width;
    }
    this.tile5 = function() {
        this.type = 5;
        that.sX = 0;
    }

    this.draw = function(ctx) {
        ctx.drawImage(tiles, that.sX, that.sY, that.width, that.height, that.x, that.y, that.width, that.height);
    }
}