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
    const uploadButton = document.querySelector('.triggerUpload');
    const fileInput = document.querySelector('.inputToBeTriggered');
    uploadButton.addEventListener('click', function(){
        document.querySelector('.inputToBeTriggered').click();
    })

    fileInput.addEventListener('change', function(){
        if (fileInput.files.length > 0) {
            // Redirect after file upload
            window.location.href = ''; // Replace with your desired URL
        }
    });
    
}