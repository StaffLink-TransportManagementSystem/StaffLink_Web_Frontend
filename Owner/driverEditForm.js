const e = require("express");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const email = window.location.href.split("=")[1];

    // console.log(window.locat ion.href.split("=")[1]);
    
  
    fetch("http://localhost:8080/try2_war_exploded/getDriver?email=" + email ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data.driver) 
                form.querySelector('.email').value = data.driver.email;  
                form.querySelector('.name').value = data.driver.name;
                form.querySelector('.NIC').value = data.passenger.NIC;
                form.querySelector('.age').value = data.passenger.age;
                form.querySelector('.contact').value = data.passenger.contact;
                form.querySelector('.ownerEmail').value = data.passenger.ownerEmail;

                
                // form.querySelector('.vehicleTrips').value = data.vehicle.trips;
                

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
      const name = form.querySelector('.name').value;
      const email = form.querySelector('.email').value;
      const NIC = form.querySelector('.NIC').value;
      const password = form.querySelector('.password').value;    
      const age = form.querySelector('.age').value;
      const contact = form.querySelector('.contact').value;
      const ownerEmail = form.querySelector('.ownerEmail').value;


  
      // Validate form data (You can add more validation as needed)
      if (!name ) {
        alert("Please fill in all required fields.");
      }
      else if (!email) {
        alert("Please fill in all required fields.");
      }
      else if(!NIC){
        alert("Please fill in all required fields.");
      }
      else if(!password){
        alert("Please fill in all required fields.");
      }
      else if(!age){
        alert("Please fill in all required fields.");
        }
        else if(!contact){
            alert("Please fill in all required fields.");
            }
        else if(!ownerEmail){
            alert("Please fill in all required fields.");
            }
       
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        name:name,
        email:email,
        NIC:NIC,
        password:password,
        age:age,
        contact:contact,
        ownerEmail:ownerEmail,

      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/driverEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/ownerDashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  };

  function deletefunction() {
    const form = document.querySelector("form");
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");

      const email = form.querySelector('.email').value;
      
      const data = {
        email:email,}

  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/driverDelete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/ownerDashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }



  