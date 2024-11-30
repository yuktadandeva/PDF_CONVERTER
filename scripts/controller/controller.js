// handling the features-carousel
window.addEventListener('DOMContentLoaded',bindEvents);
let isLoggedIn = false;
function bindEvents(){
    handleCarousel();
    triggerUpload();
    handleLogin();
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
            loginPopUp();
        }
    });
    
}

function handleLogin() {
    const loginButton = document.querySelector('.login-popUp');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the form from submitting
            loginPopUp();
        });
    } else {
        console.error("Login button (#login-atn) not found in the DOM.");
    }
}


function loginPopUp(){
document.querySelector('.login-section').style.display = "block";

document.querySelector('.closeLoginPopUp').addEventListener('click', function(){
    document.querySelector('.login-section').style.display = 'none';
})

document.querySelector('#login-atn').addEventListener('click',()=> performLoginAuthentication());
}

async function performLoginAuthentication(){
    let email = document.querySelector('.email-address').value ;
    let pswd = document.querySelector('.password').value;
    
    let user = {email,pswd};
    console.log("login info", user);
    isLoggedIn = true;
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

// event.preventDefault();