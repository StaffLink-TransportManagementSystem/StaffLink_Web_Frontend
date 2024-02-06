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
                            <a href="#moredetails"><button class="more-btn">VIEW LOCATION</button></a>
                        </td>
                    </tr>`
                });
    

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });
