var reservations;
var driverEmail;

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
      driverEmail = email;
      var OnTrip = payload.OnTrip;

    if (OnTrip === "notontrip") {
        window.location.href = "dashboard.html";
    }
    
     console.log("email", email);
    
    fetch("http://127.0.0.1:8080/try2_war_exploded/getTripPassengersByDriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("data: ",data)
            console.log("reservations: ",data.list)
            row = "";
            tripPassengers = data.tripPassengers;
            passengers = data.list;
            reservations = data.reservations;
            console.log("tripPassengers: ", tripPassengers);
            console.log("passengers: ", passengers);

            let i = 0;
            while(i < passengers.length){
                row += `
                <tr>
                <td>${passengers[i].id}</td>
                <td>${passengers[i].name}</td>
                <td>${passengers[i].email}</td>
                <td>${passengers[i].contactNo}</td>
                <td class="Action">`
                if(tripPassengers[i].status == "notpicked"){
                    // row += `<a href="#moredetails" onclick="ViewLoction('${reservations[i].reservationId}')"><button class="more-btn">View Location</button></a>
                    //         <a href="#moredetails" onclick="MarkPicked('${passengers[i].email}')"><button class="edit-btn">Pick Passenger</button></a>`
                    row += `<a href="#moredetails" onclick="ViewLoction('${reservations[i].startingLatitude}','${reservations[i].startingLongitude}','${reservations[i].endingLatitude}','${reservations[i].endingLongitude}')"><button class="more-btn">View Location</button></a>
                            <a href="#moredetails" onclick="MarkPicked('${passengers[i].email}')"><button class="edit-btn">Pick Passenger</button></a>`
                }
                else if(tripPassengers[i].status == "picked"){
                    row += `<button class="add-btn" disabled>Passenger Picked</button>`
                }
                row += `
                </td>
                <tr>`
                i++;
            }

            // data.list.forEach(reservation => {
            //     row += `
            //     <tr>
            //     <td>${reservation.id}</td>
            //     <td>${reservation.name}</td>
            //     <td>${reservation.email}</td>
            //     <td>${reservation.NIC}</td>
            //     <td class="Action">`
            //     if(tripPassengers.status == "ongoing"){
            //         row += `<a href="#moredetails" onclick="MarkPicked('${reservation.email}')"><button class="more-btn">Pick</button></a>`
            //     }
            //     else if(tripPassengers.status == "picked"){
            //         row += `<button class="add-btn" disabled>Picked</button>`
            //     }
            //     row += `
            //     </td>
            //     <tr>`
            document.querySelector('.tbody').innerHTML = row;
                
        })
        
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    

function MarkPicked(passengerEmail){
    console.log("Marked as picked");

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
      var OnTrip = payload.OnTrip;

    if (OnTrip === "notontrip") {
        window.location.href = "dashboard.html";
    }
    
     console.log("email", email);


    data = {
        "passengerEmail": passengerEmail,
        "driverEmail": email
    }
    fetch('http://127.0.0.1:8080/try2_war_exploded/passengerPicked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(data),credentials: "include",})
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            if(data.message == 'Passenger picked successfully'){
                Swal.fire({
                    title: "Passenger Picked!",
                    icon: "success"
                  })
                  .then(()=>{
                    location.reload();
                  })
            }
            else{
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "error"
                  })
            }
        })
    
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

function ViewLoction(startingLatitude,startingLongitude,endingLatitude,endingLongitude){
    // console.log("Email: "+email);
    // fetch("http://127.0.0.1:8080/try2_war_exploded/getLocationTracking?email="+email, {
    window.open(`https://www.google.com/maps/dir/${startingLatitude},${startingLongitude}/${endingLatitude},${endingLongitude}`);
        


}

// function showRoute(){
//     console.log("Showing route");
//     console.log("Reservations List: ", reservations);

//     fetch("http://127.0.0.1:8080/try2_war_exploded/getRoute?driverEmail=" + driverEmail, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: "include",
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log("Route data: ", data);

//         // Update waypoints with route data
//         var waypoints = [];
//         for (let i = 0; i < reservations.length; i++) {
//             waypoints.push({location: {lat: reservations[i].startingLatitude, lng: reservations[i].startingLongitude}, stopover: true});
//             waypoints.push({location: {lat: reservations[i].endingLatitude, lng: reservations[i].endingLongitude}, stopover: true});
//         }

//         // Generate map URL
//         var mapUrl = 'https://www.google.com/maps/dir/';
//         waypoints.forEach(function(waypoint, index) {
//             mapUrl += waypoint.location.lat + ',' + waypoint.location.lng;
//             if (index < waypoints.length - 1) {
//                 mapUrl += '/';
//             }
//         });

//         // Open map in new tab
//         window.open(mapUrl);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }

function showRoute() {
    console.log("Showing route");
    console.log("Reservations List: ", reservations);

    // Initialize a set to store unique waypoints
    var uniqueWaypoints = new Set();

    fetch("http://127.0.0.1:8080/try2_war_exploded/getRoute?driverEmail=" + driverEmail, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
    .then(response => response.json())
    .then(data => {
        console.log("Route data: ", data);

        // Collect unique waypoints from route
        uniqueWaypoints.add(JSON.stringify({location: {lat: data.route.startingLatitude, lng: data.route.startingLongitude}}));
        uniqueWaypoints.add(JSON.stringify({location: {lat: data.route.endingLatitude, lng: data.route.endingLongitude}}));

        for (let i = 0; i < reservations.length; i++) {
            uniqueWaypoints.add(JSON.stringify({location: {lat: reservations[i].startingLatitude, lng: reservations[i].startingLongitude}}));
            uniqueWaypoints.add(JSON.stringify({location: {lat: reservations[i].endingLatitude, lng: reservations[i].endingLongitude}}));
        }
        var waypoints = Array.from(uniqueWaypoints).map(waypoint => JSON.parse(waypoint));

        // Collect unique waypoints from reservations
        // uniqueWaypoints.add(JSON.stringify({location: {lat: data.route.startingLatitude, lng: data.route.startingLongitude}, stopover: true}));
        // uniqueWaypoints.add(JSON.stringify({location: {lat: data.route.endingLatitude, lng: data.route.endingLongitude}, stopover: true}));

        // for (let i = 0; i < reservations.length; i++) {
        //     uniqueWaypoints.add(JSON.stringify({location: {lat: reservations[i].startingLatitude, lng: reservations[i].startingLongitude}, stopover: true}));
        //     uniqueWaypoints.add(JSON.stringify({location: {lat: reservations[i].endingLatitude, lng: reservations[i].endingLongitude}, stopover: true}));
        // }

        // // Convert Set back to an array
        // var waypoints = Array.from(uniqueWaypoints).map(waypoint => JSON.parse(waypoint));

        // Call calculateOptimalRoute with unique waypoints
        calculateOptimalRoute(waypoints);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function calculateOptimalRoute(waypoints) {
    // Function to calculate distance between two points using Haversine formula
    function calculateDistance(lat1, lon1, lat2, lon2) {
        // Haversine formula
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c; // Distance in meters
    }

    // Function to generate all permutations of waypoints
    function permute(array) {
        var permutations = [];

        function permuteHelper(arr, startIndex) {
            if (startIndex === arr.length - 1) {
                permutations.push([...arr]);
                return;
            }
            for (let i = startIndex; i < arr.length; i++) {
                [arr[startIndex], arr[i]] = [arr[i], arr[startIndex]]; // Swap elements
                permuteHelper(arr, startIndex + 1);
                [arr[startIndex], arr[i]] = [arr[i], arr[startIndex]]; // Backtrack
            }
        }

        permuteHelper(array, 0);
        return permutations;
    }

    // Function to calculate the total distance of a route
    function calculateTotalDistance(route) {
        let totalDistance = 0;
        for (let i = 0; i < route.length - 1; i++) {
            totalDistance += calculateDistance(
                route[i].location.lat,
                route[i].location.lng,
                route[i + 1].location.lat,
                route[i + 1].location.lng
            );
        }
        return totalDistance;
    }

    // Sample waypoints array with 5 waypoints
    // var waypoints = Array.from(uniqueWaypoints);
    // [
    //  { "location": { "lat": 6.5822, "lng": 79.9607 } }, // Kalutara
    //  { "location": { "lat": 6.8741, "lng": 79.8895 } }, // Nugegoda
    //  { "location": { "lat": 6.9015, "lng": 79.8607 } }, // University of Colombo
    //  { "location": { "lat": 6.7152, "lng": 79.9309 } }, // Panadura
     
    //  { "location": { "lat": 6.9219, "lng": 79.8578 } } // Galle Face
    // ]
    // ;

    // Find the optimal route
    var allPermutations = permute(waypoints);
    var shortestDistance = Infinity;
    var optimalRoute = [];

    allPermutations.forEach(permutation => {
        let distance = calculateTotalDistance(permutation);
        if (distance < shortestDistance) {
            shortestDistance = distance;
            optimalRoute = permutation;
        }
    });

    // Construct URL for Google Maps directions
    var mapUrl = 'https://www.google.com/maps/dir/';
    optimalRoute.forEach(waypoint => {
        mapUrl += waypoint.location.lat + ',' + waypoint.location.lng + '/';
    });

    // Open Google Maps directions in new tab
    window.open(mapUrl, '_blank');
}