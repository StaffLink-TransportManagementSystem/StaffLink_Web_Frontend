document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
  
    const data = {
        vehicleNo: "'CBA-7257'",
    };
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllRequests',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(request => {
                    // console.log(request)
                row += `<tr>
                        <td scope="email" data-label="P ID">`+ request.id +`</td>
                        <td class="Name">`+ request.vehicleNo +`</td>
                        <td class="NIC">`+ request.passengerEmail +`</td>
                        <td class="contact">`+ request.startingPoint +`</td>
                        <td class="contact">`+ request.endingPoint +`</td>
                        <td class="contact">`+ request.type +`</td>

                        
                        <td class="Action">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="http://127.0.0.1:5501/Owner/editRequest.html?email=`+ request.passengerEmail +`&vehicleNo=`+ request.vehicleNo +`" onclick="updatefunction(owner.email,owner.name,owner.NIC,owner.contact)"><button class="edit">EDIT</button></a>
                            <a href="http://127.0.0.1:5501/Owner/deleteRequest.html?email=`+ request.passengerEmail +`&vehicleNo=`+ request.vehicleNo +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });