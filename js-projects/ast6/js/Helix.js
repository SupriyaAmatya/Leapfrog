function Helix(canvas, ctx, row, col) {
    canvas.width = 540;
    canvas.height = 500;
    var that = this;

    this.row = row;
    this.col = col;

    var circleArray = [];

    this.x = 20;
    this.y = 80;
    this.gap = 30;

    this.init = function() {
        that.generateCircles();
        that.helixLoop();
    }

    this.drawCanvas = function() {
        ctx.fillStyle = "#000023";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffff';
        ctx.font = "30px Arial";
        ctx.lineWidth = 50;
        ctx.fillText('Helix Animation', 200, 40);

    }

    this.generateCircles = function() {
        var currentPosY = this.y;

        for (var i = 0; i < this.row; i++) {
            currentPosY += that.gap;

            var currentPosX = this.x;
            var phaseIncrease = 5;
            var currentPhase = 0;
            for (var j = 0; j < this.col; j++) {
                var circle = new Circle(ctx);
                circle.x = currentPosX += this.gap;
                circle.y = currentPosY;
                circle.currentY = currentPosY;
                circle.currentX = currentPosX;

                circleArray.push(circle);

            }
        }
    }

    this.helixLoop = function() {
        that.drawCanvas();

        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].draw();
            circleArray[i].moveCircle();
        }

        requestAnimationFrame(that.helixLoop);
    }

}

var canvas1 = document.getElementById('helix-container');
var ctx1 = canvas1.getContext('2d');
var helix1 = new Helix(canvas1, ctx1, 10, 15).init();

var canvas2 = document.getElementById('helix-container2');
var ctx2 = canvas2.getContext('2d');
var helix2 = new Helix(canvas2, ctx2, 4, 6).init();