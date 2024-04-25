var startingLatitute;
var startingLongitude;
var endingLatitute;
var endingLongitude;
let passengerEmail;

const form = document.querySelector("form");

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
    let vehicleNo = window.location.href.split("=")[1];

    const form = document.querySelector("form");

    let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };

    fetch('http://127.0.0.1:8080/try2_war_exploded/getRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: "include",
    })
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

            form.querySelector(".ontime").value = data.Request.onTime;
            form.querySelector(".offTime").value = data.Request.offTime;

            // form.querySelector(".triptype").value = data.Request.type;
            // form.querySelector(".startTime").value = data.Request.onTime;
            // form.querySelector(".offTime").value = data.Request.offTime;

            startingLatitute = data.Request.startingLatitude;
            startingLongitude = data.Request.startingLongitude;
            endingLatitute = data.Request.endingLatitude;
            endingLongitude = data.Request.endingLongitude;
            initMap();

            fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicle?vehicleNo=' + data.Request.vehicleNo, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include",
            })
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


function updatefunction() {
    const form = document.querySelector("form");
    var typeError = form.querySelector("type-error-message");
    var startDateError = form.querySelector(".startingDate-error-message");
    var endDateError = form.querySelector(".endingDate-error-message");
    var startTimeError = form.querySelector(".ontime-error-message");
    var offTimeError = form.querySelector(".offTime-error-message");


    if (validUpdate()) {
        let data = {
            id: form.querySelector(".id").value,
            vehicleNo: form.querySelector(".vehicleNo").value,
            passengerEmail: passengerEmail,
            amount: form.querySelector(".amount").value,
            startingDate: form.querySelector(".startingDate").value,
            endingDate: form.querySelector(".endingDate").value,
            status: form.querySelector(".tripStatus").value,
            type: document.getElementById("type").value,
            onTime: form.querySelector(".ontime").value,
            offTime: form.querySelector(".offTime").value,
            startingLatitude: startingLatitute,
            startingLongitude: startingLongitude,
            endingLatitude: endingLatitute,
            endingLongitude: endingLongitude

        };

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
                    }).then(() =>
                        window.location.href = "./index.html"
                    )
                    // window.location.href = "./index.html";
                } else {
                    Swal.fire({
                        title: "Update Failed!",
                        icon: "error"
                    })
                        .then(() =>
                            window.location.href = "./index.html"
                        )
                    // alert("Request update failed");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
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

    console.log("staring loca", location1);
    console.log("end" + location2);

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
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            // Display the route on the map
            directionsRenderer.setDirections(result);
        } else {
            console.error('Error:', status);
        }
    });
}

function validUpdate(){
    var startDate = form.querySelector(".startingDate").value;
    var endDate = form.querySelector(".endingDate").value;
    var type = document.getElementById("type").value;
    var startTime = form.querySelector(".ontime").value;
    var offTime = form.querySelector(".offTime").value;

    var typeError = form.querySelector("type-error-message");
    var startDateError = form.querySelector(".startingDate-error-message");
    var endDateError = form.querySelector(".endingDate-error-message");
    var startTimeError = form.querySelector(".ontime-error-message");
    var offTimeError = form.querySelector(".offTime-error-message");

    // typeError.style.display = "none";
    // startDateError.style.display = "none";
    // endDateError.style.display = "none";
    // startTimeError.style.display = "none";
    // offTimeError.style.display = "none";

    // typeError.style.display = "none";
    // startDateError.style.display = "none";
    // endDateError.style.display = "none";
    // startTimeError.style.display = "none";
    // offTimeError.style.display = "none";

    var checker = true;
    if (!type) {
        typeError.innerText = "Please enter a type.";
        typeError.style.display = "block";
        console.log("type error");
        checker = false;
    }
    if (type === "Morning") {
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
    if (type === "Evening") {
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
    if (type === "Both") {
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

    return checker;

}

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

document.getElementById("type").addEventListener("change", function () {
    var tripType = this.value;

    if (tripType === "Morning") {
        console.log("Morning");
        document.getElementById("onTimeBlock").style.display = "block";
        document.getElementById("offTimeBlock").style.display = "none";
    }
    if (tripType === "Evening") {
        console.log("Evening");
        document.getElementById("onTimeBlock").style.display = "none";
        document.getElementById("offTimeBlock").style.display = "block";
    }
    if (tripType === "Both") {
        console.log("Both");
        document.getElementById("onTimeBlock").style.display = "block";
        document.getElementById("offTimeBlock").style.display = "block";
    }
});