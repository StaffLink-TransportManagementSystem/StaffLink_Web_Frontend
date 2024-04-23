var onTripStatus = 'notontrip';
var driverEmail;

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

    const email = payload.id;
    driverEmail = payload.id;
    console.log("driver",driverEmail);
    const onTrip = payload.onTrip;
    console.log("onTrip", onTrip);
    

    console.log("email", email);

    fetch("http://127.0.0.1:8080/try2_war_exploded/checkOnTrip?email=" + email, {
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
            }
        })
        .catch(error => {
            console.error('Error:', error);


        })



    var row = "";

    fetch("http://127.0.0.1:8080/try2_war_exploded/getPaymentCollection?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Payment data", data.paymentCollection)
            data.paymentCollection.forEach(payment => {
                row += `
                    <tr>
                    <td>${payment.passengerName}</td>
                    <td>${payment.amount}</td>`

                if (payment.paymentStatus.toLowerCase() == "pending") {
                    row += `<td class="Action">
                        <button class="edit-btn" onclick=collectedMoney(${payment.id})>Collect Money</button>
                        </td>`
                }
                if (payment.paymentStatus.toLowerCase() == "paid") {
                    row +=
                        `<td class="Action">
                            <button class="add-btn" disable>Collected</button>
                        </td>  `
                }
                row += `</tr>`
            });

            document.querySelector(".tbody2").innerHTML = row;

        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function collectedMoney(id) {
    console.log("collect money")
    // console.log(id)
    // alert("Money Collected"+id);
    data = {
        id: id,
        status: "Paid"
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Money Collected!"
    }).then((result) => {

        if (result.isConfirmed) {
            fetch("http://127.0.0.1:8080/try2_war_exploded/updatePassengerPayment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include", body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Payment data", data.message)
                    if (data.message == "Payment Successful") {
                        Swal.fire({
                            title: 'Payment Successful',
                            text: 'Money Collected Successfully',
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        }).then(function () {
                            location.reload();
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Payment Failed',
                            text: 'Money Collection Failed',
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        }).then(function () {
                            location.reload();
                        });
                    }

                })
        }


    });


}


function seeMoneyCollection() {
    window.location.href = "money_collectin.html";
}


function startTrip() {
    // tripbutton = document.getElementById("startTrip");
    // tripbutton.innerHTML = "End Trip";
    // tripbutton.setAttribute("onclick", "endTrip()");
    // tripbutton.classList.change("add-btn");
    console.log("Trip Starting ...");


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

    fetch("http://127.0.0.1:8080/try2_war_exploded/createTrip?email="+email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Trip data", data.message);
            if(data.message == "Trip Created"){
                console.log("Trip Created successfully");
                Swal.fire({
                    title: "Trip Started!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "./tripDirections.html";
                  })
                // Swal.fire({
                //     title: 'Trip Started',
                //     text: 'Your trip has been started',
                //     icon: 'success',
                //     confirmButtonText: 'Ok'
                // }).then(function () {
                //     console.log("Trip Started successfully");
                //     window.location.href = "tripDirections.html";
                //     //need to implement

                // });
            }
            else if(data.message == "Driver is already on a trip"){
                Swal.fire({
                    title: 'Already on a trip',
                    text: 'Your trip is already started',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    console.log("Trip Already Started");
                    window.location.href = "./tripDirections.html";
                    //need to implement

                });
            }
            else{
                Swal.fire({
                    title: 'Trip Failed',
                    text: 'Trip Creation Failed',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    location.reload();
                });
            }

        })
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Display alert with latitude and longitude
            console.log("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);

            fetch("http://127.0.0.1:8080/try2_war_exploded/liveLocationUpdate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include", body: JSON.stringify({
                    email: email,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Location data", data.message);

                })
        });
    } else {
        Swal.fire({
            title: 'Location Service Error',
            text: 'Geolocation is not supported by this browser',
            icon: 'error',
            confirmButtonText: 'Ok'
        }).then(function () {
            location.reload();
        });
    }

}

function endTrip() {
    console.log("Trip Ending ...");

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

    fetch("http://127.0.0.1:8080/try2_war_exploded/endTrip?email="+email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Trip data", data.message);
            if(data.message == "Trip Ended"){
                Swal.fire({
                    title: "Trip Ended!",
                    icon: "success"
                  }).then(()=>{
                    window.location.href = "./dashboard.html";
                  })
                // Swal.fire({
                //     title: 'Trip Started',
                //     text: 'Your trip has been started',
                //     icon: 'success',
                //     confirmButtonText: 'Ok'
                // }).then(function () {
                //     console.log("Trip Started successfully");
                //     window.location.href = "tripDirections.html";
                //     //need to implement

                // });
            }
            else if(data.message == "All passengers are not picked"){
                Swal.fire({
                    title: 'Passenger not picked',
                    text: 'All passengers are not picked',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    console.log("Passenger Not Picked");
                    window.location.href = "./tripDirections.html";
                    //need to implement

                });
            }

            else if(data.message == "No ongoing trip found"){
                Swal.fire({
                    title: 'Not on a trip',
                    text: 'Your trip is not started',
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    console.log("Trip Not Started");
                    window.location.href = "./dashboard.html";
                    //need to implement

                });
            }
            else{
                Swal.fire({
                    title: 'Something went wrong!',
                    text: 'Trip ending Failed',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    location.reload();
                });
            }

        })
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