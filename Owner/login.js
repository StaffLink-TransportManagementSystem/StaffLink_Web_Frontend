const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
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
        // Get the email and password input values
        const emailInput = document.querySelector(".form.login input[type='text']");
        const passwordInput = document.querySelector(".form.login input.password");
    
        // Get the error message element
        const errorMessage1 = document.querySelector(".form.login .email-error-message");
        const errorMessage2 = document.querySelector(".form.login .password-error-message");
        const signUpErrorMessage1 = document.querySelector(".form.signup .nic-error-message");
        const signUpErrorMessage2 = document.querySelector(".form.signup .confirm-error-message");
    
        // Regular expression for validating an email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if the email is valid
        if (!emailPattern.test(emailInput.value)) {
            errorMessage1.innerText = "Please enter a valid email address.";
            errorMessage1.style.display = "block";
            return;
        }
    
        // Check if the password is empty
        if (passwordInput.value === "") {
            errorMessage2.innerText = "Please enter a password.";
            errorMessage2.style.display = "block";
            return;
        }

        if (passwordInput.value.length < 6) {
            errorMessage2.innerText = "Password must be at least 6 characters long.";
            errorMessage2.style.display = "block";
            return;
        }

            // Check if the NIC is valid
        if (!nicPattern.test(nicInput.value)) {
            signUpErrorMessage1.innerText = "Please enter a valid NIC (9 numbers followed by V or 10 numbers).";
            signUpErrorMessage1.style.display = "block";
            return;
        }

        // Check if the confirm password matches the password
        if (passwordInput.value !== confirmPasswordInput.value) {
            signUpErrorMessage2.innerText = "Password and confirm password do not match.";
            signUpErrorMessage2.style.display = "block";
            return;
        }
    }
    