const globalState = {
    isLoggedIn: false,
    setLoginStatus(status) {
        this.isLoggedIn = status;
        localStorage.setItem('isLoggedIn', JSON.stringify(status));
        console.log("Login status updated:", this.isLoggedIn);
    },
    getLoginStatus() {
        const storedStatus = localStorage.getItem('isLoggedIn');
        this.isLoggedIn = storedStatus ? JSON.parse(storedStatus) : false;
        return this.isLoggedIn;
    }
};

window.addEventListener('DOMContentLoaded',()=>{
   
    bindEvents()});
// async
function performLoginAuthentication(){
    let email = document.querySelector('.email-address').value ;
    let pswd = document.querySelector('.password').value;
    
    let user = {email,pswd};
    console.log("login info", user);

    globalState.setLoginStatus(true);
    
    
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
        console.log("file inp", fileInput.files[0])
        if(globalState.isLoggedIn){
        if (fileInput.files.length > 0 ) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64PDF = reader.result;  
                localStorage.setItem('uploadedFile', base64PDF);
                console.log('File saved in local storage');
            };
            
            reader.readAsDataURL(file); 
            window.location.href = '/PDF_CONVERTER/desktop.html'; 
        }
    }else{
            loginPopUp(); 
            if(globalState.isLoggedIn){
                window.location.href = '/PDF_CONVERTER/desktop.html'; 
            }
        }
    });
    
}


function handleLogin() {
    const loginButton = document.querySelector('.login-popUp');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            loginPopUp();
            if(globalState.isLoggedIn){
                // loginButton.innerText = "Log Out";
            }
        });
    } else {
        console.error("Login button (#login-atn) not found in the DOM.");
    }
}


function loginPopUp(){

    document.body.style.overflow = 'hidden'; 
document.querySelector('.login-section').style.display = "block";

document.querySelector('.closeLoginPopUp').addEventListener('click', function(){
    document.querySelector('.login-section').style.display = 'none';
    document.body.style.overflow = 'auto'; 
})

document.querySelector('#login-atn').addEventListener('click',()=> performLoginAuthentication());
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
  
  function handleExpansion(){
    const items = document.querySelectorAll('.carousel-item');

items.forEach(item => {
  item.addEventListener('mouseover', () => {
    items.forEach(i => i.classList.remove('expanded')); 
    item.classList.add('expanded'); 
  });
});

document.querySelector('.carousel-item').classList.add('expanded');

  }

  function bindEvents(){
    handleCarousel();
    triggerUpload();
    handleLogin();
    handleSearch();
    handleHeader();
    handleExpansion();
}