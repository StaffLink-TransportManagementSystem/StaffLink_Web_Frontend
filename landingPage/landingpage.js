const email = document.querySelector(".email"),
      username = document.querySelector(".name"),
      message = document.querySelector(".message");


function validate(){
    console.log("Validate function called.");

    const errorMessage = document.querySelector(".onl-contact .error-message");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var checker = true;

    if(!emailPattern.test(email.value) || username.value === "" || email.value === "" || message.value === ""){
        errorMessage.innerText = "Invalid email or unfilled fields.";
        errorMessage.style.display = "block";
        checker = false;
    }

    if(checker){
        getMessage();
    }
}


function getMessage(){
    console.log("getMessage function called.");

    var data = {
        email : email.value,
        name : username.value,
        message : message.value,
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/onlineInquiry',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : "include", 
        body : JSON.stringify(data),})
        
        .then(response => response.json())

        .then(data => {
            console.log(data.message)
            if(data.message === "Registration successfully"){
                Swal.fire({
                    title: "Registration Successful!",
                    icon: "success"
                }).then(()=>{
                    window.location.href = "index.html";
                    })
            }

            else if(data.message === "Registration unsuccessfully"){
                Swal.fire({
                    title: "Registration unsuccessful!",
                    icon: "error"
                }).then(()=>{
                        window.location.href = "index.html";
                    })
            }
        })

        .catch(error => {
            console.error('Error:', error);
        });
}