// const { get } = require("http");

const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      signUp = document.querySelector(".signup-link"),
      lusername = document.querySelector("#lusername"),
      lpassword = document.querySelector("#lpassword"),
      sname = document.querySelector("#sname"),
      semail = document.querySelector("#semail"),
      snic = document.querySelector("#snic"),
      spassword = document.querySelector("#spassword"),
      scpassword = document.querySelector("#scpassword"),
      termCon = document.querySelector("#termCon"),
      login = document.querySelector(".login-link");

    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })

    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });










// validation javascript
    function validate() {
        console.log("validate function called");
        // Get the email and password input values
    
        // Get the error message element
        const errorMessage1 = document.querySelector(".form.login .email-error-message");
        const errorMessage2 = document.querySelector(".form.login .password-error-message");
        const signUpErrorMessage1 = document.querySelector(".form.signup .nic-error-message");
        const signUpErrorMessage2 = document.querySelector(".form.signup .confirm-error-message");
    
        // Regular expression for validating an email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the email is valid
        if (!emailPattern.test(lusername.value)) {
            errorMessage1.innerText = "Please enter a valid email address.";
            errorMessage1.style.display = "block";
            return;
        }
    
        // Check if the password is empty
        if (lpassword.value === "") {
            errorMessage2.innerText = "Please enter a password.";
            errorMessage2.style.display = "block";
            return;
        }

        if (lpassword.value.length < 6) {
            errorMessage2.innerText = "Password must be at least 6 characters long.";
            errorMessage2.style.display = "block";
            return;
        }

        getData();
    }
    



    function getData() {
        console.log("getData function called");
        var data ={
            email:lusername.value,
            password:lpassword.value,
        }
        fetch('http://localhost:8080/try2_war_exploded/passengerLogin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message === "Login successful"){
                    Swal.fire({
                        title: "Login Successful!",
                        icon: "success"
                      }).then(()=>{
                        window.location.href = "http://127.0.0.1:5501/Admin/drivers.html";
                      })
                    }
                    else if(data.message === "Wrong Password"){
                        Swal.fire({
                            title: "Invalid Username or Password!",
                            icon: "error"
                            }).then(()=>{
                                window.location.href = "http://127.0.0.1:5501/Passenger/login-register/index.html";
                            })
                    }
                    else if(data.message === "Invalid Email"){
                        Swal.fire({
                            title: "Invalid Username or Password!",
                            icon: "error"
                            }).then(()=>{
                                window.location.href = "http://127.0.0.1:5501/Passenger/login-register/index.html";
                            })
                    }
                    // window.location.href = "http://localhost:5501/Passenger/dashboard.html";
                })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    function validateSignup(){
        console.log("validate function called");

        // Get the error message element
        const errorMessage1 = document.querySelector(".form.login .email-error-message");
        const errorMessage2 = document.querySelector(".form.login .password-error-message");
        const signUpErrorMessage1 = document.querySelector(".form.signup .nic-error-message");
        const signUpErrorMessage2 = document.querySelector(".form.signup .confirm-error-message");
        
        // Regular expression for validating an email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the email is valid
        if (!emailPattern.test(semail.value)) {
            errorMessage1.innerText = "Please enter a valid email address.";
            errorMessage1.style.display = "block";
            
        }
    
        // Check if the password is empty
        else if (spassword.value === "") {
            errorMessage2.innerText = "Please enter a password.";
            errorMessage2.style.display = "block";

        }

        else if (scpassword.value.length < 6) {
            errorMessage2.innerText = "Password must be at least 6 characters long.";
            errorMessage2.style.display = "block";
            return;
        }

            // Check if the NIC is valid
        // if (!nicPattern.test(snic.value)) {
        //     signUpErrorMessage1.innerText = "Please enter a valid NIC (9 numbers followed by V or 10 numbers).";
        //     signUpErrorMessage1.style.display = "block";
        //     return;
        // }

        // Check if the confirm password matches the password
        else if (spassword.value !== scpassword.value) {
            signUpErrorMessage2.innerText = "Password and confirm password do not match.";
            signUpErrorMessage2.style.display = "block";
            return;
        }

        getDataSignup();
    }


   function getDataSignup() {
        console.log("getData function called");
        var data ={
            email:semail.value,
            password:spassword.value,
            name:sname.value,
            NIC:snic.value,
        }
        fetch('http://localhost:8080/try2_war_exploded/passengerRegister',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message === "Registration successfully"){
                    Swal.fire({
                        title: "Registration Successful!",
                        icon: "success"
                      }).then(()=>{
                        window.location.href = "http://127.0.0.1:5501/Passenger/login-register/index.html";
                        })
                    }
                    else if(data.message === "Registration unsuccessfully"){
                        Swal.fire({
                            title: "Registration unsuccessful!",
                            icon: "error"
                            }).then(()=>{
                                window.location.href = "http://127.0.0.1:5501/Passenger/login-register/index.html";
                            })
                    }
                // window.location.href = "http://localhost:5501/Passenger/dashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }