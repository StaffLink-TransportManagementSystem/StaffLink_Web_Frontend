const e = require("express")

const codes = document.querySelectorAll(".code")

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <= 9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        }
        else if(e.key === 'Backspace'){
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})


function verifiyOTP() {
    // let otp1 = document.getElementsByClassName("otp1")[0].value;
    // console.log(otp1);
    let otp = "";
    codes.forEach(code => {
        otp += code.value;
    });
    console.log("OTP",otp);

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

    let data = {
        otp: otp,
        email: email
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/verifyOTP',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include", body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if(data.message == "OTP verified"){
                    Swal.fire({
                        title: "OTP Verified!",
                        icon: "success"
                      }).then(()=>{
                        location.href = "changePassword.html";
                        })
                }
                else{
                    Swal.fire({
                        title: "OTP Verification Failed!",
                        icon: "error"
                      }).then(()=>{
                        location.reload();
                        })
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
}


function sendOTPEmail() {
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

    let data = {
        email: email
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/sendOTP',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include", body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                
                if(data.message == "OTP sent"){
                    Swal.fire({
                        title: "OTP sent!",
                        icon: "success"
                      }).then(()=>{
                        location.reload();
                        })
                }
                else{
                    Swal.fire({
                        title: "OTP send Failed!",
                        icon: "error"
                      }).then(()=>{
                        location.reload();
                        })
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
}

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