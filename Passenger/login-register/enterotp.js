const errorMessage = document.querySelector(".error-message");


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var email = getParameterByName('email');

if (email) {
    document.getElementById('emailPlaceholder').textContent = email;
}




var otp = 0;

function verifyOTP() {
    otp = document.getElementById('code').value;
    executeAfterOTPVerification();
}




var otpID = ""

function executeAfterOTPVerification() {
    console.log("check");
    let row ="";

    const requestData = {
        email : email,
        otp : otp
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/confirmOTP',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
                // console.log(data.jwt)
                if(data.message == "Correct otp"){
                    if(data.message === "Correct otp"){
                        window.location.href = "changePass.html?email=" + encodeURIComponent(email);
                    }                   
                }
                if(data.message === "Wrong otp"){
                    errorMessage.innerText = "Wrong OTP";
                    errorMessage.style.display = "block";
                }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
};

