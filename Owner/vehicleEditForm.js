document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const vehicleNo = window.location.href.split("=")[1];

    // console.log(window.location.href.split("=")[1]);
    
  
    fetch("http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=" + vehicleNo ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.vehicle) 
                form.querySelector('.ownerEmail').value = data.vehicle.ownerEmail;  
                form.querySelector('.vehicleNumber').value = data.vehicle.vehicleNo;
                form.querySelector('.vehicle-type').value = data.vehicle.type;
                form.querySelector('.vehicleBrand').value = data.vehicle.vehicleBrand;
                form.querySelector('.vehicleModel').value = data.vehicle.model;
                form.querySelector('.vehicleRegNo').value = data.vehicle.regNo;
                form.querySelector('.driverEmail').value = data.vehicle.driverEmail;
                form.querySelector('.seatCount').value = data.vehicle.seatsCount;
                form.querySelector('.startingLocation').value = data.vehicle.startingPoint;
                form.querySelector('.endLocation').value = data.vehicle.endingPoint;
                form.querySelector('.vehicle-trips').value = data.vehicle.trips;
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

      var ownerEmailError = document.getElementById("ownerEmailError");
      var vehicleNumberError = document.getElementById("vehicleNumberError");
      var vehicleTypeError = document.getElementById("vehicleTypeError");
      var vehicleBrandError = document.getElementById("vehicleBrandError");
      var vehicleModelError = document.getElementById("vehicleModelError");
      var vehicleRegNoError = document.getElementById("vehicleRegNoError");
      var driverEmailError = document.getElementById("driverEmailError");
      var seatCountError = document.getElementById("seatCountError");
      var startingLocationError = document.getElementById("startingLocationError");
      var endLocationError = document.getElementById("endLocationError");
      var vehicleTripsError = document.getElementById("vehicleTripsError");

        

  
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
      fetch('http://127.0.0.1:8080/try2_war_exploded/vehicleEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include", body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message==="Update successfully"){
                  Swal.fire({
                    title: "Vehicle Updated Successfully!",
                    icon: "success"
                  }).then(()=>{window.location.href = "vehicles.html";
                })
              }
              else{
                Swal.fire({
                  title: "Vehicle Update Failed!",
                  icon: "error"
                }).then(()=>{window.location.href = "vehicles.html";
              })
            }
                // window.location.href = "http://127.0.0.1:5501/Owner/vehicles.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  };

  function deletefunction() {

    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");

      const vehicleNumber = form.querySelector('.vehicleNumber').value;
      
      const data = {
        vehicleNo:vehicleNumber,}

  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://127.0.0.1:8080/try2_war_exploded/vehicleDelete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include", body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message==="Delete successfully"){
                  Swal.fire({
                    title: "Vehicle Deleted Successfully!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "vehicles.html";
                  })
                }
                else{
                  Swal.fire({
                    title: "Vehicle Delete Failed!",
                    icon: "error"
                  }).then(()=>{
                    window.location.href = "vehicles.html";
                  })
                }
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    );
  };



  