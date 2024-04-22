document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[Driver-search]")
  
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
    console.log("Payload", payload);
  
    const email = payload.id;

    let row ="";
    let users = []
    let data = {
      email: email
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/getDriversByOwner?email='+email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
              driverList = data.drivers;
                data.drivers.forEach(driver => {
                  console.log(driver);
                row += `
                <div class="driver" id="${driver.NIC}">
                  <img src="https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg" alt="driver-photo">

                  <div class="driver-desc">
                    <div class="topic driver-name">${driver.name}</div>

                    <div class="driver-spec">
                      <p><b>Email : ${driver.email}</b></p>
                      <p><b>NIC No : ${driver.NIC}</b></p>
                      <p><b>Telephone No : ${driver.contact}</b></p>
                    </div>

                    <button class="more-btn" onclick="togglePopup1(${driver.id})">MORE</button>
                    <a href="editDriver.html?email=`+ driver.email+`"><button class="edit-btn">EDIT</button></a>
                    <a href="deleteDriver.html?email=`+ driver.email+`"><button class="delete-btn">DELETE</button></a>
                  </div>
                </div>`
                });

                users = data.drivers;

                document.querySelector(".driver-cards").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            searchInput.addEventListener("input", e => {
              const value = e.target.value.toLowerCase()
              users.forEach(data => {
                const isVisible =
                    data.name.toLowerCase().includes(value) ||
                    data.email.toLowerCase().includes(value) ||
                    data.NIC.toLowerCase().includes(value) ||
                    data.contact.toLowerCase().includes(value) ||
                    data.age.toString().toLowerCase().includes(value)
                document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
              })
            })
    
  });

  var driverList = [];

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