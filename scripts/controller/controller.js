const globalState = {
    isLoggedIn: false,
    setLoginStatus(status) {
        this.isLoggedIn = status;
        // localStorage.setItem('isLoggedIn', JSON.stringify(status));
        console.log("Login status updated:", this.isLoggedIn);
    },
    getLoginStatus() {
        const storedStatus = localStorage.getItem('isLoggedIn');
        this.isLoggedIn = storedStatus ? JSON.parse(storedStatus) : false;
        return this.isLoggedIn;
    }
};

window.addEventListener('DOMContentLoaded',
    bindEvents);
// async
function performLoginAuthentication(){
    return new Promise((resolve, reject)=>{
    let email = document.querySelector('.email-address').value ;
    let pswd = document.querySelector('.password').value;
    
    let user = {email,pswd};
    console.log("login info", user);

    setTimeout(() => {
        if (email && pswd) {
            globalState.setLoginStatus(true);
            return resolve("Login successful");
        } else {
            globalState.setLoginStatus(false);
           return reject("Invalid credentials");
        }
    }, 1000);
    });
    
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
        if (fileInput.files.length > 0 ) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                const base64PDF = reader.result;  
                localStorage.setItem('uploadedFile', base64PDF);
                console.log('File saved in local storage');
            };
            
            reader.readAsDataURL(file);
        }

        if(globalState.isLoggedIn){
                window.location.href = '/PDF_CONVERTER/desktop.html'; 
        }else{
                console.log("login pop called by trigger upload");
                loginPopUp(); 
                console.log(globalState.isLoggedIn, "updated login status");
                if(globalState.isLoggedIn){
                    console.log(globalState.isLoggedIn, "login status inside redirecting block");
                    window.location.href = '/PDF_CONVERTER/desktop.html'; 
                }
            }
       
    
    });
    
}


async function handleLogin(){
    const loginButton = document.querySelector('.login-popUp');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            console.log("value of login by button", globalState.isLoggedIn)
            if(globalState.isLoggedIn){
                console.log("change button text");
                loginButton.innerText = "Log Out";
            }
        });
    } else {
        console.error("Login button (#login-atn) not found in the DOM.");

        try {
            await loginPopUp(); // Wait for login pop-up and authentication
            console.log(globalState.isLoggedIn, "updated login status");
            if (globalState.isLoggedIn) {
                console.log("Redirecting after successful login");
                window.location.href = '/PDF_CONVERTER/desktop.html';
            }
        } catch (error) {
            console.log("Login process canceled or failed:", error);
        }

    }
}


async function loginPopUp() {
    return new Promise((resolve, reject) => {
        document.body.style.overflow = 'hidden';
        document.querySelector('.login-section').style.display = "block";

       
        document.querySelector('.closeLoginPopUp').addEventListener('click', function () {
            document.querySelector('.login-section').style.display = 'none';
            document.body.style.overflow = 'auto';
            reject("Login pop-up closed by user");
        });

        document.querySelector('#login-atn').addEventListener('click', async () => {
            try {
                const message = await performLoginAuthentication();
                document.querySelector('.login-section').style.display = 'none';
                document.body.style.overflow = 'auto';
                console.log(message);
                resolve();
            } catch (error) {
                alert(error);
            }
        });
    });
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