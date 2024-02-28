var vehicleList = ""
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[vehicleList]")


    // let email = "rhatu2000@gmail.com";
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllVehicle',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                vehicleList = data.list;
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
                            <button class="more-btn" onclick="togglePopup1(${vehical.id})">MORE</button>
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

function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < vehicleList.length; i++) {
        if (vehicleList[i].id == id) {
            popupData = `<div class="popup-content">
        <i class="fas fa-xmark" id="close" onclick="togglePopup()"></i>

        <p class="topic">Passenger Details</p>       
        
        <div class="detail-box">
          <div class="image">
            <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" id="default-pic">
          </div>

          <form action="">
            <div class="input-box">
              <span class="details">Passenger ID</span>
              <input disabled type="text" class="passengerID" name="passengerID" placeholder="p0101">
            </div>
            <div class="input-box">
                <span class="details">Passenger Name</span>
                <input disabled type="text" class="passengerName" value name="passengerName" placeholder="Ravindu Hasanka">
            </div>
            <div class="input-box">
                <span class="details">NIC No</span>
                <input disabled type="text" class="NIC" value name="NIC" placeholder="123456789v">
            </div>
            <div class="input-box">
                <span class="details">Email</span>
                <input disabled type="email" class="email" value name="email" placeholder="rh@gmail.com">
            </div>
            <div class="input-box">
                <span class="details">Telephone</span>
                <input disabled type="number" class="Telephone" value name="Telephone" placeholder="0123456789">
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
