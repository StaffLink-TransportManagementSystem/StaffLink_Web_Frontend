
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

    let row = `<select name="" id="" class="Select-reservation">
    <option value="Reservaton" selected disabled>Select relevant Reservation</option>`;

    fetch('http://127.0.0.1:8080/try2_war_exploded/getReservationsByPassenger?passengerEmail=' + passengerEmail, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            let i = 0;
            let reservation = "";
            let vehicle = "";
            if (data.reservations == "No reservations") {
                Swal.fire({
                    title: "No Reservations!",
                    icon: "error"
                })
                    .then(() =>
                        window.location.href = "../dashboard.html"
                    )
                //TO BE HANDLE
            }
            else {
                row = `<select name="Reservation" id="Reservation-name" class="type">
                    <option class="default" selected disabled value>Select the Reservation</option>`
                console.log(data);
                while (i < data.reservations.length) {
                    reservation = data.reservations[i];
                    vehicle = data.vehicles[i];
                    console.log("reservation: " + reservation);
                    console.log("vehicle : " + vehicle.vehicleNo);
                    row += `<option value="${reservation.reservationId}">${reservation.vehicleNo} (${vehicle.type})</option>`;
                    i++;
                }

                row += `</select>`;


                document.querySelector(".reservation-dropdown").innerHTML = row;
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });

        fetch('http:////127.0.0.1:8080/try2_war_exploded/getAbasntsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                console.log(data.absents);
                let row = "";
                data.absents.forEach(absent => {
                    row += `<tr>
                    <td>${absent.id}</td>
                    <td>${absent.reservationId}</td>
                    <td>${absent.daysOfAbsent}</td>
                    <td>${absent.startingDate}</td>
                    <td>${absent.endingDate}</td>
                    </tr>`
                });
                document.querySelector(".tbody").innerHTML = row;
            })
            .catch(error => {
                console.error('Error:', error);
            });
});


function createAbsent() {

    // e.preventDefault();
    // alert("Absent Added!");
    console.log("form submitted");
    // const form = document.getElementById('form');
    var vehicleNo = document.getElementById('Reservation-name').value;
    var daysOfAbsant = document.querySelector('.daysOfAbsent').value;
    var startingDate = document.querySelector('.startingDate').value;

    console.log(vehicleNo);

    var checker = true;
    var vehicleNoError = document.getElementById("reservation-error-message");
    var daysOfAbsantError = document.getElementById("daysOfAbsent-error-message");
    var startingError = document.getElementById("startingDate-error-message");

    vehicleNoError.style.display = "none";
    daysOfAbsantError.style.display = "none";
    startingError.style.display = "none";

    if (!vehicleNo) {
        vehicleNoError.innerHTML = "Please select a reservation";
        vehicleNoError.style.display = "block";
        checker = false;
    }
    if (!daysOfAbsant) {
        daysOfAbsantError.innerHTML = "Please enter the number of days of absence";
        daysOfAbsantError.style.display = "block";
        checker = false;
    }
    if (!startingDate) {
        startingError.innerHTML = "Please enter the starting date";
        startingError.style.display = "block";
        checker = false;
    }
    else {
        var date = new Date(startingDate);
        var today = new Date();
        if (date < today) {
            startingError.innerHTML = "Starting date should be a future date";
            startingError.style.display = "block";
            checker = false;
        }
    }

    const data = {
        passengerEmail: passengerEmail,
        daysOfAbsent: daysOfAbsant,
        startingDate: startingDate,
        reservationId: vehicleNo
    }
    console.log(data);
    if (checker) {
        // alert("Absent Added!");
        fetch('http://127.0.0.1:8080/try2_war_exploded/addAbsent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            if (data.message == "Registration successfully") {
                Swal.fire({
                    title: "Absent Added!",
                    icon: "success"
                }).then(() => {
                    location.reload();
                })
            }
            else {
                Swal.fire({
                    title: "Absent Adding Failed!",
                    icon: "error"
                }).then(() => {
                    location.reload();
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


}
