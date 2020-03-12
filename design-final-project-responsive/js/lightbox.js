let lightBoxContainer = document.querySelector(".lightbox");
let close = document.querySelector('.lightbox-close');
let lightBoxImage = document.querySelector('.lightbox-img');
let itemsHolder = document.querySelector('.items-holder').children;
let title = document.querySelector('.lightbox-heading');
let description = document.querySelector('.mockup-description p');
let price = document.querySelector('.price');

let index;
let imgSrc;

lightBoxContainer.addEventListener('click', function(event){
    // console.log(event.target);
    if(event.target == close){
        lightBox();
    }
})

for(let i = 0; i<itemsHolder.length; i++){
    itemsHolder[i].querySelector('.eye').addEventListener('click', function(){
        index = i;
        changeImage();
        lightBox();
    });
}

function next(){
    if(index == itemsHolder.length-1){
        index = 0;
    }else{
        index++;
    }
    changeImage();
}

function prev(){
    if(index == 0){
        index = itemsHolder.length-1;
    }else{
        index--;
    }
    changeImage();
}

function lightBox(){
    lightBoxContainer.classList.toggle("open");
}

function changeImage(){
    imgSrc = itemsHolder[index].querySelector('img').getAttribute('src');
    lightBoxImage.src = imgSrc;
    title.innerHTML = itemsHolder[index].querySelector('h3').innerHTML;
    description.innerHTML =itemsHolder[index].querySelector('p').innerHTML;
    
}