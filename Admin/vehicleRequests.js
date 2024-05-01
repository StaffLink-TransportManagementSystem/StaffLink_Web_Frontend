var vehicleList = ""
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[vehicleList]")


    // let email = "rhatu2000@gmail.com";

    let row = "";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllVerifyVehicle', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            vehicleList = data.list;
            data.list.forEach(vehical => {
                row += `<tr  id="${vehical.vehicleNo}">
                        <td scope="owner" data-label="P ID">`+ vehical.id + `</td>
                        <td scope="owner" data-label="P ID">`+ vehical.ownerEmail + `</td>
                        <td class="Name">`+ vehical.vehicleNo + `</td>
                        <td class="NIC">`+ vehical.vehicleBrand + `</td>
                        <td class="Telephone">`+ vehical.type + `</td>
                        <td class="Email">`+ vehical.driverEmail + `</td>
                        <td class="Telephone">`+ vehical.seatsCount + `</td>
                        <td class="Email">`+ vehical.trips + `</td>`

                console.log("Verified State", vehical.varifiedState , typeof(vehical.varifiedState));
                if (vehical.varifiedState == "0") {
                    console.log("pending");
                    row += `<td class="Action">
                        <a href="vehicleRequestMore.html?id=`+ vehical.id + `"><button class="more-btn">MORE</button></a>
                        <button class="add-btn" onclick="approvefunction(${vehical.id})">Approve</button>
                        <button class="delete-btn" onclick="rejectfunction(${vehical.id})">Reject</button>
                        </td>`
                }
                if (vehical.varifiedState == "1") {
                    console.log("Rejected");
                    row += `<td class="Action">
                        <button class="add-btn" disabled>Approved</button>
                        </td>`
                }
                if (vehical.varifiedState == "2") {
                    console.log("Rejected");
                    row += `<td class="Action">
                        <button class="delete-btn" disabled>Rejected</button>
                        </td>`
                }

                row += `</tr>`
            });
            users = data.list;

            document.querySelector(".tbody").innerHTML = row;

        })
        .catch(error => {
            console.error('Error:', error);
        });

    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        const searchOption = searchCriteria.toLowerCase();
        users.forEach(data => {
            switch (searchOption) {
                case "owner email":
                    searchValue = data.ownerEmail.toLowerCase().includes(value);
                    break;
                case "vehicle no":
                    searchValue = data.vehicleNo.toLowerCase().includes(value);
                    break;
                case "driver email":
                    searchValue = data.driverEmail.toLowerCase().includes(value);
                    break;
                case "starting point":
                    searchValue = data.startingPoint.toLowerCase().includes(value);
                    break;
                case "ending point":
                    searchValue = data.endingPoint.toLowerCase().includes(value);
                    break;
                case "all":
                    searchValue = data.ownerEmail.toLowerCase().includes(value) ||
                        data.vehicleNo.toLowerCase().includes(value) ||
                        data.regNo.toLowerCase().includes(value) ||
                        data.vehicleBrand.toLowerCase().includes(value) ||
                        data.type.toLowerCase().includes(value) ||
                        data.startingPoint.toLowerCase().includes(value) ||
                        data.driverEmail.toLowerCase().includes(value) ||
                        data.endingPoint.toLowerCase().includes(value)

            }
            const isVisible =
                searchValue

            document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
        });
    });

});



function AddVehicle() {
    window.location.href = "./addVehical.html";
}

function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < vehicleList.length; i++) {
        if (vehicleList[i].id == id) {
            var vehical = vehicleList[i];


            var driverDetails = ""
            fetch('http://127.0.0.1:8080/try2_war_exploded/getVerifyVehicle?id=' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }, credentials: "include",
            })
                .then(response => response.json())
                .then(driver => {

                    console.log("Driver Details", driver);
                    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwner?email=' + vehical.ownerEmail, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }, credentials: "include",
                    })
                        .then(response => response.json())
                        .then(owner => {
                            driver = driver.driver;
                            owner = owner.owner;

                            popupData = `<div class="popup-content">
            <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>
    
            <p class="topic">Vehicle Details</p>       
            
            <div class="detail-box">
              <div class="slider">           
                <div class="vehicle-images">
                  <input type="radio" name="slide" id="img-outside">
                  <input type="radio" name="slide" id="img-inside">
    
                  <img src="https://lp-cms-production.imgix.net/2020-11/Hemphill%20celebrity%20bus.jpg" class="img-outside" alt="img-outside">
                  <img src="https://t3.ftcdn.net/jpg/02/51/00/36/360_F_251003601_0su7oPQkRf93HTByHOA7oFhC0ZdExXRo.jpg" class="img-inside" alt="img-inside">
                </div>
    
                <div class="dots">
                  <label for="img-outside"></label>
                  <label for="img-inside"></label>
                </div>
    
                <a href="map">Show on Google Map</a>
              </div>
    
              <form action="">
                <div class="input-box">
                  <span class="details">Vehicle ID</span>
                  <input disabled type="text" class="vehicleID" name="vehicleID" placeholder="${vehical.id}">
                </div>
                <div class="input-box">
                    <span class="details">Vehicle No</span>
                    <input disabled type="text" class="vehicleNo" value name="vehicleNo" placeholder="${vehical.vehicleNo}">
                </div>
                <div class="input-box">
                    <span class="details">Brand</span>
                    <input disabled type="text" class="Brand" value name="Brand" placeholder="${vehical.vehicleBrand}">
                </div>
                <div class="input-box">
                  <span class="details">Type</span>
                  <input disabled type="text" class="type" value name="type" placeholder="${vehical.type}">
                </div>
                <div class="input-box">
                  <span class="details">Owner</span>
                  <input disabled type="text" class="owner" value name="owner" placeholder="${owner.name}">
                </div>
                <div class="input-box">
                    <span class="details">Owner Email</span>
                    <input disabled type="text" class="ownerEmail" value name="ownerEmail" placeholder="${vehical.ownerEmail}">
                </div>
                <div class="input-box">
                  <span class="details">Driver</span>
                  <input disabled type="text" class="driver" value name="driver" placeholder="${driver.name}">
                </div>
                <div class="input-box">
                    <span class="details">Driver Email</span>
                    <input disabled type="text" class="drivererEmail" value name="drivererEmail" placeholder="${vehical.driverEmail}">
                </div>
                <div class="input-box">
                    <span class="details">Driver Telephone</span>
                    <input disabled type="number" class="Telephone" value name="Telephone" placeholder="${driver.contact}">
                </div>
                <div class="input-box">
                  <span class="details">Total Seats</span>
                  <input disabled type="number" class="totalSeats" value name="totalSeats" placeholder="${vehical.seatsCount}">
                </div>
                <div class="input-box">
                    <span class="details">Registered Date</span>
                    <input disabled type="text" class="reg-date" value name="reg-date" placeholder="${vehical.created_at}">
                </div> 

              </form>
            </div>       
          </div>`

                            document.getElementById("popup").innerHTML = popupData;

                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                })
                .catch(error => {
                    console.error('Error:', error);
                });
            console.log("Driver Details", driverDetails.driver);
            // console.log("Driver Details", dr);





        }
    }
}


function getDriverDetais(driverEmail) {
    let driverDetails = ""
    fetch('http://127.0.0.1:8080/try2_war_exploded/getDriver?email=' + driverEmail, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            driverDetails = data;
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    // return driverDetails;
}

// function getOwnerDetais(ownerEmail) {
//     let ownerDetails = ""
//     fetch('http://127.0.0.1:8080/try2_war_exploded/getOwner?email='+ownerEmail,{
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             },credentials: "include",})
//             .then(response => response.json())
//             .then(data => {
//                 ownerDetails = data.owner;
//                 console.log("Owner", ownerDetails);
//                 // console.log("Owner", data.owner);
//                 // return data.owner;
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//             });
//     return ownerDetails;
//     // return ownerDetails;
// }


async function getOwnerDetais(ownerEmail) {
    try {
        const response = await fetch('http://127.0.0.1:8080/try2_war_exploded/getOwner?email=' + ownerEmail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        console.log('Owner', data);
        return data.owner;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Rethrow the error for the caller to handle
    }
}



{/* <div class="input-box">
    <span class="details">Available Seats</span>
    <input disabled type="number" class="availSeats" value name="availSeats" placeholder="${vehical.availableSeats}">
</div>   */}

//Top Informations 

document.addEventListener("DOMContentLoaded", function () {
    fetch('http://127.0.0.1:8080/try2_war_exploded/adminDashbordInfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            // document.getElementById("totalDrivers").innerText = data.totalDrivers;
            document.getElementById("totalPassengers").innerText = data.noOfPassengers;
            document.getElementById("totalVehicles").innerText = data.noOfVehicles;
            document.getElementById("totalOwners").innerText = data.noOfOwners;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
);


function approvefunction(id) {
    fetch('http://127.0.0.1:8080/try2_war_exploded/approveVehicleRequest?id=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message == "Vehicle request approved") {
                Swal.fire({
                    title: "Vehicle request approved!",
                    icon: "success"
                }).then(() => {
                    location.reload();
                })
            }
            else {
                Swal.fire({
                    title: "Vehicle request approve failed!",
                    icon: "error"
                }).then(() => {
                    location.reload();
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function rejectfunction(id) {
    fetch('http://127.0.0.1:8080/try2_war_exploded/rejectVehicleRequest?id=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.message == "Vehicle request rejected") {
                Swal.fire({
                    title: "Vehicle request rejected!",
                    icon: "success"
                }).then(() => {
                    location.reload();
                })
            }
            else {
                Swal.fire({
                    title: "Vehicle request reject failed!",
                    icon: "error"
                }).then(() => {
                    location.reload();
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}