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
    
    passengerEmail = payload.id;
  
    let row ="";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getReservationsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let reservation = "";
                let vehicle = "";
                if(data.reservation == "No reservations"){
                    alert("No reservations")
                    //TO BE HANDLE
                }
                else{
                    while (i < data.reservations.length) {
                        reservation = data.reservations[i];
                        vehicle = data.vehicles[i];
                        row += `<tr>
                            <td>${vehicle.vehicleNo}</td>
                            <td>${vehicle.type}</td>
                            <td>${vehicle.model}</td>
                            <td>${reservation.startingDate}</td>
                            <td>${reservation.endingDate}</td>
                            <td><span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span></td>
                        </tr>`;
                        i++;
                    }


                    document.querySelector(".tbody").innerHTML = row; 
                }  

            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


// function deleteRequest(vehicleNo, passengerEmail) {
//     console.log("delete request");
//     console.log(vehicleNo);
//     console.log(passengerEmail);

//     let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };
//     fetch('http://localhost:8080/try2_war_exploded/requestDelete', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }, body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             if (data.message == "Request successfully") {
//                 Swal.fire({
//                     title: "Request Deleted!",
//                     icon: "success"
//                 }).then(() => {
//                     location.reload();
//                 })
//             }
//             location.reload();
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }
