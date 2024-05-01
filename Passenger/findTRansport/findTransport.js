
var requested_vehicle = "";

var vehicles = [];
var row_data = "";

var starting_latitude_new = 0;
var starting_longitude_new = 0;

var ending_latitude_new = 0;
var ending_longitude_new = 0;

var passengerEmail = "";
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

    passengerEmail = payload.id;
})

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        // sub = document.querySelector(".sub");
        sub = document.getElementById("search-btn");


    sub.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("search submitted ");
        // Get form elements
        // const startingLocation = form.querySelector('.startLocation').value;
        // const endingLocation = form.querySelector('.endLocation').value;
        // var type = document.getElementById('type').value;
        // var startingTime = document.getElementById('startTime').value;
        // var EndingTime = document.getElementById('offTime').value;

        var checker = true;

        var startLocationError = document.getElementById("startLocation-error-message");
        var endLocationError = document.getElementById("endLocation-error-message");
        // var typeError = document.getElementById("type-error-message");
        // var startTimeError = document.getElementById("startTime-error-message");
        // var offTimeError = document.getElementById("offTime-error-message");

        startLocationError.style.display = "none";
        endLocationError.style.display = "none";
        // typeError.style.display = "none";
        // startTimeError.style.display = "none";
        // offTimeError.style.display = "none";

        if (!starting_latitude_new || !starting_longitude_new) {
            startLocationError.innerText = "Please enter a starting location.";
            startLocationError.style.display = "block";
            console.log("starting location error");
            checker = false;
        }
        if (!ending_latitude_new || !ending_longitude_new) {
            endLocationError.innerText = "Please enter an ending location.";
            endLocationError.style.display = "block";
            console.log("ending location error");
            checker = false;
        }
        // if (!type) {
        //     typeError.innerText = "Please enter a type.";
        //     typeError.style.display = "block";
        //     console.log("type error");
        //     checker = false;
        // }

        // if (type === "Morning") {
        //     if (!startingTime) {
        //         startTimeError.innerText = "Please enter a starting time.";
        //         startTimeError.style.display = "block";
        //         console.log("starting time error");
        //         checker = false;
        //     }
        // }
        // if (type === "Evening") {
        //     if (!EndingTime) {
        //         offTimeError.innerText = "Please enter an off time.";
        //         offTimeError.style.display = "block";
        //         console.log("off time error");
        //         checker = false;
        //     }
        // }
        // if (type === "Both") {
        //     if (!startingTime) {
        //         startTimeError.innerText = "Please enter a starting time.";
        //         startTimeError.style.display = "block";
        //         console.log("starting time error");
        //         checker = false;
        //     }
        //     if (!EndingTime) {
        //         offTimeError.innerText = "Please enter an off time.";
        //         offTimeError.style.display = "block";
        //         console.log("off time error");
        //         checker = false;
        //     }
        // }

        // let row = "";
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = "";

        // demoResult.forEach(result => {
        //   const resultDiv = document.createElement("div");
        //   resultDiv.classList.add("result-item");
        //   resultDiv.innerHTML = `<p>Transport Type: ${result.serviceprovider}</p>
        //                          <p>Transport Type: ${result.transportType}</p>
        //                          <p>Departure Time: ${result.departureTime}</p>
        //                          <p>Arrival Time: ${result.arrivalTime}</p>`;

        //   // Add request and details buttons
        //   const buttonsDiv = document.createElement("div");
        //   buttonsDiv.classList.add("result-buttons");
        //   const requestButton = document.createElement("button");
        //   requestButton.classList.add("request-button");
        //   requestButton.innerText = "Request";
        //   const detailsButton = document.createElement("button");
        //   detailsButton.classList.add("details-button");
        //   detailsButton.innerText = "More Details";

        //   buttonsDiv.appendChild(requestButton);
        //   buttonsDiv.appendChild(detailsButton);
        //   resultDiv.appendChild(buttonsDiv);

        //   resultsContainer.appendChild(resultDiv);
        // });

        if (checker) {

            vehicles = [];
            row_data = "";

            fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllRoutes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include",
            })
                .then(response => response.json())
                .then(data => {
                    // if (data.size == 0) {
                    //     Swal.fire({
                    //         title: "No Vehicles Available!",
                    //         icon: "error"
                    //     })
                    // }
                    // else {

                    console.log(data.list);
                    data.list.forEach(route => {
                        console.log("route", route);
                        // var diff_distance = findDistance(parseFloat(route.routeNo), parseFloat(route.startingLatitude), parseFloat(route.startingLongitude), parseFloat(route.endingLatitude), parseFloat(route.endingLongitude));

                        var routeNo = parseFloat(route.routeNo);
                        var startingLatitude = parseFloat(route.startingLatitude);
                        var startingLongitude = parseFloat(route.startingLongitude);
                        var endingLatitude = parseFloat(route.endingLatitude);
                        var endingLongitude = parseFloat(route.endingLongitude);


                        var startingLocation = { lat: startingLatitude, lng: startingLongitude }; // Example starting location (New York City)
                        var endingLocation = { lat: endingLatitude, lng: endingLongitude }; // Example ending location (Los Angeles)
                        waypoints_list = [];
                        var differance = 0;



                        fetch('http://127.0.0.1:8080/try2_war_exploded/getWaypoints?routeNo=' + routeNo, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }, credentials: "include",
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                data.waypoints.forEach(waypoint => {
                                    console.log(waypoint);
                                    waypoints_list.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                                    waypoints_list1.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                                    console.log("waypoints_list1", waypoints_list);
                                });

                            })
                        console.log("waypoints_list2", waypoints_list);


                        //   console.log("waypoints_list3", waypoints_list);

                        // fetch('http://127.0.0.1:8080/try2_war_exploded/getWaypoints?routeNo=' + routeNo, {
                        //     method: 'GET',
                        //     headers: {
                        //         'Content-Type': 'application/json'
                        //     }, credentials: "include",
                        // })
                        //     .then(response => response.json())
                        //     .then(data => {
                        //         console.log(data);
                        //         data.waypoints.forEach(waypoint => {
                        //             console.log(waypoint);
                        //             waypoints_list.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                        //             waypoints_list1.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                        //         });

                        //     })


                        console.log("waypoints_list", waypoints_list);
                        const map = new google.maps.Map(document.getElementById("map"), {
                            zoom: 4,
                            center: startingLocation,
                        });

                        const directionsService = new google.maps.DirectionsService();
                        const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

                        var current_distance = 0;
                        var after_distance = 0;

                        // Define the request for directions
                        var request = {
                            origin: startingLocation,
                            destination: endingLocation,
                            waypoints: waypoints_list,
                            optimizeWaypoints: true, // Optimize the order of waypoints
                            travelMode: google.maps.TravelMode.DRIVING,
                        };

                        var request1 = {
                            origin: startingLocation,
                            destination: endingLocation,
                            waypoints: waypoints_list1,
                            optimizeWaypoints: true, // Optimize the order of waypoints
                            travelMode: google.maps.TravelMode.DRIVING,
                        };

                        waypoints_list.push({ location: { lat: startingLatitude, lng: startingLongitude }, stopover: true });
                        waypoints_list.push({ location: { lat: endingLatitude, lng: endingLongitude }, stopover: true });
                        waypoints_list.push({ location: { lat: starting_latitude_new, lng: starting_longitude_new }, stopover: true });
                        waypoints_list.push({ location: { lat: ending_latitude_new, lng: ending_longitude_new }, stopover: true });



                        // Define the request for directions
                        requestwithWaypoint = {
                            origin: startingLocation,
                            destination: endingLocation,
                            waypoints: waypoints_list,
                            optimizeWaypoints: true, // Optimize the order of waypoints
                            travelMode: google.maps.TravelMode.DRIVING,
                        };

                        // Get the directions and display the route

                        directionsService.route(request, function (response, status) {
                            if (status === "OK") {
                                // directionsRenderer.setDirections(response);
                                var route = response.routes[0];
                                let totalDistance = 0;
                                for (const leg of route.legs) {
                                    totalDistance += leg.distance.value; // Distance in meters
                                }
                                totalDistance /= 1000; // Convert meters to kilometers
                                // current_distance = totalDistance;
                                console.log("Waypoints 01", waypoints_list);
                                console.log("Total Distance test 01: " + totalDistance.toFixed(2) + " km");
                                after_distance = totalDistance.toFixed(2);
                            } else {
                                window.alert("Directions request failed due to " + status);
                            }
                        })
                            .then(() => {




                                // Get the directions and display the route
                                directionsService.route(request1, function (response, status) {
                                    if (status === "OK") {
                                        // directionsRenderer.setDirections(response);
                                        var route2 = response.routes[0];
                                        let totalDistance = 0;
                                        for (const leg of route2.legs) {
                                            totalDistance += leg.distance.value; // Distance in meters
                                        }
                                        totalDistance /= 1000; // Convert meters to kilometers
                                        // after_distance = totalDistance;
                                        console.log("Waypoints 02", waypoints_list);
                                        console.log("Total Distance test 02: " + totalDistance.toFixed(2) + " km");
                                        current_distance = totalDistance.toFixed(2);
                                        console.log("current_distance", current_distance);
                                    } else {
                                        window.alert("Directions request failed due to " + status);
                                    }

                                })
                                    .then(() => {
                                        differance = after_distance - current_distance;
                                        console.log("diff_distance range", differance);
                                        var vehicleType = document.getElementById("vehicleType").value;
                                        if (differance < 10) {
                                            fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=' + route.vehicleNo, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }, credentials: "include",
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    console.log("Inside fetch", data);
                                                    vehical = data.vehicle;
                                                    if(vehical.type == vehicleType){
                                                        row_data += `<div class="vehicle-card">
                                                        <div class="slider">
                                                        <div class="vehicle-images">
                                                            <input type="radio" name="slide" id="img-outside">
                                                            <input type="radio" name="slide" id="img-inside">
                                            
                                                            <img src="http://127.0.0.1:5560/Public/Images/${data.vehicle.outsideImage}" class="img-outside" alt="img-outside">
                                                            <img src="http://127.0.0.1:5560/Public/Images/${data.vehicle.outsideImage}" class="img-inside" alt="img-inside">
                                                        </div>
                                            
                                                        <div class="dots">
                                                            <label for="img-outside"></label>
                                                            <label for="img-inside"></label>
                                                        </div>
                                                        </div>
                                            
                                                        <div class="vehicle-desc">
                                                        <div class="topic vehicle-card-title">${vehical.vehicleNo}</div>
                                            
                                                        <div class="vehicle-spec">
                                                            <p><b>Vehicle Type :</b> ${vehical.type}</p>
                                                            <p><b>Type of Trips :</b> ${vehical.trips}</p>
                                                            <p><b>Available Seats :</b> ${vehical.seatsCount}</p>
                                                            <p><b>Price :</b> RS. ${(final_distance * 90).toFixed(2)} (per day)</p>
                                                        </div>
                                                        <a href="#"><button class="add-btn" onclick="requestPopup('${vehical.vehicleNo}', '${passengerEmail}')">REQUEST TO RESERVATION</button></a>
                                                        </div>
                                                    </div>`;
                                                    }
                                                    // console.log("row_data1", row_data);
                                                })
                                            // vehicles.push(route.vehicleNo);
                                        }
                                        // console.log("differance", after_distance - current_distance);
                                        // return (after_distance - current_distance);
                                        // return differance;
                                    })
                            }
                            )
                        // .then(() => {



                        //     console.log("vehicles", vehicles);
                        //     console.log("row data", row_data);
                        //     document.getElementById("tbody").innerHTML = row_data;
                        // })
                        // displayVehicles(vehicles);

                        // console.log("diff_distance range", differance);
                        // if (differance < 10) {
                        //     vehicles.push(route.vehicleNo);
                        // }
                    })

                    // console.log("Vehicles "+vehicles);

                    // displayVehicles();
                    // }
                })
                .catch(error => {
                    console.error('Error:', error);
                })


            // data = {
            //     starting_latitude: starting_latitude,
            //     starting_longitude: starting_longitude,
            //     ending_latitude: ending_latitude,
            //     ending_longitude: ending_longitude,
            //     distance: distance_in_km,
            //     duration: duration_in_minutes,
            //     type: type,
            //     startingTime: startingTime,
            //     EndingTime: EndingTime
            // }

            // fetch('http://127.0.0.1:8080/try2_war_exploded/findTransport', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }, credentials: "include", body: JSON.stringify(data)
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log(data.message);
            //             data.list.forEach(vehical => {
            //                 const resultDiv = document.createElement("div");
            //                 resultDiv.classList.add("result-item");
            //                 resultDiv.innerHTML = `<p>Transport Vehicle No: ${vehical.vehicleNo}</p>
            //                      <p>Transport Type: ${vehical.type}</p>
            //                      <p>Departure Time: ${vehical.startTime}</p>
            //                      <p>Arrival Time: ${vehical.offTime}</p>`;

            //                 // Add request and details buttons
            //                 const buttonsDiv = document.createElement("div");
            //                 buttonsDiv.classList.add("result-buttons");
            //                 const requestButton = document.createElement("button");
            //                 requestButton.classList.add("request-button");
            //                 requestButton.innerText = "Request";
            //                 const detailsButton = document.createElement("button");
            //                 detailsButton.classList.add("details-button");
            //                 detailsButton.innerText = "More Details";

            //                 buttonsDiv.appendChild(requestButton);
            //                 buttonsDiv.appendChild(detailsButton);
            //                 resultDiv.appendChild(buttonsDiv);

            //                 resultsContainer.appendChild(resultDiv);
            //                 // row += ``;
            //             });
            //             document.querySelector(".table").innerHTML = row;
            //         })

            // })
            //     .catch(error => {
            //         console.log(error);
            //     })
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    let tripTypeSelect = document.getElementById("type");
    let startingTimeInput = document.getElementById("pStartTimeDiv");
    let endingTimeInput = document.getElementById("pEndTimeDiv");

    // Initially hide the starting time and ending time input boxes
    startingTimeInput.classList.add("hide-input");
    endingTimeInput.classList.add("hide-input");

    tripTypeSelect.addEventListener("change", function () {
        // Show or hide the starting and ending time input boxes based on the selected option
        if (tripTypeSelect.value === "Morning") {
            startingTimeInput.classList.remove("hide-input");
            endingTimeInput.classList.add("hide-input");
        } else if (tripTypeSelect.value === "Evening") {
            startingTimeInput.classList.add("hide-input");
            endingTimeInput.classList.remove("hide-input");
        }
        else if (tripTypeSelect.value === "Both") {
            startingTimeInput.classList.remove("hide-input");
            endingTimeInput.classList.remove("hide-input");
        }
    });
});

var map;
var geocoder;
var autocomplete1;
var autocomplete2;
var marker1;
var marker2;
var directionsService;
var directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 6.927079, lng: 79.861244 } // Default center
    });

    // Create a geocoder object to use the geocoding API
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    autocomplete1 = new google.maps.places.Autocomplete(document.getElementById('startingAddressInput'));
    autocomplete1.bindTo('bounds', map);

    autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('endingAddressInput'));
    autocomplete2.bindTo('bounds', map);

    autocomplete1.addListener('place_changed', function () {
        console.log("place changed");
        placeMarker('marker1');
    });

    autocomplete2.addListener('place_changed', function () {
        placeMarker('marker2');
    });
}

function placeMarker(markerName) {
    var input, autocomplete;
    if (markerName === 'marker1') {
        input = document.getElementById('startingAddressInput');
        autocomplete = autocomplete1;
    } else if (markerName === 'marker2') {
        input = document.getElementById('endingAddressInput');
        autocomplete = autocomplete2;
    }

    var place = autocomplete.getPlace();
    if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }

    // Get the map's bounds
    var bounds = map.getBounds();

    // Check if the marker's position is within the bounds of the map
    if (bounds && bounds.contains(place.geometry.location)) {
        if (markerName === 'marker1') {
            if (marker1) {
                marker1.setMap(null);
            }
            marker1 = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                draggable: false
            });
        } else if (markerName === 'marker2') {
            if (marker2) {
                marker2.setMap(null);
            }
            marker2 = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                draggable: false
            });
        }
    } else {
        // Move the map's center to fit the new marker's position
        map.setCenter(place.geometry.location);

        if (markerName === 'marker1') {
            if (marker1) {
                marker1.setMap(null);
            }
            marker1 = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                draggable: false
            });
        } else if (markerName === 'marker2') {
            if (marker2) {
                marker2.setMap(null);
            }
            marker2 = new google.maps.Marker({
                position: place.geometry.location,
                map: map,
                draggable: false
            });
        }
    }
    if (marker1 && marker2) {
        showRoute();

        // console.log("marker1", marker1.getPosition().lat(), marker1.getPosition().lng());
        // console.log("marker2", marker2.getPosition().lat(), marker2.getPosition().lng());
        // console.log("distance1  ", google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition()));

        starting_latitude_new = marker1.getPosition().lat();
        starting_longitude_new = marker1.getPosition().lng();

        ending_latitude_new = marker2.getPosition().lat();
        ending_longitude_new = marker2.getPosition().lng();

        var distance = google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition());

        console.log("starting_latitude", starting_latitude, "starting_longitude", starting_longitude);
        console.log("ending_latitude", ending_latitude, "ending_longitude", ending_longitude);
        console.log("distance", distance);


        calculateDistance();

    }
}

function showRoute() {
    if (!marker1 || !marker2) {
        alert("Please select both addresses.");
        return;
    }

    var request = {
        origin: marker1.getPosition(),
        destination: marker2.getPosition(),
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
}


function calculateDistance() {
    var origin = document.getElementById('startingAddressInput').value;
    var destination = document.getElementById('endingAddressInput').value;

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING', // You can specify other travel modes such as 'WALKING', 'BICYCLING', or 'TRANSIT'
            unitSystem: google.maps.UnitSystem.METRIC, // Change to METRIC for kilometers
            avoidHighways: false,
            avoidTolls: false
        },
        callback
    );
}

function callback(response, status) {
    if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;
                var from = origins[i];
                var to = destinations[j];

                distance_in_km = distance;
                final_distance = parseFloat(element.distance.value) / 1000;
                duration_in_minutes = duration;


                console.log('Distance from ' + from + ' to ' + to + ' is ' + distance + ' and it will take ' + duration + '.');
                // alert('Distance from ' + from + ' to ' + to + ' is ' + distance + ' and it will take ' + duration + '.');
            }
        }
    } else {
        window.alert('Error was: ' + status);
    }
}


var starting_latitude = 0;
var starting_longitude = 0;

var ending_latitude = 0;
var ending_longitude = 0;

var final_distance = 0.0;
var distance_in_km = 0;
var duration_in_minutes = 0;

var waypoints_list = [];
var waypoints_list1 = [];

function search() {

}


function findDistance(routeNo, startingLatitude, startingLongitude, endingLatitude, endingLongitude) {
    const startingLocation = { lat: startingLatitude, lng: startingLongitude }; // Example starting location (New York City)
    const endingLocation = { lat: endingLatitude, lng: endingLongitude }; // Example ending location (Los Angeles)
    waypoints_list = [];
    var differance = 0;



    try {
        fetch('http://127.0.0.1:8080/try2_war_exploded/getWaypoints?routeNo=' + routeNo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.waypoints.forEach(waypoint => {
                    console.log(waypoint);
                    waypoints_list.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                    waypoints_list1.push({ location: { lat: parseFloat(waypoint.latitude), lng: parseFloat(waypoint.longitude) }, stopover: true });
                    console.log("waypoints_list1", waypoints_list);
                });

            })
        console.log("waypoints_list2", waypoints_list);


        console.log("waypoints_list", waypoints_list);
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: startingLocation,
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

        var current_distance = 0;
        var after_distance = 0;

        // Define the request for directions
        var request = {
            origin: startingLocation,
            destination: endingLocation,
            waypoints: waypoints_list,
            optimizeWaypoints: true, // Optimize the order of waypoints
            travelMode: google.maps.TravelMode.DRIVING,
        };

        var request1 = {
            origin: startingLocation,
            destination: endingLocation,
            waypoints: waypoints_list1,
            optimizeWaypoints: true, // Optimize the order of waypoints
            travelMode: google.maps.TravelMode.DRIVING,
        };

        waypoints_list.push({ location: { lat: startingLatitude, lng: startingLongitude }, stopover: true });
        waypoints_list.push({ location: { lat: endingLatitude, lng: endingLongitude }, stopover: true });
        waypoints_list.push({ location: { lat: starting_latitude_new, lng: starting_longitude_new }, stopover: true });
        waypoints_list.push({ location: { lat: ending_latitude_new, lng: ending_longitude_new }, stopover: true });



        // Define the request for directions
        requestwithWaypoint = {
            origin: startingLocation,
            destination: endingLocation,
            waypoints: waypoints_list,
            optimizeWaypoints: true, // Optimize the order of waypoints
            travelMode: google.maps.TravelMode.DRIVING,
        };

        // Get the directions and display the route

        directionsService.route(request, function (response, status) {
            if (status === "OK") {
                // directionsRenderer.setDirections(response);
                var route = response.routes[0];
                let totalDistance = 0;
                for (const leg of route.legs) {
                    totalDistance += leg.distance.value; // Distance in meters
                }
                totalDistance /= 1000; // Convert meters to kilometers
                // current_distance = totalDistance;
                console.log("Waypoints 01", waypoints_list);
                console.log("Total Distance test 01: " + totalDistance.toFixed(2) + " km");
                after_distance = totalDistance.toFixed(2);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        })
            .then(() => {




                // Get the directions and display the route
                directionsService.route(request1, function (response, status) {
                    if (status === "OK") {
                        // directionsRenderer.setDirections(response);
                        var route2 = response.routes[0];
                        let totalDistance = 0;
                        for (const leg of route2.legs) {
                            totalDistance += leg.distance.value; // Distance in meters
                        }
                        totalDistance /= 1000; // Convert meters to kilometers
                        // after_distance = totalDistance;
                        console.log("Waypoints 02", waypoints_list);
                        console.log("Total Distance test 02: " + totalDistance.toFixed(2) + " km");
                        current_distance = totalDistance.toFixed(2);
                        console.log("current_distance", current_distance);
                    } else {
                        window.alert("Directions request failed due to " + status);
                    }

                })
                    .then(() => {
                        differance = after_distance - current_distance;
                        // console.log("differance", after_distance - current_distance);
                        // return (after_distance - current_distance);
                        // return differance;
                    })
            }
            )

        return differance;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

// async function displayVehicles() {
//     try {
//         // console.log("Inside Display vehicles", vehicles, vehicles[0]);
//         // document.getElementById("result1").innerHTML =vehicles;
//         let row = "";
//         for (let i = 0; i < vehicles.length; i++) {
//             // const vehicle = vehicles[i];
//             const response = await fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=' + 'CBA7454', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials: "include",
//             });
//             const data = await response.json();
//             const vehicleObject = data.vehicle;
//             row += `<tr>
//                         <td>${vehicleObject.vehicleNo}</td>
//                         <td>${vehicleObject.type}</td>
//                         <td>${vehicleObject.startTime}</td>
//                         <td>${vehicleObject.offTime}</td>
//                     </tr>`;
//         }
//         console.log("row", row);
//         document.getElementById("tbody").innerHTML = row;
//     } catch (error) {
//         console.error('Error occurred:', error);
//         // Handle error appropriately, e.g., show error message to the user
//     }
// }


function displayVehicles(Vehicle_List) {
    console.log("Vehicle_List", Vehicle_List[0]);

    var row = "";
    console.log("Vehicle_List", Vehicle_List);
    console.log("Vehicle_List", Vehicle_List[0]);
    console.log("Vehicle_List", Vehicle_List.length);

    console.log("length", Vehicle_List);
    Vehicle_List.forEach(vehicle => {
        fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=' + vehicle, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.vehicle);
                vehicleObject = data.vehicle;
                row += `<tr>
                    <td>${vehicleObject.vehicleNo}</td>
                    <td>${vehicleObject.type}</td>
                    <td>${vehicleObject.startTime}</td>
                    <td>${vehicleObject.offTime}</td>
                    <td><button class="request-button" onclick="requestVehicle(${vehicleObject.vehicleNo})">Request</button></td>
                </tr>`;
            })

    });

    document.querySelector(".table").innerHTML = row;
}


document.addEventListener("DOMContentLoaded", function () {
    const intervalId = setInterval(myFunction, 1000);

})
function myFunction() {
    // console.log('Function called');
    document.querySelector(".table").innerHTML = row_data;

}

function createRequest() {

    // var onTime = document.getElementById('pstartTime').value;
    // var offTime = document.getElementById('poffTime').value;
    // var type = document.getElementById('ptype').value;
    // var startingTime = document.getElementById('pstartTime').value;
    // var EndingTime = document.getElementById('poffTime').value;

    // Get references to the input elements
    var tripType = document.getElementById('ptype').value;
    var startTime = document.getElementById('pstartTime').value;
    var offTime = document.getElementById('poffTime').value;
    var startDate = document.getElementById('pstartDate').value;
    var endDate = document.getElementById('pendDate').value;

    var typeError = document.getElementById('ptype-error-message');
    var startTimeError = document.getElementById('pstartTime-error-message');
    var offTimeError = document.getElementById('poffTime-error-message');
    var startDateError = document.getElementById('pstartDate-error-message');
    var endDateError = document.getElementById('pendDate-error-message');    

    typeError.style.display = "none";
    startTimeError.style.display = "none";
    offTimeError.style.display = "none";
    startDateError.style.display = "none";
    endDateError.style.display = "none";

    // Print or display the reservation details
    console.log("Trip Type: " + tripType);
    console.log("Start Time: " + startTime);
    console.log("Off Time: " + offTime);
    console.log("Start Date: " + startDate);
    console.log("End Date: " + endDate);


    console.log("Inside create request");
    console.log("Vehicle No", requested_vehicle);
    console.log("Passenger Email", passengerEmail);
    console.log("starting_latitude_new", starting_latitude_new);
    console.log("starting_longitude_new", starting_longitude_new);
    console.log("ending_latitude_new", ending_latitude_new);
    console.log("ending_longitude_new", ending_longitude_new);
    console.log("distance_in_km", final_distance);
    console.log("duration_in_minutes", duration_in_minutes);

    // console.log("onTime", onTime);
    // console.log("offTime", offTime);
    // console.log("type", type);
    // console.log("startingTime", startingTime);
    // console.log("EndingTime", EndingTime);
    onTimeValidation(startTime);

    data = {
        vehicleNo: requested_vehicle,
        passengerEmail: passengerEmail,
        startingLatitude: starting_latitude_new,
        startingLongitude: starting_longitude_new,
        endingLatitude: ending_latitude_new,
        endingLongitude: ending_longitude_new,
        distance: final_distance,
        duration: duration_in_minutes,
        onTime: startTime,
        offTime: offTime,
        type: tripType,
        startingDate: startDate,
        endingDate: endDate
    }
    var checker = true;
    if (!tripType) {
        typeError.innerText = "Please enter a type.";
        typeError.style.display = "block";
        console.log("type error");
        checker = false;
    }
    if (tripType === "Morning") {
        if (!startTime) {
            startTimeError.innerText = "Please enter a starting time.";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
        else if(!onTimeValidation(startTime)){
            startTimeError.innerText = "Please enter time before 12.00 PM";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
    }
    if (tripType === "Evening") {
        if (!offTime) {
            offTimeError.innerText = "Please enter an off time.";
            offTimeError.style.display = "block";
            console.log("off time error");
            checker = false;
        }
        else if(onTimeValidation(offTime)){
            offTimeError.innerText = "Please enter time after 12.00 PM";
            offTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
    }
    if (tripType === "Both") {
        if (!startTime) {
            startTimeError.innerText = "Please enter a starting time.";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
        else if(!onTimeValidation(startTime)){
            startTimeError.innerText = "Please enter time before 12.00 PM";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
        if (!offTime) {
            offTimeError.innerText = "Please enter an off time.";
            offTimeError.style.display = "block";
            console.log("off time error");
            checker = false;
        }
        else if(onTimeValidation(offTime)){
            offTimeError.innerText = "Please enter time after 12.00 PM";
            offTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
    }
    if (!startDate) {
        startDateError.innerText = "Please enter a starting date.";
        startDateError.style.display = "block";
        console.log("starting date error");
        checker = false;
    }
    else if(!validateStartDate(startDate)){
        startDateError.innerText = "Starting date must be after today.";
        startDateError.style.display = "block";
        console.log("starting date error");
        checker = false;
    }
    if (!endDate) {
        endDateError.innerText = "Please enter an ending date.";
        endDateError.style.display = "block";
        console.log("ending date error");
        checker = false;
    }
    else if(!validateEndDate(startDate, endDate)){
        endDateError.innerText = "Ending date must be after starting date.";
        endDateError.style.display = "block";
        console.log("ending date error");
        checker = false;
    }
    

    if (checker) {

        console.log("Data", data);
        fetch('http://127.0.0.1:8080/try2_war_exploded/createRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data), credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if (data.message === "Registration successfully") {
                    Swal.fire({
                        title: "Requested successfully!",
                        icon: "success"
                    })
                        .then(() => {
                            togglePopup()
                        })
                }

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

}

function requestPopup(vehicleNo, passengerEmail) {
    console.log("Vehicle No", vehicleNo);
    console.log("Passenger Email", passengerEmail);
    requested_vehicle = vehicleNo

    const startTimeDiv = document.getElementById('pStartTimeDiv');
    const endTimeDiv = document.getElementById('pEndTimeDiv');

    startTimeDiv.style.display = 'none';
    endTimeDiv.style.display = 'none';

    const popup = document.getElementById("popup");
    popup.classList.toggle("active");

}

const typeToggle = document.getElementById('ptype');
typeToggle.addEventListener('change', function () {
    const startTimeDiv = document.getElementById('pStartTimeDiv');
    const endTimeDiv = document.getElementById('pEndTimeDiv');

    if (typeToggle.value === 'Morning') {
        startTimeDiv.style.display = 'block';
        endTimeDiv.style.display = 'none';
    } else if (typeToggle.value === 'Evening') {
        startTimeDiv.style.display = 'none';
        endTimeDiv.style.display = 'block';
    } else if (typeToggle.value === 'Both') {
        startTimeDiv.style.display = 'block';
        endTimeDiv.style.display = 'block';
    }
})

function onTimeValidation(startTime) {
    var timeParts = startTime.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var period = startTime.split(" ")[1]; // Extract AM/PM

    // Convert hours to 24-hour format if it's PM
    if (period === "PM" && hours < 12) {
        hours += 12;
    }

    // Check if the time is before or equal to 12:00 PM
    if (hours < 12 || (hours === 12 && minutes === 0)) {
        return true;
        // console.log("Time is on or before 12:00 PM");
        // Do something here if the time is on or before 12:00 PM
    } else {
        return false;
        // console.log("Time is after 12:00 PM");
        // Do something here if the time is after 12:00 PM
    }
}

function validateStartDate(startDateInput) {
    // Get today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare only dates

    // Get the starting and ending dates from the inputs
    var startDate = new Date(startDateInput);
    

    // Compare starting date with today
    if (startDate <= today) {
        console.log("Starting date must be after today.");
        return false;
        // You can display an error message or take other actions here
    }
    return true;    
}

function validateEndDate(startDateInput, endDateInput) {
    // Get today's date
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare only dates

    // Get the starting and ending dates from the inputs
    var startDate = new Date(startDateInput);
    var endDate = new Date(endDateInput);

    // Compare ending date with starting date
    if (endDate <= startDate) {
        console.log("Ending date must be after starting date.");
        return false;
        // You can display an error message or take other actions here
    }
    return true;
}
