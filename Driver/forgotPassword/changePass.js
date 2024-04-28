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



function validate() {
    var passw1 = document.getElementById("passw1").value;
    var passw2 = document.getElementById("passw2").value;
    var errorDiv = document.querySelector(".error-message");

    if (passw1.length < 8) {
        errorDiv.textContent = "Passwords must be at least 8 characters long.";
        return false;
    }

    if (passw1 !== passw2) {
        errorDiv.textContent = "Passwords do not match.";
        return false;
    }

    errorDiv.textContent = "";

    console.log(email);
    console.log(passw1);
    storePass(email, passw1);
    alert("Password change successful!");
}




function storePass(email, passw){
    console.log(email, passw)

    var data = {
        email : email,
        password : passw,
    }

    console.log(data)

    fetch('http://127.0.0.1:8080/try2_war_exploded/changePassDriver',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include", 
        body : JSON.stringify(data),})
        
        .then(response => response.json())

        .then(data => {
            console.log(data.message)
            if(data.message === "Password is changed"){               
                window.location.href = "../login.html";
            }

            else if(data.message === "Password is not changed"){
                alert("An error occured !");
                window.location.reload();
            }
        })

        .catch(error => {
            // console.error('Error:', error);
        });
}