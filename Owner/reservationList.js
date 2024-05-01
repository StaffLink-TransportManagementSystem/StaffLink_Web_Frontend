document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

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

    console.log("email", email);

    var row = "";

    fetch("http://127.0.0.1:8080/try2_war_exploded/getReservationsByOwner?ownerEmail=" + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => {
            console.log("Reservation data", data.reservations)

            let i = 0;

            while (i < data.reservations.length) {
                const reservation = data.reservations[i];
                const passenger = data.passengers[i];
                row += `<tr  id="${reservation.id}">
                
                <td scope="email" data-label="P ID">`+ reservation.reservationId +`</td>
                <td class="NIC">`+ reservation.passengerEmail+`</td>
                <td class="NIC">`+ passenger.name+`</td>
                <td class="contact">`+ reservation.startingDate +`</td>
                <td class="contact">`+ reservation.endingDate +`</td>
                <td class="contact">`+ reservation.status +`</td>
                <td class="contact"><button class="more-btn" onclick="togglePopup1('${reservation.reservationId}')">MORE</button></td>`
                i++;
            }
            

            document.querySelector(".tbody").innerHTML = row;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function togglePopup1(id) {
    // alert("clicked"+id);
      const popup = document.getElementById("popup");
      popup.classList.toggle("active");
      fetch('http://127.0.0.1:8080/try2_war_exploded/getReservation?reservationId='+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("popup").innerHTML = `<div class="popup-content">
                <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
        
                <p class="topic">Reservation Details</p> 
                      
                
                <div class="detail-box">
                
                  <form action="">
                  <div id="map" class="map></div>
                  <div class="input-box">
                  <span class="details">Reservation ID</span>
                  <input disabled type="text" class="passengerID" name="passengerID" placeholder="${data.reservation.reservationId}">
                </div>
                <div class="input-box">
                      <span class="details">Reservation ID</span>
                      <input disabled type="text" class="passengerID" name="passengerID" placeholder="${data.reservation.reservationId}">
                    </div>
                    <div class="input-box">
                        <span class="details">Passenger Email</span>
                        <input disabled type="text" class="passengerName" value name="passengerName" placeholder="${data.reservation.passengerEmail}">
                    </div>
                    <div class="input-box">
                        <span class="details">Starting</span>
                        <input disabled type="text" class="startLoc" value name="startLoc" placeholder="${data.reservation.startingDate}">
                    </div>
                    <div class="input-box">
                        <span class="details">Ending Date</span>
                        <input disabled type="text" class="endLoc" value name="endLoc" placeholder="${data.reservation.endingDate}">
                    </div>
                    
                    <div class="input-box">
                        <span class="details">Status</span>
                        <input disabled type="text" class="type" value name="type" placeholder="${data.reservation.status}">
                    </div>
                    
                  </form>
                </div>       
              </div>`;

                initMap(data.reservation.startingLatitude, data.reservation.startingLongitude, data.reservation.endingLatitude, data.reservation.endingLongitude);
            })
            .catch(error => {
                console.error('Error:', error);
            });
  }


    // Function to initialize the Google Map
    function initMap(START_LATITUDE, START_LONGITUDE, END_LATITUDE, END_LONGITUDE) {
        console.log(START_LATITUDE, START_LONGITUDE, END_LATITUDE, END_LONGITUDE)
        // Starting and ending coordinates
        var startCoords = { lat: parseFloat(START_LATITUDE), lng: parseFloat(START_LONGITUDE) };
        var endCoords = { lat: parseFloat(END_LATITUDE), lng: parseFloat(END_LONGITUDE) };

        // Create map object centered at starting coordinates
        var map = new google.maps.Map(document.getElementById('map'), {
            center: startCoords,
            zoom: 12 // Adjust zoom level as needed
        });

        // Create a DirectionsService object to use the route
        var directionsService = new google.maps.DirectionsService();
        
        // Create a DirectionsRenderer object to display the route
        var directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        // Define route request
        var request = {
            origin: startCoords,
            destination: endCoords,
            travelMode: 'DRIVING' // Adjust travel mode as needed
        };

        // Calculate the route
        directionsService.route(request, function (result, status) {
            if (status == 'OK') {
                // Display the route on the map
                directionsRenderer.setDirections(result);
            } else {
                console.log('Directions request failed due to ' + status);
            }
        });
    }
