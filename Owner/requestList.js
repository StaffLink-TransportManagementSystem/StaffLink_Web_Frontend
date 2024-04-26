document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");

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
    console.log("Payload",payload);

    let ownerEmail = payload.id;

    const vehicleNo = window.location.href.split("=")[1];

    const searchInput = document.querySelector("[requestList]")
    const data = {
        email: ownerEmail,
        vehicleNo:vehicleNo
    };
    let row ="";
    let rowData = "";
    let users = []


    fetch('http://127.0.0.1:8080/try2_war_exploded/viewRequestsByVehicle',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(request => {
                    console.log(request)
                    rowData = `<tr  id="${request.id}">
                    <td scope="email" data-label="P ID">`+ request.id +`</td>
                    <td class="NIC">`+ request.passengerEmail +`</td>
                    <td class="contact">`+ request.type +`</td>
                    <td class="contact">`+ request.onTime +`</td>
                    <td class="contact">`+ request.offTime +`</td>
                    <td class="contact">`+ request.price +`</td>

                    <td class="contact"> <span class="status `+ request.status.toLowerCase() +`">`+ request.status +`</span></td>`
                    
                    if(request.status.toLowerCase() == "pending"){
                        rowData += `<td class="Action">
                        <button class="more-btn" onclick="togglePopup1('${request.id}')">MORE</button>
                        <button class="approve add-btn" onclick="approvedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Approve</button>
                        <button class="reject delete-btn" onclick="rejectedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Reject</button>
                        </td>`
                    }
                    else{
                        rowData += `<td class="Action">
                        <button class="more-btn" onclick="togglePopup1('${request.id}')">MORE</button>
                        </td>`
                    }
                    row += rowData;
                });
                users = data.list;


                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            // searchInput.addEventListener("input", e => {
            //     const value = e.target.value.toLowerCase();
            //     users.forEach(data => {
            //         const isVisible =
            //             data.id.toString().toLowerCase().includes(value) ||
            //             data.vehicleNo.toLowerCase().includes(value) ||
            //             data.passengerEmail.toLowerCase().includes(value) ||
            //             data.type.toLowerCase().includes(value) ||
            //             data.status.toLowerCase().includes(value)
                        
            //             document.getElementById(data.id).classList.toggle("hide", !isVisible)
            //     });
            // });
  
    
    
  });


  function fetchData(){
  }

  function approvedfunction(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status){
    console.log("update function called");
    console.log(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status);
    // let data = {};

        status = "Approved"
        console.log("status changed to approved")

    let data = {
        id:id,
        vehicleNo:vehicleNo,
        passengerEmail:passengerEmail,
        startingPoint:startingPoint,
        endingPoint:endingPoint,
        type:type,
        status:status
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/RequestsApproval',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                location.reload();
                // window.location.href = "requestList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
}

function rejectedfunction(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status){
    console.log("update function called");
    console.log(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status);
    // let data = {};

        status = "Rejected"
        console.log("status changed to rejected")

    let data = {
        id:id,
        vehicleNo:vehicleNo,
        passengerEmail:passengerEmail,
        startingPoint:startingPoint,
        endingPoint:endingPoint,
        type:type,
        status:status
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/RequestsApproval',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                location.reload();
                document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
   

}

function togglePopup1(id) {
    alert("clicked"+id);
      const popup = document.getElementById("popup");
      popup.classList.toggle("active");
      fetch('http://127.0.0.1:8080/try2_war_exploded/getRequest?id='+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("popup").innerHTML = `<div class="popup-content">
                <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
        
                <p class="topic">Request Details</p> 
                      
                
                <div class="detail-box">
                
                  <form action="">
                  <div id="map" class="map></div>
                  <div class="input-box">
                  <span class="details">Request ID</span>
                  <input disabled type="text" class="passengerID" name="passengerID" placeholder="${data.request.id}">
                </div>
                <div class="input-box">
                      <span class="details">Request ID</span>
                      <input disabled type="text" class="passengerID" name="passengerID" placeholder="${data.request.id}">
                    </div>
                    <div class="input-box">
                        <span class="details">Passenger Email</span>
                        <input disabled type="text" class="passengerName" value name="passengerName" placeholder="${data.request.passengerEmail}">
                    </div>
                    <div class="input-box">
                        <span class="details">Type</span>
                        <input disabled type="text" class="startLoc" value name="startLoc" placeholder="${data.request.type}">
                    </div>
                    <div class="input-box">
                        <span class="details">Price</span>
                        <input disabled type="text" class="endLoc" value name="endLoc" placeholder="${data.request.price}">
                    </div>
                    <div class="input-box">
                      <span class="details">Starting Time</span>
                      <input disabled type="text" class="startLoc" value name="startLoc" placeholder="${data.request.onTime}">
                    </div>
                    <div class="input-box">
                      <span class="details">Ending Time</span>
                      <input disabled type="text" class="endLoc" value name="endLoc" placeholder="${data.request.offTime}">
                    </div>
                    <div class="input-box">
                        <span class="details">Status</span>
                        <input disabled type="text" class="type" value name="type" placeholder="${data.request.status}">
                    </div>
                    
                  </form>
                </div>       
              </div>`;

                initMap(data.request.startingLatitude, data.request.startingLongitude, data.request.endingLatitude, data.request.endingLongitude);
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
