
var passengerList = ""

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector("[PassengerDetails]")


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
            passengerList = data.reservations;
            console.log("reservations: ",data.reservations)
            row = "";
            data.reservations.forEach(reservation => {
                row += `
                <tr id= "${reservation.NIC}">
                <td>${reservation.id}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.NIC}</td>
                <td class="Action">
                <button class="more-btn" onclick="togglePopup1(${reservation.id})">MORE</button>
                </td>
                <tr>`
                
        })

        users = data.reservations;
        document.querySelector('.tbody').innerHTML = row;
        })
        .catch(error => {
            console.error('Error:', error);
            
        });

        searchInput.addEventListener("input", e => {
            const value = e.target.value.toLowerCase();
            users.forEach(data => {
                const isVisible =
                    data.name.toLowerCase().includes(value) ||
                    data.email.toLowerCase().includes(value) ||
                    data.NIC.toLowerCase().includes(value)

                    document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
            });
        });
    });
            

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

function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < passengerList.length; i++) {
        if (passengerList[i].id == id) {
            console.log(passengerList[i]);
            popupData = `<div class="popup-content">
            <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
    
            <p class="topic">Passenger Details</p>       
            
            <div class="detail-box">
              <div class="image">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" id="default-pic">
              </div>
    
              <form action="">
                <div class="input-box">
                  <span class="details">Passenger ID</span>
                  <input disabled type="text" class="passengerID" name="passengerID" placeholder="p01-${passengerList[i].id}">
                </div>
                <div class="input-box">
                    <span class="details">Passenger Name</span>
                    <input disabled type="text" class="passengerName" value name="passengerName" placeholder="${passengerList[i].name}">
                </div>
                <div class="input-box">
                    <span class="details">NIC No</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${passengerList[i].NIC}">
                </div>
                <div class="input-box">
                    <span class="details">Email</span>
                    <input disabled type="email" class="email" value name="email" placeholder="${passengerList[i].email}">
                </div>
                <div class="input-box">
                    <span class="details">Contact No</span>
                    <input disabled type="text" class="ContactNo" value name="ContactNo" placeholder="${passengerList[i].contactNo}">
                </div>
                <div class="input-box">
                    <span class="details">Registered Date</span>
                    <input disabled type="text" class="reg-date" value name="reg-date" placeholder="${passengerList[i].created_at}">
                </div>
                
              </form>
            </div>       
          </div>`

          document.getElementById("popup").innerHTML = popupData;
        }
    }
}