function newPassword(e){
    e.preventDefault();
    // alert("Password changed successfully");
    const newPass = document.getElementById("newpass").value;
    const confirmPass = document.getElementById("confirmPass").value;

    var newPassError = document.getElementById("newpass-error-message");
    var confirmPassError = document.getElementById("confirm-error-message");

    newPassError.style.display = "none";
    confirmPassError.style.display = "none";

    var checker = true;

    if(!newPass){
        newPassError.innerText = "Please enter a new password.";
        newPassError.style.display = "block";
        console.log("new password error");
        checker = false;
    }
    if(newPass.length < 6){
        newPassError.innerText = "Password must be at least 6 characters.";
        newPassError.style.display = "block";
        console.log("new password error");
        checker = false;
    }
    if(!confirmPass){
        confirmPassError.innerText = "Please confirm your password.";
        confirmPassError.style.display = "block";
        console.log("confirm password error");
        checker = false;
    }
    if(newPass !== confirmPass){
        confirmPassError.innerText = "Passwords do not match.";
        confirmPassError.style.display = "block";
        console.log("confirm password error");
        checker = false;
    }


    if(checker===true){
        Swal.fire({
            title: "Password Changed Successfully!",
            icon: "success"
          }).then(()=>{
            window.location.href = "http://127.0.0.1:5501/Owner/profile.html";
          })
        // alert("Password changed successfully");
        // window.location.href = "profile.html";
    }

}