document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[Driver-search]")
  
    let row ="";
    let users = []

    fetch('http://localhost:8080/try2_war_exploded/viewAllDriver',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(driver => {
                row += `
                
                <div class="wrapper" id="${driver.NIC}" >
                  
                  
                  <div class="profile" style="align-items:center;">
                    <img src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w" class="thumbnail" >
                    <div class="check"><i class="fas fa-check"></i></div>
                    <h3 class="name">`+driver.name+`</h3>
                    <p class="title">Assigned Vehicle</p>
                    <p class="description" style="text-align:left"><b>Email : </b>`+ driver.email+`<br><b>NIC no : </b>`+driver.NIC+`<br><b>Age : </b>`+driver.age +`<br><b>Contact No : </b>`+driver.contact+` <br></p>
                    <div style="display: flex;">
                    <a href="editDriver.html?email=`+ driver.email +`" onclick="updatefunction(driver.email, driver.name, driver.NIC, driver.age, driver.contact, driver.ownerEmail)"><button class="edit">EDIT</button></a>
                    <a href="deleteDriver.html?email=`+ driver.email +`" onclick=""><button class="delete">DELETE</button></a>
                    </div>
                  </div>
                </div>`
                });

                users = data.list;

                document.querySelector(".cards").innerHTML = row;   

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