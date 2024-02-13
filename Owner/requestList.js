document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");

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

    let ownerEmail = payload.id;

    const searchInput = document.querySelector("[requestList]")
    const data = {
        email: ownerEmail,
    };
    let row ="";
    let rowData = "";
    let users = []


    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllRequests',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(request => {
                    console.log(request)
                    rowData = `<tr  id="${request.id}">
                    <td scope="email" data-label="P ID">`+ request.id +`</td>
                    <td class="Name">`+ request.vehicleNo +`</td>
                    <td class="NIC">`+ request.passengerEmail +`</td>
                    <td class="contact">`+ request.startingPoint +`</td>
                    <td class="contact">`+ request.endingPoint +`</td>
                    <td class="contact">`+ request.type +`</td>
                    <td class="contact"> <span class="status `+ request.status.toLowerCase() +`">`+ request.status +`</span></td>`
                    
                    if(request.status.toLowerCase() == "pending"){
                        rowData += `<td class="Action">
                        <button class="approve add-btn" onclick="approvedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Approve</button>
                        <button class="reject delete-btn" onclick="rejectedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Reject</button>
                        </td>`
                    }
                    else{
                        rowData += `<td class="Action">
                        </td>`
                    }
                    row += rowData;
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
                        data.id.toString().toLowerCase().includes(value) ||
                        data.vehicleNo.toLowerCase().includes(value) ||
                        data.passengerEmail.toLowerCase().includes(value) ||
                        data.type.toLowerCase().includes(value) ||
                        data.status.toLowerCase().includes(value)
                        
                        document.getElementById(data.id).classList.toggle("hide", !isVisible)
                });
            });
  
    
    
  });


  function fetchData(){
  }

  function approvedfunction(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status){
    console.log("update function called");
    console.log(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status);
    // let data = {};

        status = "Approved"
        console.log("status changed to approved")

    let data = {
        id:id,
        vehicleNo:vehicleNo,
        passengerEmail:passengerEmail,
        startingPoint:startingPoint,
        endingPoint:endingPoint,
        type:type,
        status:status
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/requestEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "requestList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
}

function rejectedfunction(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status){
    console.log("update function called");
    console.log(id, vehicleNo, passengerEmail, startingPoint, endingPoint, type, status);
    // let data = {};

        status = "Rejected"
        console.log("status changed to rejected")

    let data = {
        id:id,
        vehicleNo:vehicleNo,
        passengerEmail:passengerEmail,
        startingPoint:startingPoint,
        endingPoint:endingPoint,
        type:type,
        status:status
    }

    fetch('http://127.0.0.1:8080/try2_war_exploded/requestEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "requestList.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
}