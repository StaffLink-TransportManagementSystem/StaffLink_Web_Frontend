document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllVehicle',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(vehical => {
                row += `<tr>
                        <td scope="owner" data-label="P ID">`+ vehical.ownerEmail +`</td>
                        <td class="Name">`+ vehical.vehicleNo +`</td>
                        <td class="Address">`+ vehical.regNo +`</td>
                        <td class="NIC">`+ vehical.vehicleBrand +`</td>
                        <td class="Telephone">`+ vehical.type +`</td>
                        <td class="Email">`+ vehical.driverEmail +`</td>
                        <td class="Telephone">`+ vehical.seatsCount +`</td>
                        <td class="Email">`+ vehical.trips +`</td>
                        <td class="Email">`+ vehical.startingPoint +`</td>
                        <td class="Email">`+ vehical.endingPoint +`</td>
                        <td class="Action">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="http://127.0.0.1:5501/Admin/editVehical.html?vehicleNo=`+ vehical.vehicleNo +`" onclick="updatefunction(vehical.ownerEmail,vehical.vehicleNo,vehical.regNo,vehical.vehicleBrand,vehical.type,vehical.driverEmail,vehical.seatsCount,vehical.trips,vehical.startingPoint,vehical.endingPoint)"><button class="edit">EDIT</button></a>
                            <a href="http://127.0.0.1:5501/Admin/deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });