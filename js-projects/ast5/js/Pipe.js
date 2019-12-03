function Pipe() {
    this.width = 53;
    this.height = 400;
    this.gap = 85;

    this.sTopX = 552;
    this.sTopY = 0;
    this.sBottomX = 502;
    this.sBottomY = 0;

    this.image = document.getElementById("sprite");
    this.dx = 3;


    this.draw = function(ctx, pipeArray) {
        for (var i = 0; i < pipeArray.length; i++) {
            var topYPos = pipeArray[i].y;
            var bottomYPos = pipeArray[i].y + this.height + this.gap;
            console.log(pipeArray[i].x);
            //top pips
            ctx.drawImage(this.image, this.sTopX, this.sTopY, this.width, this.height,
                pipeArray[i].x, topYPos, this.width, this.height);

            //bottom pipe
            ctx.drawImage(this.image, this.sBottomX, this.sBottomY, this.width, this.height,
                pipeArray[i].x, bottomYPos, this.width, this.height);
        }

    }

    this.update = function(pipeArray) {
        for (var i = 0; i < pipeArray.length; i++) {
            console.log(pipeArray.length);
            pipeArray[i].x = -this.dx
        }
    }
}