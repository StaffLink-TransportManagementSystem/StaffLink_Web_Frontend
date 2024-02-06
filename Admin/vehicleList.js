document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[vehicleList]")


    let email = "rhatu2000@gmail.com";
  
    let row ="";
    let users = []

    fetch('http://localhost:8080/try2_war_exploded/viewAllVehicle',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                data.list.forEach(vehical => {
                row += `<tr  id="${vehical.vehicleNo}">
                        <td scope="owner" data-label="P ID">`+ vehical.ownerEmail +`</td>
                        <td class="Name">`+ vehical.vehicleNo +`</td>
                        <td class="NIC">`+ vehical.vehicleBrand +`</td>
                        <td class="Telephone">`+ vehical.type +`</td>
                        <td class="Email">`+ vehical.driverEmail +`</td>
                        <td class="Telephone">`+ vehical.seatsCount +`</td>
                        <td class="Email">`+ vehical.trips +`</td>
                        <td class="Email">`+ vehical.startingPoint +`</td>
                        <td class="Email">`+ vehical.endingPoint +`</td>
                        <td class="Action">
                            <a href="#moredetails"><button class="more-btn">MORE</button></a>
                            <a href="editVehical.html?vehicleNo=`+ vehical.vehicleNo +`" onclick="updatefunction(vehical.ownerEmail,vehical.vehicleNo,vehical.regNo,vehical.vehicleBrand,vehical.type,vehical.driverEmail,vehical.seatsCount,vehical.trips,vehical.startingPoint,vehical.endingPoint)"><button class="edit-btn">EDIT</button></a>
                            <a href="deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo +`" onclick=""><button class="delete-btn">DELETE</button></a>
                        </td>
                    </tr>`
                });
                users = data.list;

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            searchInput.addEventListener("input", e => {
                const value = e.target.value.toLowerCase();
                users.forEach(data => {
                    const isVisible =
                        data.ownerEmail.toLowerCase().includes(value) ||
                        data.vehicleNo.toLowerCase().includes(value) ||
                        data.regNo.toLowerCase().includes(value) ||
                        data.vehicleBrand.toLowerCase().includes(value) ||
                        data.type.toLowerCase().includes(value) ||
                        data.startingPoint.toLowerCase().includes(value) ||
                        data.endingPoint.toLowerCase().includes(value)
   
                        document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
                });
            });
    
  });


function AddVehicle() {
    window.location.href = "./addVehical.html";
}
