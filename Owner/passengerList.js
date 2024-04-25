document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[PassengerDetails]")
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllPassenger',{
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
                users.forEach(data => {
                    const isVisible =
                        data.name.toLowerCase().includes(value) ||
                        data.email.toLowerCase().includes(value) ||
                        data.NIC.toLowerCase().includes(value)
   
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
