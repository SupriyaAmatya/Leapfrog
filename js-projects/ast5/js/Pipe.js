function Pipe(bird) {
    this.bird = bird;
    this.width = 53;
    this.height = 400;
    this.gap = 120;

    this.sTopX = 553;
    this.sTopY = 0;
    this.sBottomX = 502;
    this.sBottomY = 0;

    this.image = document.getElementById("sprite");
    this.dx = 3;


    this.draw = function(ctx, pipeArray) {

        for (var i = 0; i < pipeArray.length; i++) {
            let p = pipeArray[i];
            // console.log('bottomy>> ', p.y);
            var topYPos = p.y;
            var bottomYPos = p.y + this.height + this.gap;

            //top pipe
            ctx.drawImage(this.image, this.sTopX, this.sTopY, this.width, this.height,
                p.x, topYPos, this.width, this.height);

            //bottom pipe
            ctx.drawImage(this.image, this.sBottomX, this.sBottomY, this.width, this.height,
                p.x, bottomYPos, this.width, this.height);
        }

    }

    this.update = function(pipeArray) {
        for (var i = 0; i < pipeArray.length; i++) {
            let p = pipeArray[i];
            p.x -= this.dx
        }
    }

}