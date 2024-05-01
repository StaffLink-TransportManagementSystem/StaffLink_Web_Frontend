var inquiryList = ""

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[inquiryDetails]")
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllOnlineInquiry',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                inquiryList = data.list;
                console.log(data);
                data.list.forEach(inquiry => {
                row += `<tr  id="${inquiry.inquiry_id}">
                        <td scope="inquiry_id">`+ inquiry.inquiry_id +`</td>
                        <td class="email" id="email">`+ inquiry.email +`</td>
                        <td scope="name">`+ inquiry.name +`</td>
                        <td class="message">`+ inquiry.message +`</td>
                        <td class="message">
                            <button class="submit-btn" id="openPopupButton" onclick="togglePopupEmail('${inquiry.email}')">SEND EMAIL</button>
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






  function togglePopupEmail(email) {
    // alert(email);
    const popup = document.getElementById("email-popup");
    popup.classList.toggle("active");
    var popupData = ""
    for (var i = 0; i < inquiryList.length; i++) {
        if (inquiryList[i].email == email) {
            console.log(inquiryList[i]);
            popupData = `<div class="popup-content">
            <i class="fas fa-xmark" id="close" onclick="togglePopupEmail()"></i>
    
            <p class="topic">Send a Reply Email</p>       
            
            <div class="detail-box">
              <form action="" id="email-form">
                <label for=".message">Message</label>
                <textarea class="message" id="message" rows="6" cols="30" required></textarea>
              </form>
              <button class="submit-btn" onclick="sendMail('${inquiryList[i].email}')">Send</button>
            </div>       
          </div>`

          document.getElementById("email-popup").innerHTML = popupData;
        }
    }
}

//Top Informations 

document.addEventListener("DOMContentLoaded", function() {
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