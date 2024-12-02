window.addEventListener('DOMContentLoaded',bindEvents);
function bindEvents(){
    
    handleDesktopFileInput();
}

export function handleDesktopFileInput(file){
    console.log(file);
    document.querySelector('.file-input-icon').addEventListener('click', ()=>{
        document.querySelector('#file-input-desktop').click();
    })
}