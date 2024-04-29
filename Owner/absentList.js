document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        tbody = document.querySelector(".tbody");

    // let vehicle = "CBA-1257";
    const vehicleNo = window.location.href.split("=")[1];


    let row = "";

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAbasntListByVehicle?vehicleNo='+vehicleNo, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.size == 0) {
                Swal.fire({
                    title: "No Absents!",
                    icon: "warning",
                  }).then(()=>{
                    window.location.href = "vehicles.html";
                  })
                }
            else {
                data.list.forEach(absents => {
                    row += `<tr>
                        <td class="Name">`+ absents.passengerEmail + `</td>
                        <td class="Name">`+ absents.reservationId + `</td>
                        <td class="NIC">`+ absents.daysOfAbsent + `</td>
                        <td class="age">`+ absents.startingDate + `</td>
                        <td class="contact">`+ absents.endingDate + `</td>
                        
                        <td class="Action">
                            <a href="#moredetails"><button class="more-btn">VIEW LOCATION</button></a>
                        </td>
                    </tr>`
                });


                document.getElementById("tbody").innerHTML = row;
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });

});
