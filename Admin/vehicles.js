function getData() {
    fetch('127.0.0.1:15000/project_name/passengerRegister',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },credentials: 'include'})
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

getData()

//Top Informations 

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://127.0.0.1:8080/try2_war_exploded/adminDashbordInfo', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("data", data);
            // document.getElementById("totalDrivers").innerText = data.totalDrivers;
            document.getElementById("totalPassengers").innerText = data.noOfPassengers;
            document.getElementById("totalVehicles").innerText = data.noOfVehicles;
            document.getElementById("totalOwners").innerText = data.noOfOwners;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
);