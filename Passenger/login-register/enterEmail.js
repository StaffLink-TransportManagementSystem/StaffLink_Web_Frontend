async function registeredEmail(email) {
    console.log(email);
    try {
        const response = await fetch('http://127.0.0.1:8080/try2_war_exploded/getRegisteredPassenger?email=' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        const data = await response.json();
        console.log(data.passenger);
        if (data.passenger === "Not a passenger") {
            console.log("Invalid passenger")
            return false;
        } else {
            console.log("A valid passenger")
            return true;
        }
    } catch (error) {
        console.error('Error:', error);
        return false; // Return false in case of error
    }
}

async function validate() {
    console.log("Validate function called.");

    var checker = true;

    const errorMessage = document.querySelector(".error-message");

    const isRegistered = await registeredEmail(email.value);
    if (!isRegistered) {
        errorMessage.innerText = "This email is not registered with the application.";
        errorMessage.style.display = "block";
        checker = false;
        // return;
    }

    if (checker === true) {
        sendOTP();
    }
}




function getOTP(otp, email){
    console.log(otp,email)
    var data = {
        otp : otp,
        email : email,
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOTP',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include", 
        body : JSON.stringify(data),})
        
        .then(response => response.json())

        .then(data => {
            console.log(data.message)
            if(data.message === "Stored successfully"){
                // Swal.fire({
                //     title: "Stored Successful!",
                //     icon: "success"
                // })
               
                window.location.href = "enterotp.html?email=" + encodeURIComponent(email);
            }

            else if(data.message === "Stored unsuccessful"){
                window.location.href = "enterotp.html?email=" + encodeURIComponent(email);
            }
        })

        .catch(error => {
            console.error('Error:', error);
        });
}