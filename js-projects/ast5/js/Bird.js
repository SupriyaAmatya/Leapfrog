function Bird(game) {
    this.game = game;
    console.log('hi');

    this.sX = 276;
    this.sY = 112;
    this.width = 35;
    this.height = 25;
    this.x = 50;
    this.y = 150;
    this.frame = 0; //for animation
    this.image = document.getElementById('sprite');

    this.speed = 0;
    this.gravity = 0.25;
    this.jump = 4;
    var that = this;

    //birds animation
    // this.animation = [
    //     { sX: 276, sY: 112 }, //1st bird
    //     { sX: 276, sY: 139 }, // 2nd bird
    //     { sX: 276, sY: 164 }, //3rd bird
    //     { sX: 276, sY: 139 } //2nd bird
    // ];

    this.draw = function(ctx) {
        // var bird = this.animation[this.frame];
        // this.frame = this.frame % this.animation.length;
        ctx.drawImage(this.image, this.sX, this.sY, this.width, this.height,
            this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    this.update = function() {
        this.speed += this.gravity;
        this.y += this.speed;

        //collision with base ground
        if (this.y + this.height / 2 >= 400) { // 400 = canvasHeight-baseGroundHeight
            this.y = 400 - this.height / 2;
        }

    }

    this.flyUp = function() {
        this.speed = -this.jump;
    }

    this.reset = function() {
        this.y = 150;
        this.speed = 0;
    }
}