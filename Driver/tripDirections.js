document.addEventListener('DOMContentLoaded', function() {
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
      console.log("Payload", payload);
    
      const email = payload.id;
      var OnTrip = payload.OnTrip;

    if (OnTrip === "notontrip") {
        window.location.href = "dashboard.html";
    }
    
     console.log("email", email);
    
    fetch("http://127.0.0.1:8080/try2_war_exploded/getTripPassengersByDriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("reservations: ",data.list)
            row = "";
            tripPassengers = data.tripPassengers;
            passengers = data.list;
            console.log("tripPassengers: ", tripPassengers);
            console.log("passengers: ", passengers);

            let i = 0;
            while(i < passengers.length){
                row += `
                <tr>
                <td>${passengers[i].id}</td>
                <td>${passengers[i].name}</td>
                <td>${passengers[i].email}</td>
                <td>${passengers[i].contactNo}</td>
                <td class="Action">`
                if(tripPassengers[i].status == "ongoing"){
                    row += `<a href="#moredetails" onclick="ViewLoction('${passengers[i].email}')"><button class="more-btn">View Location</button></a>
                            <a href="#moredetails" onclick="MarkPicked('${passengers[i].email}')"><button class="edit-btn">Pick Passenger</button></a>`
                }
                else if(tripPassengers[i].status == "picked"){
                    row += `<button class="add-btn" disabled>Passenger Picked</button>`
                }
                row += `
                </td>
                <tr>`
                i++;
            }

            // data.list.forEach(reservation => {
            //     row += `
            //     <tr>
            //     <td>${reservation.id}</td>
            //     <td>${reservation.name}</td>
            //     <td>${reservation.email}</td>
            //     <td>${reservation.NIC}</td>
            //     <td class="Action">`
            //     if(tripPassengers.status == "ongoing"){
            //         row += `<a href="#moredetails" onclick="MarkPicked('${reservation.email}')"><button class="more-btn">Pick</button></a>`
            //     }
            //     else if(tripPassengers.status == "picked"){
            //         row += `<button class="add-btn" disabled>Picked</button>`
            //     }
            //     row += `
            //     </td>
            //     <tr>`
            document.querySelector('.tbody').innerHTML = row;
                
        })
        
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    

function MarkPicked(passengerEmail){
    console.log("Marked as picked");

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
      console.log("Payload", payload);
    
      const email = payload.id;
      var OnTrip = payload.OnTrip;

    if (OnTrip === "notontrip") {
        window.location.href = "dashboard.html";
    }
    
     console.log("email", email);


    data = {
        "passengerEmail": passengerEmail,
        "driverEmail": email
    }
    fetch('http://127.0.0.1:8080/try2_war_exploded/passengerPicked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },body: JSON.stringify(data),credentials: "include",})
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            if(data.message == 'Passenger picked successfully'){
                Swal.fire({
                    title: "Passenger Picked!",
                    icon: "success"
                  })
                  .then(()=>{
                    location.reload();
                  })
            }
            else{
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "error"
                  })
            }
        })
    
}
            
            