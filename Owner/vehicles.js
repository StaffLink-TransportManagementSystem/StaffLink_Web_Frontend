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
            data.list.forEach(vehical => {
            row+=`
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

            <button class="more-btn">MORE</button>
            <a href="editVehical.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="edit-btn" onclick="editVehicle("${vehical.vehicleNo}")">EDIT</button></a>
            <a href="deleteVehicle.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="delete-btn" onclick="deleteVehicle(${vehical.vehicleNo})">DELETE</button></a>
            <a href="vehicleAbsents.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="cancel-btn" onclick="absantList(${vehical.vehicleNo})">ABSENT LIST</button></a>
            <a href="vehicleRequests.html?vehicleNo=`+ vehical.vehicleNo+`"><button class="add-btn" onclick="requestList(${vehical.vehicleNo})">REQUESTS</button></a>
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
        users.forEach(data => {
            const isVisible =
                data.vehicleNo.toLowerCase().includes(value) ||
                data.type.toLowerCase().includes(value) ||
                data.vehicleBrand.toLowerCase().includes(value) ||
                data.model.toLowerCase().includes(value) ||
                data.startingPoint.toLowerCase().includes(value) ||
                data.endingPoint.toLowerCase().includes(value) ||
                data.trips.toLowerCase().includes(value)
            document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
        })
    })

});

