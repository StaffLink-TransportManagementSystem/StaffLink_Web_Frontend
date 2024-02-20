document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[Driver-search]")
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllDriver',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(driver => {
                  console.log(driver);
                row += `
                <div class="driver">
                  <img src="https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg" alt="driver-photo">

                  <div class="driver-desc">
                    <div class="topic driver-name">${driver.name}</div>

                    <div class="driver-spec">
                      <p><b>Telephone No : ${driver.contact}</b></p>
                      <p><b>Email : ${driver.email}</b></p>
                      <p><b>NIC No : ${driver.NIC}</b></p>
                    </div>

                    <button class="more-btn">MORE</button>
                    <button class="edit-btn">EDIT</button>
                    <button class="delete-btn">DELETE</button>
                  </div>
                </div>
                
              `
                });

                users = data.list;

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