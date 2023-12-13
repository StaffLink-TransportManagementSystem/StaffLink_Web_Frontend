function makePayment(){
    const form = document.querySelector("form");
    sub = document.querySelector(".sub");

    sub.addEventListener("click", () => {
        console.log("form submitted");
        const provider = form.querySelector('.provider').value;
        const cardNumber = form.querySelector('.cardNumber').value;
    })
}



document.addEventListener("DOMContentLoaded", function () {
    
    passengerEmail = "passenger@gmail.com"
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/getRequestListByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                let i = 0;
                while (i < data.requests.length) {
                    const request = data.requests[i];
                    const vehicle = data.vehicles[i];
                    var rowData = `<tr>
                    <td>${request.id}</td>
                    <td>${vehicle.vehicleNo}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.model}</td>
                    <td>${request.startingDate}</td>
                    <td>${request.endingDate}</td>
                    <td>${request.amount}</td>
                    <td><span class="status ${request.status.toLowerCase()}">${request.status}</span></td>
                    <td>`
                    if(request.status.toLowerCase() == "approved"){
                        rowData += `<a href="#" onclick=""><button class="edit">RESERVE</button></a>
                        `
                    }
                    rowData += `<a href="./editRequest.html" onclick=""><button class="edit">EDIT</button></a>
                    <button class="delete" onclick="deleteRequest('`+ request.vehicleNo +`', '`+ request.passengerEmail +`')" >DELETE</button></td>
                </tr>`;
                    // row += `<tr>
                    //     <td>${request.id}</td>
                    //     <td>${vehicle.vehicleNo}</td>
                    //     <td>${vehicle.type}</td>
                    //     <td>${vehicle.model}</td>
                    //     <td>${request.startingDate}</td>
                    //     <td>${request.endingDate}</td>
                    //     <td>${request.amount}</td>
                    //     <td><span class="status ${request.status.toLowerCase()}">${request.status}</span></td>
                    //     <td><a href="#" onclick=""><button class="edit">RESERVE</button></a>
                    //     <a href="./editRequest.html" onclick=""><button class="edit">EDIT</button></a>
                    //     <button class="delete" onclick="deleteRequest(`+ request.vehicleNo +`, `+ request.passengerEmail +`)">DELETE</button></a></td>
                    // </tr>`;
                    row += rowData;
                    i++;
                }


                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
        });


function deleteRequest(vehicleNo, passengerEmail) {
    // console.log("delete request");
    console.log(vehicleNo);
    console.log(passengerEmail);
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };
            fetch('http://localhost:8080/try2_war_exploded/requestDelete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if (data.message === "Delete successfully") {
                    Swal.fire({
                        title: "Deleted Successfully!",
                        icon: "success"
                    })
                }
                else{
                    Swal.fire({
                        title: "Delete Failed!",
                        icon: "error"
                    })
                }
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            // text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
}
