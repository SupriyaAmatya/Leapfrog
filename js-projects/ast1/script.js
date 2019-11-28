var carouselContainer = document.getElementById('carousel-container');
var carouselWrapper = document.getElementById('carousel-image-wrapper');
var images = document.getElementsByTagName('img');

var prevButton = document.getElementById('prevBtn');
var nextButton = document.getElementById('nextBtn');

var indicatorDots = [];

var imageWidth = 800;
var imageHeigth = 400;
var timer;
var step = 10;
var imageIndex = 0;
var left = -(imageWidth * imageIndex);
var direction = 'left';

carouselContainer.style.width = imageWidth + 'px';
carouselContainer.style.height = imageHeigth + 'px';
carouselWrapper.style.width = imageWidth * images.length + 'px';

for (var i = 0; i < images.length; i++) {
    indicatorDots[i] = document.createElement('div');
    indicatorDots[i].style.position = 'absolute';
    indicatorDots[i].style.width = '20px';
    indicatorDots[i].style.height = '20px';
    indicatorDots[i].style.borderRadius = '50%';
    indicatorDots[i].style.background = 'black';
    indicatorDots[i].style.left = 400 + (i * 30) + 'px';
    indicatorDots[i].style.bottom = '2px';

    carouselContainer.appendChild(indicatorDots[i]);
}

function setIndicatorDots() {
    indicatorDots.onclick = showCurrentSLide();
}


nextButton.onclick = showNext;
prevButton.onclick = showPrev;


function showNext() {

    // debugger;
    direction = 'left';
    var nextTimer = setInterval(function() {
        // debugger;
        console.log(imageIndex);
        left -= step;
        if (imageIndex > images.length - 1) {
            // if (left < -(images.length - 0) * imageWidth) {
            left = 0;
        }
        carouselWrapper.style.left = left + 'px';
        if (left % imageWidth == 0) {
            //slide delay
            clearInterval(nextTimer);
            setTimeout(showNext, 2000);
        }
    }, 15);
    imageIndex++;
}

function showPrev() {
    direction = 'right';
    var prevTimer = setInterval(function() {
        left += step;
        carouselWrapper.style.left = left + 'px';
        imageIndex++;

        if (left >= -(imageWidth * imageIndex)) {
            imageIndex = 0;
        } else {
            clearInterval(prevTimer);

        }
    }, 15)
}


function slideShow() {

    timer = setInterval(function() {
        if (direction === 'left') {
            console.log(imageIndex);
            left -= step;
            if (imageIndex > images.length - 1) {
                imageIndex = 0;
                left = 0;
            }
        } else {
            left += step;
            if (left < -(imageWidth * imageIndex))
                direction = 'left';
        }
        carouselWrapper.style.left = left + 'px';

        if (left % imageWidth == 0) {
            //slide delay
            clearInterval(timer);
            setTimeout(slideShow, 2000);
        }
    }, 20);
    imageIndex++;
}

slideShow();