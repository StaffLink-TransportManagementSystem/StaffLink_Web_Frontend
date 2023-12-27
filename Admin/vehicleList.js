document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    let email = "rhatu2000@gmail.com";
  
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
                            <a href="editVehical.html?vehicleNo=`+ vehical.vehicleNo +`" onclick="updatefunction(vehical.ownerEmail,vehical.vehicleNo,vehical.regNo,vehical.vehicleBrand,vehical.type,vehical.driverEmail,vehical.seatsCount,vehical.trips,vehical.startingPoint,vehical.endingPoint)"><button class="edit">EDIT</button></a>
                            <a href="deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });


function AddVehicle() {
    window.location.href = "./addVehical.html";
}

//   function updatefunction(vehicleNo){
//         window.location.href = "http://localhost:5501/Owner/editVehical.html?vehicleNo="+vehicleNo;
//   }
  







// function fetchAllData() {
//     fetch('http://localhost:15000/ecoswapperbackend_war/admin/centers', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 console.error('Error:', response.status);
//             }
//         })
//         .then(data => {
//             displayDataAsTable(data);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }


// fetchAllData();

// function displayDataAsTable(data) {
//     const tableBody = document.querySelector("#dataTable tbody");

//     data.forEach(center => {
//         const row = document.createElement("tr");

//         row.innerHTML = `
//             <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
//             <td>${center.center_id}</td>
//             <td>${center.business_name}</td>
//             <td>${center.business_reg_no}</td>
//             <td>${center.business_type}</td>
//             <td>${center.center_bio}</td>
//             <td>${center.center_location_link}</td>
//             <td>
//                 <span class="icon-container">
//                     <i class="fas fa-pencil-alt" style="color: #ff0202"></i>
//                 </span>
//                 <span class="icon-container" style="margin-left: 10px;"> <!-- Adjust the margin as needed -->
//                     <i class="fas fa-trash-alt" style="color: #ff0202"></i>
//                 </span>
//             </td>
//         `;

//         tableBody.appendChild(row);
//     });
// }