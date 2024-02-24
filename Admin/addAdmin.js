function validateSignup(){
    console.log("validate function called");
    var fname = document.getElementsByClassName("fnameAdmin")[0].value;
    var lname = document.getElementsByClassName("lnameAdmin")[0].value;
    var email = document.getElementsByClassName("emailAdmin")[0].value;
    var contact = document.getElementsByClassName("teleAdmin")[0].value;
    var password = document.getElementsByClassName("passwordAdmin")[0].value;

    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(contact);
    console.log(password);


    // Get the error message element
    var fnameError = document.querySelector(".fname-error-message");
    var lnameError = document.querySelector(".lname-error-message");
    var emailError = document.querySelector(".email-error-message");
    var contactError = document.querySelector(".contact-error-message");
    var passwordError = document.querySelector(".password-error-message");
    
    // Regular expression for validating an email address
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var checker = true;
    // Check if the name is empty
    if (fname == "") {
        fnameError.innerText = "Please enter your first name.";
        fnameError.style.display = "block";
        checker = false;
    }

    if (lname == "") {
        lnameError.innerText = "Please enter your last name.";
        lnameError.style.display = "block";
        checker = false;
    }

    if (email == "") {
        emailError.innerText = "Please enter your email address.";
        emailError.style.display = "block";
        checker = false;
    }

    if (contact == "") {
        contactError.innerText = "Please enter your contact number.";
        contactError.style.display = "block";
        checker = false;
    }

    if (password == "") {
        passwordError.innerText = "Please enter your password.";
        passwordError.style.display = "block";
        checker = false;
    }

    // if (!emailPattern.test(email)) {
    //     emailError.innerText = "Please enter a valid email address.";
    //     emailError.style.display = "block";
    //     checker = false;            
    // }

    // else if(password.length < 6){
    //     passwordError.innerText = "Password must be at least 6 characters long.";
    //     passwordError.style.display = "block";
    //     checker = false;
    // }
    if(checker){
        getDataSignup();
    }

    // getDataSignup();
}


function getDataSignup() {
    console.log("getData function called");
    var fname = document.getElementsByClassName("fnameAdmin")[0].value;
    var lname = document.getElementsByClassName("lnameAdmin")[0].value;
    var email = document.getElementsByClassName("emailAdmin")[0].value;
    var contact = document.getElementsByClassName("teleAdmin")[0].value;
    var password = document.getElementsByClassName("passwordAdmin")[0].value;

    var data ={
        name: fname + " " + lname,
        email: email,
        contactNo: contact,
        password: password
    }
    fetch('http://127.0.0.1:8080/try2_war_exploded/adminRegister',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(data), credentials: "include",})
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            if(data.message == "Registration successful"){
                window.location.href = "dashboard.html";
            }
            // window.location.href = "dashboard.html";
            // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function cancel(){
    window.location.href = "dashboard.html";
}