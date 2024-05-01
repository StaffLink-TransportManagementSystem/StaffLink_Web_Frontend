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
                starting_latitude = parseFloat(data.vehicle.startingLatitude);
                starting_longitude = parseFloat(data.vehicle.startingLongitude);
                ending_latitude = parseFloat(data.vehicle.endingLatitude);
                ending_longitude = parseFloat(data.vehicle.endingLongitude);
                var startingCoords = {
                  lat: parseFloat(data.vehicle.startingLatitude),
                  lng: parseFloat(data.vehicle.startingLongitude)
              };
              getAddressFromCoords(startingCoords, function(address) {
                  console.log("Starting Address:", address);
                  document.querySelector('.startingLocation').value = address;
              });

              var endingCoords = {
                lat: parseFloat(data.vehicle.endingLatitude),
                lng: parseFloat(data.vehicle.endingLongitude)
            };
            getAddressFromCoords(endingCoords, function(address) {
                console.log("Ending Address:", address);
                document.querySelector('.endLocation').value = address;
            });


                document.querySelector('.ownerEmail').value = data.vehicle.ownerEmail;  
                document.querySelector('.vehicleNumber').value = data.vehicle.vehicleNo;
                document.querySelector('.vehicle-type').value = data.vehicle.type;
                document.querySelector('.vehicleBrand').value = data.vehicle.vehicleBrand;
                document.querySelector('.vehicleModel').value = data.vehicle.model;
                document.querySelector('.driverEmail').value = data.vehicle.driverEmail;
                document.querySelector('.seatCount').value = data.vehicle.seatsCount;
                // document.querySelector('.startingLocation').value = data.vehicle.startingPoint;
                // document.querySelector('.endLocation').value = data.vehicle.endingPoint;
                document.querySelector('.vehicleTrips').value = data.vehicle.trips;
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
    // if (!startingLocation) {
    //   startingLocationError.innerText = "Please enter a starting location.";
    //   startingLocationError.style.display = "block";
    //   console.log("starting location error");
    //   checker = false;
    // }
    // if (!endLocation) {
    //   endLocationError.innerText = "Please enter an end location.";
    //   endLocationError.style.display = "block";
    //   console.log("end location error");
    //   checker = false;
    // }
    if (!vehicleTrips) {
      vehicleTripsError.innerText = "Please enter vehicle trips.";
      vehicleTripsError.style.display = "block";
      console.log("vehicle trips error");
      checker = false;
    }
    // if (!insideImage || !outsideImage ) {
    //   photoError.innerText = "Please upload all the required images.";
    //   photoError.style.display = "block";
    //   console.log("photo error");
    //   checker = false;
    // }
    
    if (checker == true) {


      const data = {
        ownerEmail: ownerEmail,
        vehicleNo: vehicleNumber,
        type: vehicleType,
        vehicleBrand: vehicleBrand,
        model: vehicleModel,
        driverEmail: driverEmail,
        seatsCount: seatCount,
        startingLatitude: starting_latitude,
        startingLongitude:starting_longitude,
        endingLatitude: ending_latitude,
        endingLongitude: ending_longitude,
        trips: vehicleTrips,
        insideImage: insideImage,
        outsideImage: outsideImage
      };

      // Get form elements
      // const ownerEmail = form.querySelector('.ownerEmail').value;
      // const vehicleNumber = form.querySelector('.vehicleNumber').value;
      // const vehicleType = form.querySelector('.vehicle-type').value;
      // const vehicleBrand = form.querySelector('.vehicleBrand').value;
      // const vehicleModel = form.querySelector('.vehicleModel').value;
      // const regNumber = form.querySelector('.vehicleRegNo').value;
      // const driverEmail = form.querySelector('.driverEmail').value;
      // const seatCount = form.querySelector('.seatCount').value;
      // const startingLocation = form.querySelector('.startingLocation').value;
      // const endLocation = form.querySelector('.endLocation').value;
      // const vehicleTrips = form.querySelector('.vehicle-trips').value;

      // var ownerEmailError = document.getElementById("ownerEmailError");
      // var vehicleNumberError = document.getElementById("vehicleNumberError");
      // var vehicleTypeError = document.getElementById("vehicleTypeError");
      // var vehicleBrandError = document.getElementById("vehicleBrandError");
      // var vehicleModelError = document.getElementById("vehicleModelError");
      // var vehicleRegNoError = document.getElementById("vehicleRegNoError");
      // var driverEmailError = document.getElementById("driverEmailError");
      // var seatCountError = document.getElementById("seatCountError");
      // var startingLocationError = document.getElementById("startingLocationError");
      // var endLocationError = document.getElementById("endLocationError");
      // var vehicleTripsError = document.getElementById("vehicleTripsError");

        

  
      // // Validate form data (You can add more validation as needed)
      // if (!ownerEmail ) {
      //   alert("Please fill in all required fields.");
      // }
      // else if (!vehicleNumber) {
      //   alert("Please fill in all required fields.");
      // }
      // else if(!vehicleType){
      //   alert("Please fill in all required fields.");
      // }
      // else if(!vehicleBrand){
      //   alert("Please fill in all required fields.");
      // }
      //   else if(!vehicleModel){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!regNumber){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!driverEmail){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!seatCount){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!startingLocation){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!endLocation){
      //       alert("Please fill in all required fields.");
      //   }
      //   else if(!vehicleTrips){
      //       alert("Please fill in all required fields.");
      //   }
      //   else {
      //       // All form data are valid, so submit to the server
           
  
      // // Prepare the data to send to the backend (You can structure it as needed)
      // const data = {
      //   ownerEmail:ownerEmail,
      //   vehicleNo:vehicleNumber,
      //   type:vehicleType,
      //   vehicleBrand:vehicleBrand,
      //   model:vehicleModel,
      //   regNo:regNumber,
      //   driverEmail:driverEmail,
      //   seatsCount:seatCount,
      //   startingPoint:startingLocation,
      //   endingPoint:endLocation,
      //   trips:vehicleTrips,
      // };
      console.log(data);
      console.log(data.startingLatitude);
      console.log(data.startingLongitude);
      console.log(data.endingLatitude);
      console.log(data.endingLongitude);
      console.log(data.seatsCount);
      alert("Vehicle Updated Successfully!");
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://127.0.0.1:8080/try2_war_exploded/vehicleEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "vehicleList.html";
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
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message==="Delete successfully"){
                  Swal.fire({
                    title: "Vehicle Deleted Successfully!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "vehicleList.html";
                  })
                }
                else{
                  Swal.fire({
                    title: "Vehicle Deletion Failed!",
                    icon: "error"
                  }).then(()=>{
                    window.location.href = "vehicleList.html";
                  })
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    );
  };


//   startingAutocomplete.addListener('place_changed', function () {
//     var place = startingAutocomplete.getPlace();
//     if (place.geometry) {
//         var startingCoords = {
//             lat: place.geometry.location.lat(),
//             lng: place.geometry.location.lng()
//         };
//         getAddressFromCoords(startingCoords, function(address) {
//             console.log("Starting Address:", address);
//         });
//     } else {
//         console.log("Location not found for starting point.");
//     }
// });

function getAddressFromCoords(coords, callback) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'location': coords }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
          callback(results[0].formatted_address);
      } else {
          callback(null);
      }
  });
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
          console.log("Ending Coordinates:", endingCoords);
      } else {
          console.log("Location not found for ending point.");
      }
  });
});
