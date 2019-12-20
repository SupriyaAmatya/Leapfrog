function GoButton(ctx, i) {
    this.btnWidth = 76;
    this.btnHeight = 76;
    this.btnX = 45;
    this.i = i;
    this.btnY = 180 + 90 * this.i;

    this.draw = function() {
        ctx.drawImage(buttonImg, 0, 0, this.btnWidth, this.btnHeight, this.btnX, this.btnY, this.btnWidth, this.btnHeight);
    };
}