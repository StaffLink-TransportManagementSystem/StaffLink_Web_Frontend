var ownerList = [];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[ownerList]")
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllOwner',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                ownerList = data.list;
                console.log("Owner data",data.list)
                data.list.forEach(owner => {
                row += `<tr  id="${owner.NIC}">
                        <td scope="email" data-label="P ID" class="email">`+ owner.email +`</td>
                        <td class="Name">`+ owner.name +`</td>
                        <td class="NIC">`+ owner.NIC +`</td>
                        
                        
                        <td class="Action">
                            <button class="more-btn" onclick="togglePopup1(${owner.id})">MORE</button>
                            <a href="editOwner.html?email=`+ owner.email +`" onclick="updatefunction(owner.email,owner.name,owner.NIC,owner.contact)"><button class="edit-btn">EDIT</button></a>
                            <a href="deleteOwner.html?email=`+ owner.email +`" onclick=""><button class="delete-btn">DELETE</button></a>
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
                        data.name.toLowerCase().includes(value) ||
                        data.email.toLowerCase().includes(value) ||
                        data.NIC.toLowerCase().includes(value)
   
                        document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
                });
            });
    
  });


function AddVehicleOwner() {
    window.location.href = "./addOwner.html";
}

//   function updatefunction(vehicleNo){
//         window.location.href = "http://127.0.0.1:5501/Owner/editVehical.html?vehicleNo="+vehicleNo;
//   }
  







// function fetchAllData() {
//     fetch('http://127.0.0.1:15000/ecoswapperbackend_war/admin/centers', {
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


function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < ownerList.length; i++) {
        if (ownerList[i].id == id) {
            var owner = ownerList[i];
        
            popupData = `<div class="popup-content">
            <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
    
            <p class="topic">Vehicle Owner Details</p>       
            
            <div class="detail-box">
              <div class="image">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" id="default-pic">
              </div>
    
              <form action="">
                <div class="input-box">
                  <span class="details">Owner ID</span>
                  <input disabled type="text" class="passengerID" name="passengerID" placeholder="${owner.id}">
                </div>
                <div class="input-box">
                    <span class="details">Vehicle Owner Name</span>
                    <input disabled type="text" class="ownerName" value name="ownerName" placeholder="${owner.name}">
                </div>
                <div class="input-box">
                    <span class="details">NIC No</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${owner.NIC}">
                </div>
                <div class="input-box">
                    <span class="details">Email</span>
                    <input disabled type="email" class="email" value name="email" placeholder="${owner.email}">
                </div>
                <div class="input-box">
                  <span class="details">No of Vehicles</span>
                  <input disabled type="number" class="vehicleCount" value name="vehicleCount" placeholder="${owner.vehicleCount}">
                </div>
                <div class="input-box">
                  <span class="details">No of Drivers</span>
                  <input disabled type="number" class="driverCount" value name="driverCount" placeholder="${owner.driverCount}">
                </div>
                <div class="input-box">
                    <span class="details">Telephone</span>
                    <input disabled type="number" class="Telephone" value name="Telephone" placeholder="${owner.contact}">
                </div>
                <div class="input-box">
                  <span class="details">Registered Date</span>
                  <input disabled type="date" class="regDate" value name="regDate">
                </div>
              </form>
            </div>       
          </div>`

          document.getElementById("popup").innerHTML = popupData;
                    
        }
    }
}