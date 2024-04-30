var starting_latitude;
var starting_longitude;
var ending_latitude;
var ending_longitude;

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



function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } 
  else {
    return false;
  }
}




function usedVehicleNumber(vehicleNumber) {
  console.log(vehicleNumber);
  fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=' + vehicleNumber, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },credentials: "include",
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      if (data.message === "No vehicle") {
        return false;
      }
      else {
        return true;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}



document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form"),
    sub = document.querySelector(".sub");

  function getPayload(token) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  function checkCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split("; ");
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });
    return res;
  }

  console.log(checkCookie("jwt"))

  const token = checkCookie("jwt");
  const payload = getPayload(token);
  console.log("Payload", payload);

  let owner = payload.id;

  // form.querySelector('.ownerEmail').value = owner;
});

  // sub.addEventListener("click", () => {
function addVehicle(){
    //   event.preventDefault(); // Prevent the default form submission
    console.log("form submitted");
    // Get form elements
    const ownerEmail = document.querySelector('.ownerEmail').value;
    const vehicleNumber = document.querySelector('.vehicleNumber').value;
    const vehicleType = document.querySelector('.vehicle-type').value;
    const vehicleBrand = document.querySelector('.vehicleBrand').value;
    const vehicleModel = document.querySelector('.vehicleModel').value;
    const driverEmail = document.querySelector('.driverEmail').value;
    const seatCount = document.querySelector('.seatCount').value;
    const startingLocation = document.querySelector('.startingLocation').value;
    const endLocation = document.querySelector('.endingLocation').value;
    const vehicleTrips = document.querySelector('.vehicleTrips').value;
    const insideImage = document.querySelector('.insideImage').value;
    const outsideImage = document.querySelector('.outsideImage').value;
    const insuranceImage = document.querySelector('.insuranceImage').value;
    const revenueLicenseImage = document.querySelector('.revenueLicenseImage').value;
    const vehicleRegistrationImage = document.querySelector('.vehicleRegistrationImage').value;

    var ownerEmailError = document.getElementById("ownerEmail-error-message");
    var driverEmailError = document.getElementById("driverEmail-error-message");
    var vehicleNoError = document.getElementById("vehicleNo-error-message");
    var typeError = document.getElementById("type-error-message");
    var brandError = document.getElementById("brand-error-message");
    var modelError = document.getElementById("model-error-message");
    var seatCountError = document.getElementById("seatCount-error-message");
    var startingLocationError = document.getElementById("startingLocation-error-message");
    var endLocationError = document.getElementById("endingLocation-error-message");
    var vehicleTripsError = document.getElementById("vehicleTrips-error-message");
    var photoError = document.getElementById("photo-error-message");

    ownerEmailError.style.display = "none";
    driverEmailError.style.display = "none";
    vehicleNoError.style.display = "none";
    typeError.style.display = "none";
    brandError.style.display = "none";
    modelError.style.display = "none";
    seatCountError.style.display = "none";
    startingLocationError.style.display = "none";
    endLocationError.style.display = "none";
    vehicleTripsError.style.display = "none";
    photoError.style.display = "none";

    console.log("ownerEmail", ownerEmail);
    console.log("vehicleNumber", vehicleNumber);
    console.log("vehicleType", vehicleType);
    console.log("vehicleBrand", vehicleBrand);
    console.log("vehicleModel", vehicleModel);
    console.log("driverEmail", driverEmail);
    console.log("seatCount", seatCount);
    console.log("startingLocation", startingLocation);
    console.log("endLocation", endLocation);
    console.log("vehicleTrips", vehicleTrips);
    console.log("insideImage", insideImage);
    console.log("outsideImage", outsideImage);
    console.log("insuranceImage", insuranceImage);
    console.log("revenueLicenseImage", revenueLicenseImage);
    console.log("vehicleRegistrationImage", vehicleRegistrationImage);
    

    var checker = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!ownerEmail) {
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
    if (!driverEmail) {
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
    else if (validateVehicleNumber(vehicleNumber) === false) {
      vehicleNoError.innerText = "Please enter a valid vehicle number.";
      vehicleNoError.style.display = "block";
      console.log("vehicle number error");
      checker = false;
    }
    else if (usedVehicleNumber(vehicleNumber) === true) {
      vehicleNoError.innerText = "This vehicle number is already registered.";
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
    // if (!regNumber) {
    //   vehicleRegNoEmailError.innerText = "Please enter a vehicle registration number.";
    //   vehicleRegNoEmailError.style.display = "block";
    //   console.log("vehicle registration number error");
    //   checker = false;
    // }
    if (!seatCount) {
      seatCountError.innerText = "Please enter a seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    if (vehicleType === "Bus" && (seatCount <= 0 || seatCount > 80)) {
      seatCountError.innerText = "Please enter a valid seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    else if (vehicleType === "Van" && (seatCount <= 0 || seatCount > 15)) {
      seatCountError.innerText = "Please enter a valid seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    else if (vehicleType === "Car" && (seatCount <= 0 || seatCount > 5)) {
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
    if (!insideImage || !outsideImage || !insuranceImage || !revenueLicenseImage || !vehicleRegistrationImage) {
      photoError.innerText = "Please upload all the required images.";
      photoError.style.display = "block";
      console.log("photo error");
      checker = false;
    }
    
    if (checker == true) {


      const data = {
        ownerEmail: ownerEmail,
        vehicleNo: vehicleNumber,
        type: vehicleType,
        brand: vehicleBrand,
        model: vehicleModel,
        driverEmail: driverEmail,
        seatCount: seatCount,
        startingLatitude: starting_latitude,
        startingLongitude:starting_longitude,
        endingLatitude: ending_latitude,
        endingLongitude: ending_longitude,
        trips: vehicleTrips,
        insideImage: insideImage,
        outsideImage: outsideImage,
        insuranceImage: insuranceImage,
        revenueLicenseImage: revenueLicenseImage,
        vehicleRegistrationImage: vehicleRegistrationImage
      };

      console.log(data);

      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://127.0.0.1:8080/try2_war_exploded/vehicleRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },credentials: "include", body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.message === "Registration successfully") {
            Swal.fire({
              title: "Vehicle Registered Successfully!",
              icon: "success"
            }).then(() => {
              window.location.href = "vehicles.html";
            })
          }
          else {
            Swal.fire({
              title: "Vehicle Registration Failed!",
              icon: "error"
            }).then(() => {
              window.location.href = "vehicles.html";
            })
          }
          // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  
    }

    document.addEventListener("DOMContentLoaded", function () {
      // Initialize Autocomplete for starting and ending points
      var startingInput = document.getElementById('startingLocation');
      var endingInput = document.getElementById('endingLocation');
      
      var options = {
          types: ['geocode'] // Return only geocoding results, rather than business results.
      };
  
      var startingAutocomplete = new google.maps.places.Autocomplete(startingInput, options);
      var endingAutocomplete = new google.maps.places.Autocomplete(endingInput, options);
      
      // Event listeners for selecting a suggested location
      startingAutocomplete.addListener('place_changed', function () {
          var place = startingAutocomplete.getPlace();
          if (place.geometry) {
              var startingCoords = {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
              };
              starting_latitude = place.geometry.location.lat();
              starting_longitude = place.geometry.location.lng();
              document.getElementById('startingLatitude').value = starting_latitude;
              document.getElementById('startingLongitude').value = starting_longitude;


              console.log("Starting Coordinates:", startingCoords);
          } else {
              console.log("Location not found for starting point.");
          }
      });
  
      endingAutocomplete.addListener('place_changed', function () {
          var place = endingAutocomplete.getPlace();
          if (place.geometry) {
              var endingCoords = {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
              };
              ending_latitude = place.geometry.location.lat();
              ending_longitude = place.geometry.location.lng();
              document.getElementById('endingLatitude').value = ending_latitude;
              document.getElementById('endingLongitude').value = ending_longitude;

              console.log("Ending Coordinates:", endingCoords);
          } else {
              console.log("Location not found for ending point.");
          }
      });
  });

  function addVehicle1(){
    //   event.preventDefault(); // Prevent the default form submission
    console.log("form submitted");
    // Get form elements
    const ownerEmail = document.querySelector('.ownerEmail').value;
    const vehicleNumber = document.querySelector('.vehicleNumber').value;
    const vehicleType = document.querySelector('.vehicle-type').value;
    const vehicleBrand = document.getElementById('vehicleBrand').value;
    const vehicleModel = document.querySelector('.vehicleModel').value;
    const driverEmail = document.querySelector('.driverEmail').value;
    const seatCount = document.getElementById('avalableSeats').value;
    const startingLocation = document.querySelector('.startingLocation').value;
    const endLocation = document.querySelector('.endingLocation').value;
    const vehicleTrips = document.querySelector('.vehicleTrips').value;
    const insideImage = document.querySelector('.insideImage').files[0];
    const outsideImage = document.querySelector('.outsideImage').files[0];
    const insuranceImage = document.querySelector('.insuranceImage').files[0];
    const revenueLicenseImage = document.querySelector('.revenueLicenseImage').files[0];
    const vehicleRegistrationImage = document.querySelector('.vehicleRegistrationImage').files[0];

    var ownerEmailError = document.getElementById("ownerEmail-error-message");
    var driverEmailError = document.getElementById("driverEmail-error-message");
    var vehicleNoError = document.getElementById("vehicleNo-error-message");
    var typeError = document.getElementById("type-error-message");
    var brandError = document.getElementById("brand-error-message");
    var modelError = document.getElementById("model-error-message");
    var seatCountError = document.getElementById("seatCount-error-message");
    var startingLocationError = document.getElementById("startingLocation-error-message");
    var endLocationError = document.getElementById("endingLocation-error-message");
    var vehicleTripsError = document.getElementById("vehicleTrips-error-message");
    var photoError = document.getElementById("photo-error-message");

    ownerEmailError.style.display = "none";
    driverEmailError.style.display = "none";
    vehicleNoError.style.display = "none";
    typeError.style.display = "none";
    brandError.style.display = "none";
    modelError.style.display = "none";
    seatCountError.style.display = "none";
    startingLocationError.style.display = "none";
    endLocationError.style.display = "none";
    vehicleTripsError.style.display = "none";
    photoError.style.display = "none";

    console.log("ownerEmail", ownerEmail);
    console.log("vehicleNumber", vehicleNumber);
    console.log("vehicleType", vehicleType);
    console.log("vehicleBrand", vehicleBrand);
    console.log("vehicleModel", vehicleModel);
    console.log("driverEmail", driverEmail);
    console.log("seatCount", seatCount);
    console.log("startingLocation", startingLocation);
    console.log("endLocation", endLocation);
    console.log("vehicleTrips", vehicleTrips);
    console.log("insideImage", insideImage);
    console.log("outsideImage", outsideImage);
    console.log("insuranceImage", insuranceImage);
    console.log("revenueLicenseImage", revenueLicenseImage);
    console.log("vehicleRegistrationImage", vehicleRegistrationImage);
    

    var checker = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!ownerEmail) {
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
    if (!driverEmail) {
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
    else if (validateVehicleNumber(vehicleNumber) === false) {
      vehicleNoError.innerText = "Please enter a valid vehicle number.";
      vehicleNoError.style.display = "block";
      console.log("vehicle number error");
      checker = false;
    }
    else if (usedVehicleNumber(vehicleNumber) === true) {
      vehicleNoError.innerText = "This vehicle number is already registered.";
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
    // if (!regNumber) {
    //   vehicleRegNoEmailError.innerText = "Please enter a vehicle registration number.";
    //   vehicleRegNoEmailError.style.display = "block";
    //   console.log("vehicle registration number error");
    //   checker = false;
    // }
    if (!seatCount) {
      seatCountError.innerText = "Please enter a seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    if (vehicleType === "Bus" && (seatCount <= 0 || seatCount > 80)) {
      seatCountError.innerText = "Please enter a valid seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    else if (vehicleType === "Van" && (seatCount <= 0 || seatCount > 15)) {
      seatCountError.innerText = "Please enter a valid seat count.";
      seatCountError.style.display = "block";
      console.log("seat count error");
      checker = false;
    }
    else if (vehicleType === "Car" && (seatCount <= 0 || seatCount > 5)) {
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
    if (!insideImage || !outsideImage || !insuranceImage || !revenueLicenseImage || !vehicleRegistrationImage) {
      photoError.innerText = "Please upload all the required images.";
      photoError.style.display = "block";
      console.log("photo error");
      checker = false;
    }
    // checker = true;
    
    if (checker == true) {


      const data = {
        ownerEmail: ownerEmail,
        vehicleNo: vehicleNumber,
        type: vehicleType,
        brand: vehicleBrand,
        model: vehicleModel,
        driverEmail: driverEmail,
        seatsCount: seatCount,
        startingLatitude: starting_latitude,
        startingLongitude:starting_longitude,
        endingLatitude: ending_latitude,
        endingLongitude: ending_longitude,
        trips: vehicleTrips
      };

      console.log(data);
      alert("Vehicle Registered Successfully!");

      fetch('http://127.0.0.1:8080/try2_war_exploded/createVehicleWithoutImages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },credentials: "include", body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.message === "Vehicle created successfully") {
            var approvalRequestFormData = new FormData();
            approvalRequestFormData.append('insideImage', insideImage);
            approvalRequestFormData.append('outsideImage', outsideImage);
            approvalRequestFormData.append('insuranceImage', insuranceImage);
            approvalRequestFormData.append('revenueLicenseImage', revenueLicenseImage);
            approvalRequestFormData.append('vehicleRegistrationImage', vehicleRegistrationImage);
            approvalRequestFormData.append('vehicleNo', vehicleNumber);

            fetch('http://127.0.0.1:8080/try2_war_exploded/ ', {
              method: 'POST',
              enctype: "multipart/form-data",
              body: approvalRequestFormData,
              credentials: "include"
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                if (data.message === "Images uploaded successfully") {
                  Swal.fire({
                    title: "Vehicle Registered Successfully!",
                    icon: "success"
                  }).then(() => {
                    window.location.href = "vehicles.html";
                  })
                }
                else {
                  Swal.fire({
                    title: "Vehicle Registration Failed!",
                    icon: "error"
                  }).then(() => {
                    window.location.href = "vehicles.html";
                  })
                }
              })
            // Swal.fire({
            //   title: "Vehicle Registered Successfully!",
            //   icon: "success"
            // }).then(() => {
            //   window.location.href = "vehicles.html";
            // })
          }
          else {
            Swal.fire({
              title: "Vehicle Registration Failed!",
              icon: "error"
            }).then(() => {
              window.location.href = "vehicles.html";
            })
          }
          // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
          console.error('Error:', error);
        });

      

      // let approvalRequestFormData = new FormData();
// approvalRequestFormData.append('offset', 0);
// approvalRequestFormData.append('limit', 5);
// // approvalRequestFormData.append('vehicle', JSON.stringify(data));
// approvalRequestFormData.append('ownerEmail', ownerEmail);
// approvalRequestFormData.append('vehicleNo', vehicleNumber);
// approvalRequestFormData.append('vehicleType', vehicleType);
// // console.log("Brand", vehicleBrand);
// approvalRequestFormData.append('brand', vehicleBrand);
// approvalRequestFormData.append('model', vehicleModel);
// approvalRequestFormData.append('driverEmail', driverEmail);
// // console.log("seatCount", seatCount);
// approvalRequestFormData.append('availableSeats', seatCount);
// approvalRequestFormData.append('startingLatitude', starting_latitude);
// approvalRequestFormData.append('startingLongitude', starting_longitude);
// approvalRequestFormData.append('endingLatitude', ending_latitude);
// approvalRequestFormData.append('endingLongitude', ending_longitude);
// approvalRequestFormData.append('trips', vehicleTrips);
// approvalRequestFormData.append('insideImage', insideImage);
// approvalRequestFormData.append('outsideImage', outsideImage);
// approvalRequestFormData.append('insuranceImage', insuranceImage);
// approvalRequestFormData.append('revenueLicenseImage', revenueLicenseImage);
// approvalRequestFormData.append('vehicleRegistrationImage', vehicleRegistrationImage);

// console.log("Brand", vehicleBrand);




// let verifyVehicle = document.getElementById('verifyVehicle');
// console.log(verifyVehicle);
// verifyVehicle.submit();
// Swal.fire({
//   title: "Vehicle Registered Successfully!",
//   icon: "success"
// }).then(() => {
//   location.href = "vehicles.html";
// })




// fetch("http://127.0.0.1:8080/try2_war_exploded/vehicleRegister1",
//     {
//         method: 'POST',
//         enctype: "multipart/form-data",
//         body: approvalRequestFormData
  // })


      // let formData = new FormData();
      // formData.append('vehicle', JSON.stringify(data));
      // formData.append('ownerEmail', ownerEmail);
      // formData.append('vehicleNo', vehicleNumber);
      // formData.append('vehicleType', vehicleType);
      // console.log("Brand", vehicleBrand);
      // formData.append('brand', vehicleBrand);
      // formData.append('model', vehicleModel);
      // formData.append('driverEmail', driverEmail);
      // console.log("seatCount", seatCount);
      // formData.append('availableSeats', seatCount);
      // formData.append('startingLatitude', starting_latitude);
      // formData.append('startingLongitude', starting_longitude);
      // formData.append('endingLatitude', ending_latitude);
      // formData.append('endingLongitude', ending_longitude);
      // formData.append('trips', vehicleTrips);

      // formData.append('insideImage', insideImage);
      // formData.append('outsideImage', outsideImage);
      // formData.append('insuranceImage', insuranceImage);
      // formData.append('revenueLicenseImage', revenueLicenseImage);
      // formData.append('vehicleRegistrationImage', vehicleRegistrationImage);


      // console.log(formData);

      // alert("Vehicle Registered Successfully!");
      
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      // fetch('http://127.0.0.1:8080/try2_war_exploded/vehicleRegister1', {
      //   enctype: 'multipart/form-data',
      //   method: 'POST',
      //   credentials: "include",
      //   body: formData
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data)
      //     if (data.message === "Registration successfully") {
      //       Swal.fire({
      //         title: "Vehicle Registered Successfully!",
      //         icon: "success"
      //       }).then(() => {
      //         // window.location.href = "vehicles.html";
      //       })
      //     }
      //     else {
      //       Swal.fire({
      //         title: "Vehicle Registration Failed!",
      //         icon: "error"
      //       }).then(() => {
      //         // window.location.href = "vehicles.html";
      //       })
      //     }
      //     // document.getElementById("demo").innerHTML = data.message;
      //   })
      //   .catch(error => {
      //     console.error('Error:', error);
      //   });
    }
  
    }


    // let verifyVehicle = document.getElementById("verifyVehicle");
    // console.log(verifyVehicle);
    // verifyVehicle.onsubmit = function (e) {
    //   e.preventDefault();
    //   fetch(this.action, {
    //     method: this.method,
    //     enctype: "multipart/form-data",
    //     body: new FormData(this),
    //     credentials: "include"
    //   })
    // }