document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");

    let vehicle = "CBA-1257";
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllAbsent',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(absents => {
                row += `<tr>
                        <td scope="email">`+ absents.vehicleNo +`</td>
                        <td class="Name">`+ absents.name +`</td>
                        <td class="Name">`+ absents.contact +`</td>
                        <td class="NIC">`+ absents.passengerEmail +`</td>
                        <td class="age">`+ absents.daysOfAbsent +`</td>
                        <td class="contact">`+ absents.startingDate +`</td>
                        <td class="ownerEmail">`+ absents.endingDate +`</td>
                        
                        <td class="Action">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="http://127.0.0.1:5501/Owner/editAbsent.html?vehicleNo=`+ absents.vehicleNo +`passengerEmail=`+ absents.passengerEmail +`" onclick=""><button class="edit">EDIT</button></a>
                            <a href="http://127.0.0.1:5501/Owner/deleteAbsent.html?vehicleNo=`+ absents.vehicleNo +`passengerEmail=`+absents.passengerEmail +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });
