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
                <button onclick="popup('`+ v.vehicleNo + `')"> Absent List </button>
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
  
  function popup(vehicleNo){
    console.log(vehicleNo);
    let data = {
        vehicleNo: vehicleNo
    };
    let row ="";
    fetch('http://localhost:8080/try2_war_exploded/viewAbsent',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(data),})
        .then(response => response.json())
        .then(absents => {
            console.log(absents);
            absents.list.forEach(absent => {
                row+=`<tr>
                <td>`+absent.id+`</td>
                <td>`+absent.passengerEmail+`</td>
                <td>`+absent.daysOfAbsent+`</td>
                <td>`+absent.startingDate+`</td>
                <td>`+absent.endingDate+`</td>
            </tr>`
            }
            );
            document.querySelector(".tbody").innerHTML = row;
            // document.querySelector(".POPUP").style.display = "block";
        })
        .catch(error => {
            console.error('Error:', error);
        });
    document.querySelector(".tbody").innerHTML = row;
    document.querySelector(".POPUP").style.display = "block";
  }

  function closePopup(){
    document.querySelector(".POPUP").style.display = "none";
  }

