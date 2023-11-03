document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const email = window.location.href.split("=")[1];

    // console.log(window.location.href.split("=")[1]);
    
  
    fetch("http://localhost:8080/try2_war_exploded/getPassenger?email=" + email ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data.passenger) 
                form.querySelector('.name').value = data.passenger.name;  
                form.querySelector('.email').value = data.passenger.email;
                form.querySelector('.NIC').value = data.passenger.NIC;
                
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
      // const password = form.querySelector('.password').value;       

  
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
      // else if(!password){
      //   alert("Please fill in all required fields.");
      // }
       
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        name:name,
        email:email,
        NIC:NIC,
        
      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/passengerEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Admin/passengerLIst.html";
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
      fetch('http://localhost:8080/try2_war_exploded/passengerDelete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Admin/passengerLIst.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }



  