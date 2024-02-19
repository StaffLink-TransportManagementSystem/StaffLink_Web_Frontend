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

