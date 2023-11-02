document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("form submitted");
      // Get form elements
      const ownerEmail = form.querySelector('.ownerEmail').value;
      const vehicleNumber = form.querySelector('.vehicleNumber').value;
      const vehicleType = form.querySelector('.vehicle-type').value;
      const vehicleBrand = form.querySelector('.vehicleBrand').value;
      const vehicleModel = form.querySelector('.vehicleModel').value;
      const regNumber = form.querySelector('.vehicleRegNo').value;
      const driverEmail = form.querySelector('.driverEmail').value;
      const seatCount = form.querySelector('.seatCount').value;
      const startingLocation = form.querySelector('.startingLocation').value;
      const endLocation = form.querySelector('.endLocation').value;
      const vehicleTrips = form.querySelector('.vehicle-trips').value;

        

  
      // Validate form data (You can add more validation as needed)
      if (!ownerEmail ) {
        alert("Please fill in all required fields.");
      }
      else if (!vehicleNumber) {
        alert("Please fill in all required fields.");
      }
      else if(!vehicleType){
        alert("Please fill in all required fields.");
      }
      else if(!vehicleBrand){
        alert("Please fill in all required fields.");
      }
        else if(!vehicleModel){
            alert("Please fill in all required fields.");
        }
        else if(!regNumber){
            alert("Please fill in all required fields.");
        }
        else if(!driverEmail){
            alert("Please fill in all required fields.");
        }
        else if(!seatCount){
            alert("Please fill in all required fields.");
        }
        else if(!startingLocation){
            alert("Please fill in all required fields.");
        }
        else if(!endLocation){
            alert("Please fill in all required fields.");
        }
        else if(!vehicleTrips){
            alert("Please fill in all required fields.");
        }
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        ownerEmail:ownerEmail,
        vehicleNo:vehicleNumber,
        type:vehicleType,
        vehicleBrand:vehicleBrand,
        model:vehicleModel,
        regNo:regNumber,
        driverEmail:driverEmail,
        seatsCount:seatCount,
        startingPoint:startingLocation,
        endingPoint:endLocation,
        trips:vehicleTrips,
      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/vehicleRegister',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://localhost:5501/Owner/ownerDashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  });
  