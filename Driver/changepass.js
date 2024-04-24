function changePass(){
    // var oldPass = document.getElementById("oldPass").value;
    var newPass = document.getElementById("newPass").value;
    var confirmPass = document.getElementById("confirmPass").value;

    console.log("New password:",newPass);
    console.log("Confirm password:",confirmPass);
    
    if(newPass != confirmPass){
        Swal.fire({
            icon: 'error',
            title: 'New Password and Confirm Password does not match',
          })
    }
    else{

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
    
        let email = payload.id;
        console.log(email);

        var data = {
            newPass: newPass,
            email: email
        }


        fetch('http://127.0.0.1:8080/try2_war_exploded/changePassengerPassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message === "Update successfully"){
                  Swral.fire({
                    icon: 'success',
                    title: 'Password Updated Successfully',
                  }).then(()=> {
                    window.location.href = "profile.html";
                  })
                }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong!',
                  }).then(()=> {
                    window.location.href = "profile.html";
                  })
                }
                // window.location.href = "http://127.0.0.1:5501/Admin/drivers.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
        
    }

//Live location sharing
document.addEventListener("DOMContentLoaded", function () {
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

  var driverEmail = payload.id;

  
  fetch("http://127.0.0.1:8080/try2_war_exploded/checkOnTrip?email=" + driverEmail, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }, credentials: "include",
  })
      .then(response => response.json())
      .then(data => {
          console.log(data.message);
          if (data.message === "On Trip") {
              // onTheTrip();
              var tripbutton = document.getElementById("startTrip");
              tripbutton.innerHTML = "End Trip";
              tripbutton.setAttribute("onclick", "endTrip()");
              tripbutton.classList.add("delete-btn");
              onTripStatus = "ontrip";
              console.log("onTripStatus update", onTripStatus);
          }
      })
      .catch(error => {
          console.error('Error:', error);


      })

  var interval = setInterval(getLocation, 30000);

});

function getLocation() {
  // alert("Getting Location", onTripStatus);
  if (onTripStatus == "ontrip") {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
  var data = {
      email: driverEmail,
      latitude: latitude,
      longitude: longitude
  }

  console.log("data to location",data);

  fetch("http://127.0.0.1:8080/try2_war_exploded/createLocationTracking", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }, credentials: "include", body: JSON.stringify(data)
  })
      .then(response => response.json())
      .then(data => {
          console.log("Location data", data.message);

      })

}
