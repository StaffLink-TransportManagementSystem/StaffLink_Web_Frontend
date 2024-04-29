const id = window.location.href.split("=")[1];

document.addEventListener("DOMContentLoaded", function () {
    fetch('http://127.0.0.1:8080/try2_war_exploded/getVehicleRequest?id=' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("vehicleRequestID").placeholder = data.vehicle.id;
            document.getElementById("ownerEmail").placeholder = data.vehicle.ownerEmail;
            // document.getElementById("driverEmail").placeholder = data.vehicle.driverEmail;
            document.getElementById("vehicleNo").placeholder = data.vehiclevehicleNo;
            document.getElementById("tripType").placeholder = data.vehicle.type;

            document.getElementById("brand").placeholder = data.vehicle.vehicleBrand;
            document.getElementById("seatsCount").placeholder = data.vehicle.seatsCount;
            document.getElementById("inside").src = "http://127.0.0.1:5560/Public/Images/"+data.vehicle.insideImage;
            document.getElementById("outside").src = "http://127.0.0.1:5560/Public/Images/"+data.vehicle.outsideImage;
            document.getElementById("revenueImage").src = "http://127.0.0.1:5560/Public/Images/"+data.vehicle.revenueLicenseImage;
            document.getElementById("insuranceImage").src = "http://127.0.0.1:5560/Public/Images/"+data.vehicle.insuranceImage;
            document.getElementById("registrationImage").src = "http://127.0.0.1:5560/Public/Images/"+data.vehicle.vehicleRegistrationImage;
            // document.getElementById("vehicleRequestPassengerEmail").placeholder = data.vehicle.verifiedState;
            // document.getElementById("vehicleRequestStatus").placeholder = data.vehicle.insideImage;
            // document.getElementById("vehicleRequestDate").placeholder = data.vehicle.outsideImage;
            // document.getElementById("vehicleRequestDate").placeholder = data.vehicle.revenueLicenseImage;
            // document.getElementById("vehicleRequestDate").placeholder = data.vehicle.insuranceImage;
            // document.getElementById("vehicleRequestDate").placeholder = data.vehicle.vehicleRegistrationImage;


            // document.getElementById("vehicleRequestID").innerText = data.id;
            // document.getElementById("vehicleRequestVehicleType").innerText = data.vehicleType;
            // document.getElementById("vehicleRequestPassengerEmail").innerText = data.passengerEmail;
            // document.getElementById("vehicleRequestStatus").innerText = data.status;
            // document.getElementById("vehicleRequestDate").innerText = data.date;
        })
        .catch(error => {
            console.error('Error:', error);
        });
});