document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    vehicles = document.querySelector(".vehicle-card-container");

    let vehicle = "CBA-1257";
    let ownerEmail = "rhatu2000@gmail.com";
  
    let row ="";

    const data = {
        email: ownerEmail
    };
    let card = "";

    fetch('http://localhost:8080/try2_war_exploded/getVehicleList',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(vehicleList => {
                console.log(vehicleList.list);
                vehicleList.list.forEach(v => {
                card += `<div class="card">
                <div class="card-border-top">
                </div>
                <div class="img">
                </div>
                <span> ` + v.vehicleNo + `</span>
                <p class="job">` + v.model + `</p>
                <button onclick="popup()"> Absent List </button>
              </div>`
                });

                // data.list.forEach(absents => {
                //     row += `<tr>
                //             <td scope="email">`+ absents.vehicleNo +`</td>
                //             <td class="Name">`+ absents.name +`</td>
                //             <td class="Name">`+ absents.contact +`</td>
                //             <td class="NIC">`+ absents.passengerEmail +`</td>
                //             <td class="age">`+ absents.daysOfAbsent +`</td>
                //             <td class="contact">`+ absents.startingDate +`</td>
                //             <td class="ownerEmail">`+ absents.endingDate +`</td>
                            
                //             <td class="Action">
                //                 <a href="#moredetails"><button class="moredetails">MORE</button></a>
                //                 <a href="http://127.0.0.1:5501/Owner/editAbsent.html?id=`+ absents.id +`" onclick=""><button class="edit">EDIT</button></a>
                //                 <a href="http://127.0.0.1:5501/Owner/deleteAbsent.html?id=`+ absents.id +`" onclick=""><button class="delete">DELETE</button></a>
                //             </td>
                //         </tr>`
                //     });
    

                document.querySelector(".vehicle-card-container").innerHTML = card;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });
