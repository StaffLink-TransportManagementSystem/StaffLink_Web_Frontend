document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    vehicles = document.querySelector(".vehicle-card-container");
    const searchInput = document.querySelector("[absentList]")

    let vehicle = "CBA-1257";
    let ownerEmail = "rhatu2000@gmail.com";
  
    let row ="";
    let users = []

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
                // console.log(vehicleList.list);
                vehicleList.list.forEach(v => {
                card += `<div class="card" id ="${v.vehicleNo}">
                <div class="card-border-top">
                </div>
                <div class="img">
                </div>
                <span> ` + v.vehicleNo + `</span>
                <p class="job">` + v.model + `</p>
                <button onclick="popup('`+ v.vehicleNo + `')"> Absent List </button>
              </div>`
                });

    
                users = vehicleList.list;
                document.querySelector(".vehicle-card-container").innerHTML = card;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            searchInput.addEventListener("input", e => {
                const value = e.target.value.toLowerCase()
                users.forEach(data => {
                  const isVisible =
                      data.vehicleNo.toLowerCase().includes(value) ||
                      data.model.toLowerCase().includes(value)
                  document.getElementById(data.vehicleNo).classList.toggle("hide", !isVisible)
                })
              })
    
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

