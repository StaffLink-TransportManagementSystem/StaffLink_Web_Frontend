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

function validateVehicleNumber(vehicleNumber) {
  // Remove any spaces or non-alphanumeric characters
  vehicleNumber = vehicleNumber.replace(/[^a-zA-Z0-9-]/g, '');

  // Check if the vehicle number matches either format
  return /^[A-Za-z]{3}-\d{4}$/.test(vehicleNumber) || /^[A-Za-z]{2}-\d{4}$/.test(vehicleNumber);
}

function validateContactNumber(contactNumber) {
  // Remove any spaces or non-numeric characters
  contactNumber = contactNumber.replace(/\D/g, '');

  // Check if the contact number starts with '0' and has exactly 10 digits
  return /^0\d{9}$/.test(contactNumber);
}

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

        

      var checker = true;
        

      var ownerEmailError = document.getElementById("ownerEmail-error-message");
      var vehicleNoError = document.getElementById("vehicleNo-error-message");
      var typeError = document.getElementById("type-error-message");
      var brandError = document.getElementById("brand-error-message");
      var modelError = document.getElementById("model-error-message");
      var vehicleRegNoEmailError = document.getElementById("vehicleRegNo-error-message");
      var driverEmailError = document.getElementById("driverEmail-error-message");
      var seatCountError = document.getElementById("seatCount-error-message");
      var startingLocationError = document.getElementById("startingLocation-error-message");
      var endLocationError = document.getElementById("endLocation-error-message");
      var vehicleTripsError = document.getElementById("vehicleTrips-error-message");
      // var tripError = document.querySelector(".trip-error-message");
      
      ownerEmailError.style.display = "none";
      vehicleNoError.style.display = "none";
      typeError.style.display = "none";
      brandError.style.display = "none";
      modelError.style.display = "none";
      vehicleRegNoEmailError.style.display = "none";
      driverEmailError.style.display = "none";
      seatCountError.style.display = "none";
      startingLocationError.style.display = "none";
      endLocationError.style.display = "none";
      vehicleTripsError.style.display = "none";
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if(!ownerEmail){
        ownerEmailError.innerText = "Please enter an email address.";
        ownerEmailError.style.display = "block";
        console.log("email error");
        checker = false;
      }
      else if (!ValidateEmail(ownerEmail)) {
        ownerEmailError.innerText = "Please enter a valid email address.";
        ownerEmailError.style.display = "block";
        console.log("email error");
        checker = false;
      }
      if(!driverEmail){
        driverEmailError.innerText = "Please enter an email address.";
        driverEmailError.style.display = "block";
        console.log("email error");
        checker = false;
      }
      else if (!ValidateEmail(driverEmail)) {
        driverEmailError.innerText = "Please enter a valid email address.";
        driverEmailError.style.display = "block";
        console.log("email error");
        checker = false;
      }
      if (!vehicleNumber) {
        vehicleNoError.innerText = "Please enter a vehicle number.";
        vehicleNoError.style.display = "block";
        console.log("vehicle number error");
        checker = false;
      }
      else if(validateVehicleNumber(vehicleNumber) === false){
        vehicleNoError.innerText = "Please enter a valid vehicle number.";
        vehicleNoError.style.display = "block";
        console.log("vehicle number error");
        checker = false;
      }
      if (!vehicleType) {
        typeError.innerText = "Please enter a vehicle type.";
        typeError.style.display = "block";
        console.log("vehicle type error");
        checker = false;
      }
      if (!vehicleBrand) {
        brandError.innerText = "Please enter a vehicle brand.";
        brandError.style.display = "block";
        console.log("vehicle brand error");
        checker = false;
      }
      if (!vehicleModel) {
        modelError.innerText = "Please enter a vehicle model.";
        modelError.style.display = "block";
        console.log("vehicle model error");
        checker = false;
      }
      if (!regNumber) {
        vehicleRegNoEmailError.innerText = "Please enter a vehicle registration number.";
        vehicleRegNoEmailError.style.display = "block";
        console.log("vehicle registration number error");
        checker = false;
      }
      if (!seatCount) {
        seatCountError.innerText = "Please enter a seat count.";
        seatCountError.style.display = "block";
        console.log("seat count error");
        checker = false;
      }
      if(vehicleType === "Bus" && (seatCount <= 0 || seatCount > 80)){
        seatCountError.innerText = "Please enter a valid seat count.";
        seatCountError.style.display = "block";
        console.log("seat count error");
        checker = false;
      }
      else if(vehicleType === "Van" && (seatCount <= 0 || seatCount > 15)){
        seatCountError.innerText = "Please enter a valid seat count.";
        seatCountError.style.display = "block";
        console.log("seat count error");
        checker = false;
      }
      else if(vehicleType === "Car" && (seatCount <= 0 || seatCount > 5)){
        seatCountError.innerText = "Please enter a valid seat count.";
        seatCountError.style.display = "block";
        console.log("seat count error");
        checker = false;
      }
      if (!startingLocation) {
        startingLocationError.innerText = "Please enter a starting location.";
        startingLocationError.style.display = "block";
        console.log("starting location error");
        checker = false;
      }
      if (!endLocation) {
        endLocationError.innerText = "Please enter an end location.";
        endLocationError.style.display = "block";
        console.log("end location error");
        checker = false;
      }
      if (!vehicleTrips) {
        vehicleTripsError.innerText = "Please enter vehicle trips.";
        vehicleTripsError.style.display = "block";
        console.log("vehicle trips error");
        checker = false;
      }
      if(checker === true){
        
            
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
                window.location.href = "http://127.0.0.1:5501/Owner/vehicles.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  });
  