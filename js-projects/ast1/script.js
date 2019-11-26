var carouselContainer = document.getElementById('carousel-container');
var carouselWrapper = document.getElementById('carousel-image-wrapper');
var images = document.getElementsByTagName('img');

var prevButton = document.getElementById('prevBtn');
var nextButton = document.getElementById('nextBtn');

var imageWidth = 400;
var timer;

carouselContainer.style.width = imageWidth + 'px';
carouselWrapper.style.width = imageWidth * images.length + 'px';

var imageCount = 0;
var left = -(imageWidth * imageCount);
var direction = 'left';

function slide() {
    timer = setInterval(function() {
        if (direction === 'left') {
            left -= 10;
            console.log(left);
            if (left < -(images.length - 1) * imageWidth) {

                left = -(imageWidth * (imageCount - 1));
            }
        } else {
            left += 10;
            if (left >= 0) {
                direction = 'left';
            }
        }

        carouselWrapper.style.left = left + 'px';
        imageCount++;

        if (left >= -(imageWidth * imageCount)) {
            imageCount = 0;
        }
        // console.log('left after>> ', left);
        if (left % imageWidth == 0) {
            //slide delay

            clearInterval(timer);
            setTimeout(slide, 2000);
        }
    }, 20);
}

slide();