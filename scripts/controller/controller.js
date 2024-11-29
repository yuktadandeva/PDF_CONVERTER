// handling the features-carousel
window.addEventListener('DOMContentLoaded',bindEvents);

function bindEvents(){
    handleCarousel();
    triggerUpload();
}

function handleCarousel(){
    // adding event listener
    const toolDivs = document.querySelectorAll('.tool-carousel-atn');
    const carouselInner = document.querySelector('.carousel-inner');

    function goToSlide(idx){
        carouselInner.style.transform = `translateX(-${idx * 100}%)`;
    }

    toolDivs.forEach((div,idx )=> {
        div.addEventListener('mouseenter',function(){goToSlide(idx)});
    });

    goToSlide(0);
}

function triggerUpload(){
    document.querySelector('.triggerUpload').addEventListener('click', function(){
        document.querySelector('.inputToBeTriggered').click();
    })
}