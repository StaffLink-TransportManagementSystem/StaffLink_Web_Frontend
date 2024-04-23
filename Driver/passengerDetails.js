document.addEventListener('DOMContentLoaded', function() {
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
    
      const email = payload.id;

      var ownerEmail = "";
    
      console.log("email", email);
    
    fetch("http://127.0.0.1:8080/try2_war_exploded/getPassengersByDriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("reservations: ",data.reservations)
            row = "";
            data.reservations.forEach(reservation => {
                row += `
                <tr>
                <td>${reservation.id}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.NIC}</td>
                <td class="Action">
                  <a href="#moredetails"><button class="more-btn">MORE</button></a>
                </td>
                <tr>`
                
        })
        document.querySelector('.tbody').innerHTML = row;
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    });

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
            
            