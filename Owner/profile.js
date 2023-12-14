function validateNIC(nic) {
    // Remove any spaces or non-alphanumeric characters
    nic = nic.replace(/[^a-zA-Z0-9]/g, '');
  
    if (nic.length === 12) {
      // New NIC: Should have 10 numeric characters
      return /^\d{12}$/.test(nic);
    } else if (nic.length === 10) {
      // Old NIC: Should have 9 characters followed by 'V' or 'v'
      return /^[0-9]{9}[Vv]$/.test(nic);
    } else {
      // Invalid length
      return false;
    }
  }
  
  function ValidateEmail(input) {
  
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
  
      // alert("Valid email address!");
  
      // document.form1.text1.focus();
  
      return true;
  
    } else {
  
      // alert("Invalid email address!");
  
      // document.form1.text1.focus();
  
      return false;
  
    }
  
  }
  
  function validateContactNumber(contactNumber) {
    // Remove any spaces or non-numeric characters
    contactNumber = contactNumber.replace(/\D/g, '');
  
    // Check if the contact number starts with '0' and has exactly 10 digits
    return /^0\d{9}$/.test(contactNumber);
  }

let profilePic = document.getElementById("default-pic");
let inputFile = document.getElementById("pic");

inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}



function deletePhoto() {
    document.getElementById("default-pic").src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
}


function editAcc(e){
    e.preventDefault();
    console.log("editAcc");
    document.querySelector('.passengerName').disabled = false;
    document.querySelector('.NIC').disabled = false;
    // document.querySelector('.Telephone').disabled = false;
    document.querySelector('.edit').style.display = "none";
    document.querySelector('.save').style.display = "block";
   
}


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  // const email = window.location.href.split("=")[1];
  const email = "rhatu2000@gmail.com"

  // console.log(window.location.href.split("=")[1]);
  

  fetch("http://localhost:8080/try2_war_exploded/getOwner?email=" + email ,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },})
          .then(response => response.json())
          .then(data => {
              console.log(data.owner) 
              form.querySelector('.passengerID').value = data.owner.id;
              form.querySelector('.email').value = data.owner.email;  
              form.querySelector('.passengerName').value = data.owner.name;
              form.querySelector('.NIC').value = data.owner.NIC;
              // form.querySelector('.Telephone').value = data.owner.contact;
              
              

          })
          .catch(error => {
              console.error('Error:', error);
          });
          
  
});

function updateProfile(e){
    e.preventDefault();
    const form = document.querySelector("form"),
    sub = document.querySelector(".sub");

    const id = form.querySelector('.passengerID').value;
    const name = form.querySelector('.passengerName').value;
    const NIC = form.querySelector('.NIC').value;
    // const contact = form.querySelector('.Telephone').value;
    const email = form.querySelector('.email').value;
    // const Telephone = form.querySelector('.Telephone').value;
    // const profilePic = document.getElementById("default-pic");

    console.log("update form submitted");
    console.log(id);
    console.log(name);
    console.log(NIC);
    // console.log(Telephone);
    console.log(email);

    var checker = true;

    var nameError = document.querySelector(".name-error-message");
    var NICError = document.querySelector(".NIC-error-message");
    // var contactError = document.querySelector(".contact-error-message");
    var emailError = document.querySelector(".email-error-message");

    nameError.style.display = "none";
    NICError.style.display = "none";
    // contactError.style.display = "none";
    emailError.style.display = "none";

    if(!name){
        nameError.innerText = "Please enter your name.";
        nameError.style.display = "block";
        console.log("name error");
        checker = false;
    }
    if(!NIC){
        NICError.innerText = "Please enter your NIC.";
        NICError.style.display = "block";
        console.log("NIC error");
        checker = false;
    }
    else if(!validateNIC(NIC)){
        NICError.innerText = "Please enter a valid NIC.";
        NICError.style.display = "block";
        console.log("NIC error");
        checker = false;
    }
    // if(!Telephone){
    //     contactError.innerText = "Please enter your contact number.";
    //     contactError.style.display = "block";
    //     console.log("contact error");
    //     checker = false;
    // }
    // else if(!validateContactNumber(Telephone)){
    //     contactError.innerText = "Please enter a valid contact number.";
    //     contactError.style.display = "block";
    //     console.log("contact error");
    //     checker = false;
    // }
    if(!email){
        emailError.innerText = "Please enter your email.";
        emailError.style.display = "block";
        console.log("email error");
        checker = false;
    }
    else if(!ValidateEmail(email)){
        emailError.innerText = "Please enter a valid email.";
        emailError.style.display = "block";
        console.log("email error");
        checker = false;
    }
    if(checker === true){
        console.log("update form submitted");
        console.log(id);
        console.log(name);
        console.log(NIC);
        // console.log(Telephone);
        console.log(email);
        
        const data = {
            id: id,
            name: name,
            NIC: NIC,
            email: email,
            // profilePic: profilePic
        }
        // alert("Your profile has been updated successfully!");
        fetch('http://localhost:8080/try2_war_exploded/ownerEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if(data.message === "Update successfully"){
                  Swal.fire({
                    title: "Owner Updated Successfully!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "profile.html";
                  })
                }
                else{
                  Swal.fire({
                    title: "Something went wrong!",
                    icon: "error"
                  }).then(()=>{
                    window.location.href = "profile.html";
                  })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    }