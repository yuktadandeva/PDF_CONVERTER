window.addEventListener('DOMContentLoaded',bindEvents);
function bindEvents(){
    
    handleDesktopFileInput();
}

function handleDesktopFileInput(){
    document.querySelector('.file-input-icon').addEventListener('click', ()=>{
        document.querySelector('#file-input-desktop').click();
    })
}