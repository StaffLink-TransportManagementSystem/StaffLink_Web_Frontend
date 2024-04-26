document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        sub = document.querySelector(".sub");
    const searchInput = document.querySelector("[vehicle-search]")

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


    console.log("vehicles");
    let email = payload.id;
    let data = { email: email };
    let row = "";
    let users = []


    fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicleList', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            // 'Cookie': 'jwtToken=' + encodeURIComponent(document.cookie.match(/jwt=(.*?)(?:$|;)/)[1]),
        }, body: JSON.stringify(data), credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
            console.log("List:",data.list);
            vehicleList = data.list;
            data.list.forEach(vehical => {
            row+=`
            <div id="${vehical.vehicleNo}">
            <div class="vehicle-card">
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
          </div>

          <div class="vehicle-desc">
            <div class="topic vehicle-card-title">${vehical.vehicleNo}</div>
            
            <div class="vehicle-spec">
              <p><b>Vehicle Type :</b> ${vehical.type}</p>
              <p><b>Vehicle Brand :</b> ${vehical.vehicleBrand}</p>
              <p><b>Type of Trips :</b> ${vehical.trips}</p>
              <p><b>Available Seats :</b> ${vehical.seatsCount}</p>
              <p><b>Starting Location :</b> ${vehical.startingPoint}</p>
              <p><b>Destination :</b> ${vehical.endingPoint}</p>
            </div>

            <button class="more-btn" onclick="togglePopup1(${vehical.id})">MORE</button>
            <a href="editVehical.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="edit-btn" onclick="editVehicle("${vehical.vehicleNo}")">EDIT</button></a>
            <a href="deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="delete-btn" onclick="deleteVehicle(${vehical.vehicleNo})">DELETE</button></a>
            <a href="vehicleAbsents.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="cancel-btn" onclick="absantList(${vehical.vehicleNo})">ABSENT LIST</button></a>
            <a href="vehicleRequests.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="add-btn" onclick="requestList(${vehical.vehicleNo})">REQUESTS</button></a>

            <a href="reservations.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="reservation-btn" onclick="reservationList(${vehical.vehicleNo})">RESERVATIONS</button></a>

          </div>
        </div>
        </div>`
            });
            users = data.list;

            // console.log("Row:", row);

            document.querySelector(".vehicleSet").innerHTML = row;

        })
        .catch(error => {
            console.error('Error:', error);
        });

    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        const searchOption = searchCriteria.toLowerCase();
        users.forEach(data => {
            switch (searchOption) {
                case "vehicle no":
                    searchValue = data.vehicleNo.toLowerCase().includes(value);
                    break;
                case "vehicle type":
                    searchValue = data.type.toLowerCase().includes(value);
                    break;
                case "vehicle brand":
                    searchValue = data.vehicleBrand.toLowerCase().includes(value);
                    break;
                case "starting location":
                    searchValue = data.startingPoint.toLowerCase().includes(value);
                    break;
                case "destination":
                    searchValue = data.endingPoint.toLowerCase().includes(value);
                    break;
                case "all":
                    searchValue = data.vehicleNo.toLowerCase().includes(value) ||
                    data.type.toLowerCase().includes(value) ||
                    data.vehicleBrand.toLowerCase().includes(value) ||
                    data.model.toLowerCase().includes(value) ||
                    data.startingPoint.toLowerCase().includes(value) ||
                    data.endingPoint.toLowerCase().includes(value) ||
                    data.trips.toLowerCase().includes(value)
                  
            }
            const isVisible =
            searchValue

            document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
        })
    })

});



var vehicleList = "";

function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < vehicleList.length; i++) {
        if (vehicleList[i].id == id) {
            var vehical = vehicleList[i];
        

            var driverDetails = ""
            fetch('http://127.0.0.1:8080/try2_war_exploded/getDriver?email='+vehical.driverEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(driver => {

                console.log("Driver Details", driver);
                fetch('http://127.0.0.1:8080/try2_war_exploded/getOwner?email='+vehical.ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
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
    fetch('http://127.0.0.1:8080/try2_war_exploded/getDriver?email='+driverEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
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