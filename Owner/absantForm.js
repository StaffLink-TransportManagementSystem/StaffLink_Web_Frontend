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
        const passengerEmail = form.querySelector('.passengerEmail').value;
        const vehicleNumber = form.querySelector('.vehicleNumber').value;
        const daysOfAbsent = form.querySelector('.daysOfAbsent').value;
        const startingDate = form.querySelector('.startingDate').value;
        const endingDate = form.querySelector('.endingDate').value;
  
          
  
        var checker = true;
          
  
        var passengerEmailError = document.querySelector(".passengerEmail-error-message");
        var vehicleNoError = document.querySelector(".vehicleNumber-error-message");
        var daysOfAbsantError = document.querySelector(".daysOfAbsant-error-message");
        var startingError = document.querySelector(".startingDate-error-message");
        var endingError = document.querySelector(".endingDate-error-message");
        // var vehicleRegNoEmailError = document.querySelector(".vehicleRegNo-error-message");
        // var driverEmailError = document.querySelector(".driverEmail-error-message");
        // var seatCountError = document.querySelector(".seatCount-error-message");
        // var startingLocationError = document.querySelector(".startingLocation-error-message");
        // var endLocationError = document.querySelector(".endLocation-error-message");
        // var vehicleTripsError = document.querySelector(".vehicleTrips-error-message");
        
        passengerEmailError.style.display = "none";
        vehicleNoError.style.display = "none";
        daysOfAbsantError.style.display = "none";
        startingError.style.display = "none";
        endingError.style.display = "none";
        
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if(!passengerEmail){
          passengerEmailError.innerText = "Please enter an email address.";
          passengerEmailError.style.display = "block";
          console.log("email error");
          checker = false;
        }
        else if (!ValidateEmail(passengerEmail)) {
          passengerEmailError.innerText = "Please enter a valid email address.";
          passengerEmailError.style.display = "block";
          console.log("email error");
          checker = false;
        }
        if(!vehicleNumber){
            vehicleNoError.innerText = "Please enter a vehicle number.";
            vehicleNoError.style.display = "block";
            console.log("vehicle number error");
            checker = false;
            }
        else if (!validateVehicleNumber(vehicleNumber)) {
            vehicleNoError.innerText = "Please enter a valid vehicle number.";
            vehicleNoError.style.display = "block";
            console.log("vehicle number error");
            checker = false;
            }

        if (!daysOfAbsent) {
          daysOfAbsantError.innerText = "Please enter count of absent days.";
          daysOfAbsantError.style.display = "block";
          console.log("Count of absent days error");
          checker = false;
        }
        if (!startingDate) {
          startingError.innerText = "Please enter a starting date.";
          startingError.style.display = "block";
          console.log("Starting date error");
          checker = false;
        }
        if (!endingDate) {
          endingError.innerText = "Please enter a ending date.";
          endingError.style.display = "block";
          console.log("ending date error");
          checker = false;
        }
        
        if(checker === true){              
          const data = {
            passengerEmail: passengerEmail,
            vehicleNo: vehicleNumber,
            daysOfAbsent: daysOfAbsent,
            startingDate: startingDate,
            endingDate: endingDate,
          };
          console.log(data);
          // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
        fetch('http://localhost:8080/try2_war_exploded/addAbsent',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },body: JSON.stringify(data),})
              .then(response => response.json())
              .then(data => {
                  console.log(data.message)
                  window.location.href = "http://127.0.0.1:5501/Owner/absentList.html";
              })
              .catch(error => {
                  console.error('Error:', error);
              });
        }
        });
        });
