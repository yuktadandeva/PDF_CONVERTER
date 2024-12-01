// handling the features-carousel
window.addEventListener('DOMContentLoaded',bindEvents);

let isLoggedIn = false;
function bindEvents(){
    handleCarousel();
    triggerUpload();
    handleLogin();
    handleSearch();
    handleHeader();
    handleExpansion();
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
        if(isLoggedIn){
        if (fileInput.files.length > 0 ) {
            window.location.href = '/PDF_CONVERTER/desktop.html'; 
        }}else{
            loginPopUp(true);  
        }
    });
    
}

function handleLogin() {
    const loginButton = document.querySelector('.login-popUp');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            loginPopUp();
        });
    } else {
        console.error("Login button (#login-atn) not found in the DOM.");
    }
}


function loginPopUp(redirectAfterLogin = false){

document.querySelector('.login-section').style.display = "block";
console.log(redirectAfterLogin+"inside loginpopup");

document.querySelector('.closeLoginPopUp').addEventListener('click', function(){
    document.querySelector('.login-section').style.display = 'none';
})

document.querySelector('#login-atn').addEventListener('click',()=> performLoginAuthentication());
}

// async
 function performLoginAuthentication(redirectAfterLogin){
    let email = document.querySelector('.email-address').value ;
    let pswd = document.querySelector('.password').value;
    
    let user = {email,pswd};
    console.log("login info", user);
    isLoggedIn = true;

    if(redirectAfterLogin){
  
            window.location.href ='/PDF_CONVERTER/desktop.html'; 
    
    }
    return;
    // try{
    //     const response = await axios.post(url,{
    //       user
    //     })
    //     if(response.status == 200){
    //         isLoggedIn = true;
    //     }else{
    //         alert("wrong credentials");
    //     }
         
    //    }catch(err){
    //     alert("error in login ", err)
    //    }
}

function handleSearch(){
    const sinp = document.querySelector('.search-input');
    const sicon = document.querySelector('.search-icon');
    const navitem = document.querySelector('.nav-item');
    const siconinp = document.querySelector('.search-icon-input');
    
    document.querySelector('.search-icon').addEventListener('click',function(){
        sinp.addEventListener('change',()=>{
            siconinp.style.display = 'none';
        })
        sinp.style.display = 'block';
        sicon.style.display = 'none';
        navitem.style.display = 'none';
        siconinp.style.display = 'block';
        sinp.addEventListener('change',()=>{
            siconinp.style.display = 'none';
        })

        document.querySelector('header').addEventListener('mouseleave',function(){
            sinp.style.display = 'none';
            sicon.style.display = 'block';
            navitem.style.display = 'flex';
            siconinp.style.display = 'none';
        })
    })
}
function handleHeader() {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach(arrow => {
      arrow.addEventListener('click', function () {
        this.classList.toggle('rotate-up');
        const dropdown = this.closest('.nav-item').querySelector('.nav-dropdown');

        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    
      });
    });
  }
  
  