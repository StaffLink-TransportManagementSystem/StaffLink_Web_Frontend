function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}



document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("form submitted");
      // Get form elements
      const email = form.querySelector('.email').value;
      const name = form.querySelector('.name').value;
      const NIC = form.querySelector('.NIC').value;
      const age = form.querySelector('.age').value;
      const contact = form.querySelector('.contact').value;
      const ownerEmail = form.querySelector('.ownerEmail').value;
      const password = form.querySelector('.password').value;
    //   const vehicleModel = form.querySelector('.vehicleModel').value;
    //   const regNumber = form.querySelector('.vehicleRegNo').value;
    //   const driverEmail = form.querySelector('.driverEmail').value;
    //   const seatCount = form.querySelector('.seatCount').value;
    //   const startingLocation = form.querySelector('.startingLocation').value;
    //   const endLocation = form.querySelector('.endLocation').value;
    //   const vehicleTrips = form.querySelector('.vehicle-trips').value;

        

  
      // Validate form data (You can add more validation as needed)
      if (!email ) {
        alert("Please fill in all required fields.");
      }
      else if (!name) {
        alert("Please fill in all required fields.");
      }
      else if(!NIC){
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
      else if(!password){
        alert("Please fill in all required fields.");
      }
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        email:email,
        name:name,
        NIC:NIC,
        age:age,
        contact:contact,
        ownerEmail:ownerEmail,
        password:password,
      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/driverRegister',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Admin/drivers.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  });
  