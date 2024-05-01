// const { describe } = require("node:test");

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
                if(data.reservations == "No reservations"){
                    Swal.fire({
                        title: "No Reservations!",
                        icon: "error"
                    })
                    .then(()=>
                    window.location.href = "../dashboard.html"
                    )
                    // alert("No reservations")
                    //TO BE HANDLE
                }
                else{
                    console.log(data);
                    while (i < data.reservations.length) {
                        reservation = data.reservations[i];
                        vehicle = data.vehicles[i];
                        console.log("reservation: "+reservation);
                        console.log("vehicle : "+vehicle.vehicleNo);
                        row += `<tr>
                            <td>${vehicle.vehicleNo}</td>
                            <td>${vehicle.type}</td>
                            <td>${vehicle.model}</td>
                            <td>${reservation.startingDate}</td>
                            <td>${reservation.endingDate}</td>
                            <td><span class="status ${reservation.status.toLowerCase()}">${reservation.status}</span></td>`
                            if(reservation.status.toLowerCase == "pending"){
                                row += `<td><button class="btn more-btn" onclick="vehicleLocation('${reservation.reservationId}')" disable>Vehicle Location</button></td>
                                </tr>`
                            }
                            else{
                             row+=`<td><button class="btn more-btn" onclick="vehicleLocation('${reservation.reservationId}')">Vehicle Location</button></td>
                        </tr>`;
                            }
                        i++;
                        
                    }


                    document.querySelector(".tbody").innerHTML = row; 
                }  

            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


function vehicleLocation(reservationId){
    
    console.log(reservationId);
    fetch('http://127.0.0.1:8080/try2_war_exploded/liveLocation?reservationId='+reservationId,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include", })
        .then(response => response.json())
        .then(data => {
            console.log(data.trackId);
            if(data.trackId > 0){
                const popup = document.getElementById("popup");
                popup.classList.toggle("active");
            }
            else{
                Swal.fire({
                    title: "Vehicle is not on the move!",
                    describe: "Vehicle is not on the move",
                    icon: "error"
                })
            }
            
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function togglePopup(){
    document.getElementById("popup").classList.toggle("active");
    popupData = `<div class="popup-content">
            <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
    
            <p class="topic">Driver Details</p>       
            
            <div class="detail-box">
              <div class="image">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" id="default-pic">
    
                <a href="driverLicense">Show Driver License</a>
              </div>
    
              <form action="">
                <div class="input-box">
                  <span class="details">Driver ID</span>
                  <input disabled type="text" class="driverID" name="driverID" placeholder="${driver.id}">
                </div>
                <div class="input-box">
                    <span class="details">Driver Name</span>
                    <input disabled type="text" class="driverName" value name="driverName" placeholder="${driver.name}">
                </div>
                <div class="input-box">
                    <span class="details">NIC No</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${driver.NIC}">
                </div>
                <div class="input-box">
                    <span class="details">Age</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${driver.age}">
                </div>
                <div class="input-box">
                    <span class="details">Email</span>
                    <input disabled type="email" class="email" value name="email" placeholder="${driver.email}">
                </div>
                <div class="input-box">
                  <span class="details">Telephone</span>
                  <input disabled type="number" class="Telephone" value name="Telephone" placeholder="${driver.contact}">
                </div>
                <div class="input-box">
                    <span class="details">Owner Name</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${owner.name}">
                </div>
                <div class="input-box">
                    <span class="details">Owner Email</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${owner.email}">
                </div>

                <div class="input-box">
                    <span class="details">Registered Date</span>
                    <input disabled type="date" class="reg-date" value name="reg-date" placeholder="">
                </div>

                          
              </form>
            </div>       
          </div>`

        document.getElementById("popup").innerHTML = popupData;
}