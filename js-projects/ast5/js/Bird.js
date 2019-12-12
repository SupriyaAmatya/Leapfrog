function Bird(state, frames) {
    // this.state= state;
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
    this.period = 5;
    this.rotation = 0;
    DEGREE = Math.PI / 180;

    //birds animation
    this.animation = [
        { sX: 276, sY: 112 }, //1st bird
        { sX: 276, sY: 139 }, // 2nd bird
        { sX: 276, sY: 164 }, //3rd bird
        { sX: 276, sY: 139 } //2nd bird
    ];

    this.draw = function(ctx) {
        var bird = this.animation[this.frame];
        // this.frame = this.frame % this.animation.length;
        ctx.save();
        // ctx.drawImage(this.image, bird.sX, bird.sY, this.width, this.height,
        //     this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.image, bird.sX, bird.sY, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();

    }

    this.update = function() {
        this.speed += this.gravity;
        this.y += this.speed;

        //collision with base ground
        if (this.y + this.height / 2 >= 400) { // 400 = canvasHeight-baseGroundHeight
            this.y = 400 - this.height / 2;
        }

        if (state.current === state.getReady) {
            this.period = 10;
        }

        if (frames % this.period === 0) {
            this.frame += 1;
        }
        this.frame = this.frame % this.animation.length;

        // if (this.speed >= this.jump) {
        //     this.rotation = 90 * DEGREE;
        //     this.frame = 1;
        // } else {
        //     this.rotation = -25 * DEGREE;
        // }


    }

    this.flyUp = function() {
        this.speed = -this.jump;
    }

    this.reset = function() {
        this.y = 150;
        this.speed = 0;
    }
}