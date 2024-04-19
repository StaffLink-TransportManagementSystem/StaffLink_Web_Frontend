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
                <td class="Name">`+ reservation.vehicleNo +`</td>
                <td class="contact">`+ reservation.startingDate +`</td>
                <td class="contact">`+ reservation.endingDate +`</td>
                <td class="contact">`+ reservation.startingWaypoint +`</td>
                <td class="contact">`+ reservation.endingWaypoint +`</td>`
                i++;
            }
            

            document.querySelector(".tbody").innerHTML = row;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});