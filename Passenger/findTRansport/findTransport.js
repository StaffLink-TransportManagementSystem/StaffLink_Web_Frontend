document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        sub = document.querySelector(".sub");

    sub.addEventListener("click", () => {
        console.log("form submitted");
        // Get form elements
        const startingLocation = form.querySelector('.startLocation').value;
        const endingLocation = form.querySelector('.endLocation').value;
        const type = form.querySelector('.type').value;
        const startingTime = form.querySelector('.startTime').value;
        const EndingTime = form.querySelector('.offTime').value;

        var checker = true;

        var startLocationError = document.querySelector(".startLocation-error-message");
        var endLocationError = document.querySelector(".endLocation-error-message");
        var typeError = document.querySelector(".type-error-message");
        var startTimeError = document.querySelector(".startTime-error-message");
        var offTimeError = document.querySelector(".offTime-error-message");

        startLocationError.style.display = "none";
        endLocationError.style.display = "none";
        typeError.style.display = "none";
        startTimeError.style.display = "none";
        offTimeError.style.display = "none";

        if (!startingLocation) {
            startLocationError.innerText = "Please enter a starting location.";
            startLocationError.style.display = "block";
            console.log("starting location error");
            checker = false;
        }
        if (!endingLocation) {
            endLocationError.innerText = "Please enter an ending location.";
            endLocationError.style.display = "block";
            console.log("ending location error");
            checker = false;
        }
        if (!type) {
            typeError.innerText = "Please enter a type.";
            typeError.style.display = "block";
            console.log("type error");
            checker = false;
        }
        if (!startingTime) {
            startTimeError.innerText = "Please enter a starting time.";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
        if (!EndingTime) {
            offTimeError.innerText = "Please enter an off time.";
            offTimeError.style.display = "block";
            console.log("off time error");
            checker = false;
        }

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
            fetch('http://127.0.0.1:8080/try2_war_exploded/findTransport', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include"
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.message);
                        data.list.forEach(vehical => {
                            const resultDiv = document.createElement("div");
                            resultDiv.classList.add("result-item");
                            resultDiv.innerHTML = `<p>Transport Vehicle No: ${vehical.vehicleNo}</p>
                                 <p>Transport Type: ${vehical.type}</p>
                                 <p>Departure Time: ${vehical.startTime}</p>
                                 <p>Arrival Time: ${vehical.offTime}</p>`;

                            // Add request and details buttons
                            const buttonsDiv = document.createElement("div");
                            buttonsDiv.classList.add("result-buttons");
                            const requestButton = document.createElement("button");
                            requestButton.classList.add("request-button");
                            requestButton.innerText = "Request";
                            const detailsButton = document.createElement("button");
                            detailsButton.classList.add("details-button");
                            detailsButton.innerText = "More Details";

                            buttonsDiv.appendChild(requestButton);
                            buttonsDiv.appendChild(detailsButton);
                            resultDiv.appendChild(buttonsDiv);

                            resultsContainer.appendChild(resultDiv);
                            // row += ``;
                        });
                        document.querySelector(".table").innerHTML = row;
                    })

            })
                .catch(error => {
                    console.log(error);
                })
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    let tripTypeSelect = document.querySelector(".type");
    let startingTimeInput = document.querySelector(".starting-time");
    let endingTimeInput = document.querySelector(".ending-time");

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

        console.log("marker1", marker1.getPosition().lat(), marker1.getPosition().lng());
        console.log("marker2", marker2.getPosition().lat(), marker2.getPosition().lng());
        console.log("distance1  ", google.maps.geometry.spherical.computeDistanceBetween(marker1.getPosition(), marker2.getPosition()));
        
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

                console.log('Distance from ' + from + ' to ' + to + ' is ' + distance + ' and it will take ' + duration + '.');
                // alert('Distance from ' + from + ' to ' + to + ' is ' + distance + ' and it will take ' + duration + '.');
            }
        }
    } else {
        window.alert('Error was: ' + status);
    }
}