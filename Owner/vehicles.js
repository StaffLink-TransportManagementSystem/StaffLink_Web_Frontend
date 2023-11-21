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
                            <b>Vehicle Registration No : </b> `+ vehical.regNo +`<br>
                            <b>Vehicle Driver : </b>`+vehical.driverEmail+`<br>
                            <b>Vehicle Trips : </b> `+ vehical.trips +`<br>
                            <b>Vehicle Seat Count : </b>`+vehical.seatsCount+`<br>
                            <b>Vehicle Starting Point : </b> `+ vehical.startingPoint +`<br>
                            <b>Vehicle Ending Point : </b>`+vehical.endingPoint+`<br>
                            <div class="group">
                              <a href="./editVehical.html"><button class="button">Edit</button></a>
                                <button class="button">Remove</button>
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