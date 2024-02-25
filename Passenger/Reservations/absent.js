function createAbsent() {
    const form = document.getElementById('form'),
    sub = document.querySelector(".sub");
    sub.addEventListener("click", () => {
        console.log("form submitted");
        const vehicleNo = form.querySelector('.Select-reservation').value;
        const daysOfAbsant = form.querySelector('.daysOfAbsent').value;
        const startingDate = form.querySelector('.startingDate').value;

        // var checker = true;
        // var vehicleNoError = document.querySelector(".vehicleNo-error-message");
        // var daysOfAbsantError = document.querySelector(".daysOfAbsent-error-message");
        // var startingError = document.querySelector(".startingDate-error-message");
        const data = {
            vehicleNo: vehicleNo,
            daysOfAbsent: daysOfAbsant,
            startingDate: startingDate
        }
        fetch('http://127.0.0.1:8080/try2_war_exploded/addAbsent    ',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                if(data.message == "Registration successfully"){
                    Swal.fire({
                        title: "Absent Added!",
                        icon: "success"
                      }).then(()=>{
                        location.reload();
                      })
                }
                else{
                    Swal.fire({
                        title: "Absent Adding Failed!",
                        icon: "error"
                      }).then(()=>{
                        location.reload();
                      })
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
  
}


document.addEventListener("DOMContentLoaded", function () {

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
    console.log("Payload",payload);
    
    passengerEmail = payload.id;
  
    let row =`<select name="" id="" class="Select-reservation">
    <option value="Reservaton" selected disabled>Select relevant Reservation</option>`;

    fetch('http://127.0.0.1:8080/try2_war_exploded/getReservationsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                let i = 0;
                let reservation = "";
                let vehicle = "";
                if(data.reservation == "No reservations"){
                    alert("No reservations")
                    //TO BE HANDLE
                }
                else{
                    console.log(data);
                    while (i < data.reservations.length) {
                        reservation = data.reservations[i];
                        vehicle = data.vehicles[i];
                        console.log("reservation: "+reservation);
                        console.log("vehicle : "+vehicle.vehicleNo);
                        row += `<option value="01">${reservation.vehicleNo} (${vehicle.type})</option>`;
                        i++;
                    }

                    row += `</select>`;


                    document.querySelector(".reservation-dropdown").innerHTML = row; 
                }  

            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
