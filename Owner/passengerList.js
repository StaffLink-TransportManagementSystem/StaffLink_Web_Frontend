document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[PassengerDetails]")

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
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/getPassengersByOwner?email='+ email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log("Data", data);
                passengerList = data.list;
                data.list.forEach(passenger => {
                row += `<tr  id="${passenger.NIC}">
                        <td scope="name" data-label="P ID">`+ passenger.name +`</td>
                        <td class="email">`+ passenger.email +`</td>
                        <td class="NIC">`+ passenger.NIC +`</td>
                    
                        <td class="Action">
                            <button class="more-btn" onclick="togglePopup1(${passenger.id})">MORE</button>
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
                const searchOption = searchCriteria.toLowerCase();
                users.forEach(data => {
                     switch (searchOption) {
                case "name":
                    searchValue = data.name.toLowerCase().includes(value);
                    break;
                case "email":
                    searchValue = data.email.toLowerCase().includes(value);
                    break;
                case "nic":
                    searchValue = data.NIC.toLowerCase().includes(value);
                    break;
                case "all":
                    searchValue = data.name.toLowerCase().includes(value) ||
                    data.email.toLowerCase().includes(value) ||
                    data.NIC.toLowerCase().includes(value)
                  
            }

            const isVisible =
            searchValue
          
            document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
                });
            });
    
  });

  var passengerList = "";


  function togglePopup1(id) {
    // alert(id);
    const popup = document.getElementById("popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < passengerList.length; i++) {
        if (passengerList[i].id == id) {
            console.log(passengerList[i]);
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
                  <input disabled type="text" class="passengerID" name="passengerID" placeholder="p01-${passengerList[i].id}">
                </div>
                <div class="input-box">
                    <span class="details">Passenger Name</span>
                    <input disabled type="text" class="passengerName" value name="passengerName" placeholder="${passengerList[i].name}">
                </div>
                <div class="input-box">
                    <span class="details">NIC No</span>
                    <input disabled type="text" class="NIC" value name="NIC" placeholder="${passengerList[i].NIC}">
                </div>
                <div class="input-box">
                    <span class="details">Email</span>
                    <input disabled type="email" class="email" value name="email" placeholder="${passengerList[i].email}">
                </div>
                <div class="input-box">
                    <span class="details">Contact Number</span>
                    <input disabled type="text" class="reg-date" value name="contact-no" placeholder="${passengerList[i].contactNo}">
                </div>
                <div class="input-box">
                    <span class="details">Registered Date</span>
                    <input disabled type="text" class="reg-date" value name="reg-date" placeholder="${passengerList[i].created_at}">
                </div>
                
              </form>
            </div>       
          </div>`

          document.getElementById("popup").innerHTML = popupData;
        }
    }
}


document.addEventListener('DOMContentLoaded', function() {
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
    console.log("Payload",payload);


    var ownerEmail = payload.id;

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerDetails?email='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("totalPassengers").innerHTML = data.passengerCount;
                document.getElementById("totalVehicles").innerHTML = data.vehicleCount;
            })
            .catch(error => {
                console.error('Error:', error);
            });

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerFinancials?ownerEmail='+ownerEmail,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var totalRevenue = data.payments.card + data.payments.cash;
            var balance = data.payments.card - ((data.payments.card + data.payments.cash)*0.12);
            document.getElementById("totalRevenue").innerHTML = "Rs. " + totalRevenue.toFixed(2);
            document.getElementById("balance").innerHTML = "Rs. " + balance.toFixed(2);
        })
        .catch(error => {
            console.error('Error:', error);
        });

});