function SheepGame() {


    var width = 897;
    var height = 668;

    var bgWidth = 897;
    var bgHeight = 565;

    var sX = 0;
    var sY = 78;

    var sheep; //sheep instance

    var that = this;

    this.x = 0;
    this.y = height - bgHeight;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;

        sheep = new Sheep();

        that.startGame();

    }

    this.startGame = function() {
        //main loo
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#b5b2a0";
        ctx.fillRect(0, 0, width, 103);
        ctx.drawImage(bg, sX, sY, bgWidth, bgHeight, that.x, that.y, bgWidth, bgHeight);

        sheep.draw();

        requestAnimationFrame(that.startGame)
    }

}

var game = new SheepGame();
bg.onload = function() {
    game.init();
}