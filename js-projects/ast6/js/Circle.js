function Circle(ctx) {
    this.radius = 10;
    this.radiusAmp = 10;
    this.x = 0;
    this.y = 0;

    this.currentX;
    this.currentY;

    var move = 0;
    var that = this;
    this.phase = 0;
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    //animation
    this.moveCircle = function() {
        move += 0.1;
        this.y = Math.sin(move) * 50 + this.currentY;
        this.x = Math.cos(move) * 5 + this.currentX;
        this.radius = Math.cos(move) * this.radiusAmp / 2 + this.radiusAmp / 2;

        frames++;
    }
}