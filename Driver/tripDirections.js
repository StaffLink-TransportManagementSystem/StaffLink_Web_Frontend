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
    
    fetch("http://127.0.0.1:8080/try2_war_exploded/getPassengersByDriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("reservations: ",data.reservations)
            row = "";
            data.reservations.forEach(reservation => {
                row += `
                <tr>
                <td>${reservation.id}</td>
                <td>${reservation.name}</td>
                <td>${reservation.email}</td>
                <td>${reservation.NIC}</td>
                <td class="Action">
                  <a href="#moredetails" onclick="MarkPicked(${reservation.email})"><button class="more-btn">Pick</button></a>
                </td>
                <tr>`
                
        })
        document.querySelector('.tbody').innerHTML = row;
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    });

function MarkPicked(passengerEmail){
    console.log("Marked as picked");
    data = {
        "passengerEmail": passengerEmail,
        "driverEmail": email
    }
    fetch('http://127.0.0.1:8080/try2_war_exploded/passengerPicked', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(data)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            if(data.message == 'Marked Successfully'){
                Swal.fire({
                    title: "Passenger Picked!",
                    icon: "success"
                  })
            }
            else{
                Swal.fire({
                    title: "Something went wrong!",
                    icon: "error"
                  })
            }
        })
    })
}
            
            