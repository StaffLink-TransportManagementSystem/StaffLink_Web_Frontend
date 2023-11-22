document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    sub = document.querySelector(".sub");
    console.log("vehicles");
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllVehicle',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(vehical => {
                row += `<div class="vehicle-card vehicle-card-blue" style="--vehicle-card-color: #F5AF41;">
                <div class="vehicle-card-innerbox">
                    <img class="vehicle-card-img" src="../images/Bus/bus4.jpg" />
                    <div class="vehicle-card-textbox">
                        <div class="vehicle-card-title">`+ vehical.vehicleNo +`</div>
                        <div class="vehicle-card-subtitle">`+ vehical.type +`</div>
                        <div class="vehicle-card-bar"></div>
                        <div class="vehicle-card-description">
                            <b>Vehicle Brand : </b>`+ vehical.vehicleBrand +`<br>
                            <b>Vehicle Model : </b> `+ vehical.model +`<br>
                            <b>Vehicle Trips : </b> `+ vehical.trips +`<br>
                            <b>Vehicle Seat Count : </b>`+vehical.seatsCount+`<br>
                            <b>Vehicle Starting Point : </b> `+ vehical.startingPoint +`<br>
                            <b>Vehicle Ending Point : </b>`+vehical.endingPoint+`<br>
                            <div class="group">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="http://127.0.0.1:5501/Owner/editVehical.html?vehicleNo=`+ vehical.vehicleNo +`" onclick="updatefunction(vehical.ownerEmail,vehical.vehicleNo,vehical.regNo,vehical.vehicleBrand,vehical.type,vehical.driverEmail,vehical.seatsCount,vehical.trips,vehical.startingPoint,vehical.endingPoint)"><button class="edit">EDIT</button></a>
                            <a href="http://127.0.0.1:5501/Owner/deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo +`" onclick=""><button class="delete">DELETE</button></a>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>`
                });

                document.querySelector(".vehicleSet").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });