function ImageCarousel(imageWidth, imageHeight, holdTime) {

    var carouselContainer = document.getElementById('carousel-container');
    var carouselWrapper = document.getElementById('carousel-image-wrapper');
    var images = document.getElementsByTagName('img');
    this.prevButton;
    this.nextButton;
    this.indicatorDots = [];
    this.holdTime = holdTime;
    this.imageWidth = imageWidth;
    this.imageHeigth = imageHeight;
    var step = 10;
    var imageIndex = 0;
    var left = -(imageWidth * imageIndex);
    var direction = 'left';

    this.automaticSlide = automaticSlide();
    this.addPrevButton;
    this.addNextButton;

    carouselContainer.style.width = imageWidth + 'px';
    carouselContainer.style.height = imageHeight + 'px';
    carouselWrapper.style.width = imageWidth * images.length + 'px';

    this.addPrevButton = function() {
        this.prevButton = document.createElement('button');
        carouselContainer.appendChild(this.prevButton);
        this.prevButton.style.width = '45px';
        this.prevButton.style.height = '100%';
        this.prevButton.style.position = 'absolute';
        this.prevButton.style.background = 'transparent';
        // this.prevButton.style.border = 'none';
        this.prevButton.style.cursor = 'pointer';
        this.prevButton.classList.add('prevBtn');
    }

    this.addNextButton = function() {
        this.nextButton = document.createElement('button');
        carouselContainer.appendChild(this.nextButton);
        this.nextButton.style.width = '45px';
        this.nextButton.style.height = '100%';
        this.nextButton.style.position = 'absolute';
        this.nextButton.style.background = 'transparent';
        this.nextButton.style.border = 'none';
        this.nextButton.style.cursor = 'pointer';
        this.nextButton.classList.add('nextBtn');
        console.log('hiii');

    }

    function automaticSlide() {
        var timer = setInterval(function() {
            if (direction === 'left') {
                left -= step;
                if (imageIndex == images.length - 1) {
                    left = 0;
                }

            } else {
                left += step;
                if (left < -(imageWidth * imageIndex))
                    this.direction = 'left';
            }
            carouselWrapper.style.left = left + 'px';
            imageIndex++;
            if (left > -(imageWidth * imageIndex)) {
                imageIndex = 0;
            }
            if (left % imageWidth == 0) {
                //slide delay
                clearInterval(timer);

                setTimeout(automaticSlide, holdTime);
            }
        }, 20);
    }
}

var imageCarousel1 = new ImageCarousel(800, 400, 2000);
// imageCarousel1.addNextButton();