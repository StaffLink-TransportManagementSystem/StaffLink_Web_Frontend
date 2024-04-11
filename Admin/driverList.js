var driverList = [];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[Drivers]")

    let row = "";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllDriver', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            driverList = data.list;
            data.list.forEach(driver => {
                row += `<tr  id="${driver.NIC}">
                        <td scope="email">`+ driver.email + `</td>
                        <td class="Name">`+ driver.name + `</td>
                        <td class="NIC">`+ driver.NIC + `</td>
                        <td class="age">`+ driver.age + `</td>
                        <td class="contact">`+ driver.contact + `</td>
                        <td class="ownerEmail">`+ driver.ownerEmail + `</td>
                        
                        <td class="Action">
                            <button class="more-btn" onclick="togglePopup1(${driver.id})">MORE</button>
                            <a href="editDriver.html?email=`+ driver.email + `" onclick="updatefunction(driver.email, driver.name, driver.NIC, driver.age, driver.contact, driver.ownerEmail)"><button class="edit-btn">EDIT</button></a>
                            <a href="deleteDriver.html?email=`+ driver.email + `" onclick=""><button class="delete-btn">DELETE</button></a>
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
                data.contact.toLowerCase().includes(value) ||
                data.ownerEmail.toLowerCase().includes(value) ||
                data.NIC.toLowerCase().includes(value)

            document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
        });
    });

});


function AddDriver() {
    window.location.href = "./addDriver.html";
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
    for (var i = 0; i < driverList.length; i++) {
        if (driverList[i].id == id) {
            var driver = driverList[i];
            console.log(driver);

            fetch('http://127.0.0.1:8080/try2_war_exploded/getOwner?email=' + driver.ownerEmail, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include",
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Owner data", data.owner)
                    owner = data.owner;

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
                })
                .catch(error => {
                    console.error('Error:', error);
                });


        }
    }
}