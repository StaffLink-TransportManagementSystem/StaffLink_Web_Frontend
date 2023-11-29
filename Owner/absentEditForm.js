// const e = require("express");
function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  
  }
  
  function validateContactNumber(contactNumber) {
    // Remove any spaces or non-numeric characters
    contactNumber = contactNumber.replace(/\D/g, '');
  
    // Check if the contact number starts with '0' and has exactly 10 digits
    return /^0\d{9}$/.test(contactNumber);
  }

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const id = window.location.href.split("=")[1];

    

    // console.log(window.location.href.split("=")[1]);
    
  
    fetch("http://localhost:8080/try2_war_exploded/getAbsent?id=" + id ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id}),})
            .then(response => response.json())
            .then(data => {
                
                console.log(data.absent) 
                form.querySelector('.id').value = data.absent.id;  
                form.querySelector('.vehicleNo').value = data.absent.vehicleNo;
                form.querySelector('.name').value = data.absent.name;
                form.querySelector('.contact').value = data.absent.contact;
                form.querySelector('.email').value = data.absent.passengerEmail;
                form.querySelector('.daysOfAbsent').value = data.absent.daysOfAbsent;
                form.querySelector('.startingDate').value = data.absent.startingDate;
                form.querySelector('.endingDate').value = data.absent.endingDate;                

            })
            .catch(error => {
                console.error('Error:', error);
            });
            
    
  });


  
  function updatefunction() {

    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");
      // Get form elements
      const id = form.querySelector('.id').value;
      const vehicleNo = form.querySelector('.vehicleNo').value;
      const name = form.querySelector('.name').value;
      const contact = form.querySelector('.contact').value;    
      const email = form.querySelector('.email').value;
      const daysOfAbsant = form.querySelector('.daysOfAbsent').value;
      const startingDate = form.querySelector('.startingDate').value;
      const endingDate = form.querySelector('.endingDate').value;

      var checker = true;
          
    var idError = document.querySelector(".id-error-message");
    //   var passengerEmailError = document.querySelector(".passengerEmail-error-message");
      var vehicleNoError = document.querySelector(".vehicleNo-error-message");
      var nameError = document.querySelector(".name-error-message");
      var contactError = document.querySelector(".contact-error-message");
      var daysOfAbsantError = document.querySelector(".daysOfAbsent-error-message");
      var startingError = document.querySelector(".startingDate-error-message");
      var endingError = document.querySelector(".endingDate-error-message");
      
        idError.style.display = "none";
        // passengerEmailError.style.display = "none";
        vehicleNoError.style.display = "none";
        nameError.style.display = "none";
        contactError.style.display = "none";
        daysOfAbsantError.style.display = "none";
        startingError.style.display = "none";
        endingError.style.display = "none";
  
      const data = {
        id:id,
        vehicleNo:vehicleNo,
        name:name,
        contact:contact,
        email:email,
        daysOfAbsent:daysOfAbsant,
        startingDate:startingDate,
        endingDate:endingDate,}
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/absentEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/absentList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    );
  };

  function deletefunction() {
    const form = document.querySelector("form");
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");

      const id = form.querySelector('.id').value;
      
      const data = {
        id:id,}

  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/absentDelete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/absentList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }



  