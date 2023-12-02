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
        fetch('http://localhost:8080/try2_war_exploded/addAbsent    ',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                // window.location.href = "http://127.0.0.1:5501/Passenger/Reservations/index.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
  
}

