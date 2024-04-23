var startingLatitute;
var startingLongitude;
var endingLatitute;
var endingLongitude;

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
    console.log("Payload",payload);

    let passengerEmail = payload.id;
    let vehicleNo = window.location.href.split("=")[1];

    const form = document.querySelector("form");

    let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };

    fetch('http://127.0.0.1:8080/try2_war_exploded/getRequest',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                form.querySelector(".id").value = data.Request.id;
                form.querySelector(".vehicleNo").value = data.Request.vehicleNo;
                // form.querySelector(".model").value = data.Request.model;
                // form.querySelector(".type").value = data.Request.type;
                //form.querySelector(".passengerEmail").value = data.Request.passengerEmail;
                form.querySelector(".amount").value = "Rs. " + data.Request.price;
                form.querySelector(".startingDate").value = data.Request.startingDate;
                form.querySelector(".endingDate").value = data.Request.endingDate;
                form.querySelector(".tripStatus").value = data.Request.status;
                document.getElementById("type").value = data.Request.type;
                // form.querySelector(".triptype").value = data.Request.type;
                // form.querySelector(".startTime").value = data.Request.onTime;
                // form.querySelector(".offTime").value = data.Request.offTime;

                startingLatitute = data.Request.startingLatitute;
                startingLongitude = data.Request.startingLongitude;
                endingLatitute = data.Request.endingLatitute;
                endingLongitude = data.Request.endingLongitude;
                initMap();
                
                fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo='+data.Request.vehicleNo,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },credentials: "include",})
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // form.querySelector(".model").value = data.vehicle.model;
                        // form.querySelector(".type").value = data.vehicle.type;
                        //form.querySelector(".tripStatus").value = data.Request.status;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


function updatefunction(){
    const form = document.querySelector("form");
    let data = { 
        id: form.querySelector(".id").value, 
        vehicleNo: form.querySelector(".vehicleNo").value, 
        passengerEmail: form.querySelector(".passengerEmail").value, 
        amount: form.querySelector(".amount").value, 
        startingDate: form.querySelector(".startingDate").value, 
        endingDate: form.querySelector(".endingDate").value, 
        status: form.querySelector(".tripStatus").value };

    fetch('http://127.0.0.1:8080/try2_war_exploded/requestEdit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
        credentials: "include", 
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message === "Update successfully") {
                Swal.fire({
                    title: "Updated Successfully!",
                    icon: "success"
                }).then(()=>
                window.location.href = "./index.html"
                )
                // window.location.href = "./index.html";
            } else {
                Swal.fire({
                    title: "Update Failed!",
                    icon: "error"
                })
                .then(()=>
                window.location.href = "./index.html"
                )
                // alert("Request update failed");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// maps
function initMap() {
    // alert("initMap");
    // Coordinates of the two locations
    var location1 = { lat: parseFloat(startingLatitute), lng: parseFloat(startingLongitude) }; // New York City
    var location2 = { lat: parseFloat(endingLatitute), lng: parseFloat(endingLongitude) }; // Los Angeles

    // Map centered at the average of the two locations
    var center = {
        lat: (location1.lat + location2.lat) / 2,
        lng: (location1.lng + location2.lng) / 2
    };

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 5 // Zoom level, adjust as needed
    });

    // Directions service
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer({
        map: map
    });

    // Define the request
    var request = {
        origin: location1,
        destination: location2,
        travelMode: 'DRIVING' // You can change the travel mode if needed
    };

    // Get directions
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            // Display the route on the map
            directionsRenderer.setDirections(result);
        } else {
            console.error('Error:', status);
        }
    });
}