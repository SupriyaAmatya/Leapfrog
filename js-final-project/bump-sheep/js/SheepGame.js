function SheepGame() {

    var width = 897;
    var height = 668;

    var laneWidth = 897;
    var laneHeight = 450;

    var sX = 0;
    var sY = 0;

    var sheep; //sheep instance

    var that = this;

    this.x = 0;
    this.y = 170;

    var canvas = document.getElementById('game-container');
    var ctx = canvas.getContext('2d');

    this.init = function() {
        canvas.width = width;
        canvas.height = height;

        sheep = new Sheep(canvas, ctx, 314, 70, 5);

        that.startGame();

    }

    this.startGame = function() {
        //main loop
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(lane, sX, sY, laneWidth, laneHeight, that.x, that.y, laneWidth, laneHeight);

        sheep.init();

        ctx.drawImage(bushRight, 0, 0, 88, 565, laneWidth - 88, 103, 88, 565);
        ctx.drawImage(bushLeft, 0, 0, 88, 565, 0, 103, 88, 565);
        requestAnimationFrame(that.startGame)
    }

}

var game = new SheepGame();
lane.onload = function() {
    game.init();
}