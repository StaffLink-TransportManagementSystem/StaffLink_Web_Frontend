document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
  
    fetch('http://localhost:8080/try2_war_exploded/getVehicle?vehicleNo=dna',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data.vehicle) 
                form.querySelector('.ownerEmail').value = data.vehicle.ownerEmail;  
                form.querySelector('.vehicleNumber').value = data.vehicle.vehicleNo;
                form.querySelector('.vehicle-type').value = data.vehicle.type;
                form.querySelector('.vehicleBrand').value = data.vehicle.vehicleBrand;
                form.querySelector('.vehicleModel').value = data.vehicle.model;
                form.querySelector('.vehicleRegNo').value = data.vehicle.regNo;
                form.querySelector('.driverEmail').value = data.vehicle.driverEmail;
                form.querySelector('.seatCount').value = data.vehicle.seatsCount;
                form.querySelector('.startingLocation').value = data.vehicle.startingPoint;
                form.querySelector('.endLocation').value = data.vehicle.endingPoint;
                form.querySelector('.vehicle-trips').value = data.vehicle.trips;
                // form.querySelector('.vehicleTrips').value = data.vehicle.trips;

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });
  