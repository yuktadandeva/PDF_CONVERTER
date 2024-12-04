

export async function performLoginAuthentication(){
    return new Promise((resolve, reject)=>{
        let email = document.querySelector('#email-address').value ;
        let pswd = document.querySelector('#password').value;
    
        let user = { email, pswd };
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