document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const data = {
        email: "rhatu2000@gmail.com",
    };
    let row ="";
    let rowData = "";

    fetch('http://localhost:8080/try2_war_exploded/viewAllRequests',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(request => {
                    // console.log(request)
                    rowData = `<tr>
                    <td scope="email" data-label="P ID">`+ request.id +`</td>
                    <td class="Name">`+ request.vehicleNo +`</td>
                    <td class="NIC">`+ request.passengerEmail +`</td>
                    <td class="contact">`+ request.startingPoint +`</td>
                    <td class="contact">`+ request.endingPoint +`</td>
                    <td class="contact">`+ request.type +`</td>
                    <td class="contact"> <span class="status `+ request.status.toLowerCase() +`">`+ request.status +`</span></td>`
                    
                    if(request.status.toLowerCase() == "pending"){
                        rowData += `<td class="Action">
                        <button class="approve" onclick="approvedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Approve</button>
                        <button class="reject" onclick="rejectedfunction(`+ request.id + `,'` + request.vehicleNo + `','` + request.passengerEmail + `','` + request.startingPoint + `','` + request.endingPoint + `','` + request.type + `','` + request.status + `')">Reject</button>
                        </td>`
                    }
                    else{
                        rowData += `<td class="Action">
                        </td>`
                    }
                    row += rowData;
                });


                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
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

    fetch('http://localhost:8080/try2_war_exploded/requestEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
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

    fetch('http://localhost:8080/try2_war_exploded/requestEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
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