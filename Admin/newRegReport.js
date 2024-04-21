var vehicleNo = ""
var ownerID = ""
var passengerID = ""
var driverID = ""

document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";
    // let users = [];


    const requestData = {
        fromDate: fromDate,
        toDate: toDate
    };

    // console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/VehicleListByDates',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            vehicleNo = data.list;
            console.log(data);
            row += `<tr id="vehicle-count-row">
                        <td scope="vehicle_id" style="font-weight:700">Total : ${data.list.length}</td>
                    </tr>`;
            data.list.forEach(vehicle => {
            row += `<tr  id="${vehicle.vehicle_id}">
                    <td scope="vehicle_id">`+ vehicle.vehicleNo +`</td>
                </tr>`
            });

            // users = data.list;

            document.querySelector(".vehicles").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";
    // let users = [];


    const requestData = {
        fromDate: fromDate,
        toDate: toDate
    };

    // console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/ownerListByDates',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            ownerID = data.list;
            console.log(data);
            row += `<tr id="Owner-count-row">
                        <td scope="owner" style="font-weight:700; height:5px">Total : ${data.list.length}</td>
                    </tr>`;
            data.list.forEach(owner => {
            row += `<tr  id="${owner.owner_id}">
                    <td scope="owner_id">o01-`+ owner.id +`</td>
                </tr>`
            });

            // users = data.list;

            document.querySelector(".owners").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});



document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";
    // let users = [];


    const requestData = {
        fromDate: fromDate,
        toDate: toDate
    };

    // console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/passengerListByDates',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            passengerID = data.list;
            console.log(data);
            row += `<tr id="passenger-count-row">
                        <td scope="passenger" style="font-weight:700; height:5px">Total : ${data.list.length}</td>
                    </tr>`;
            data.list.forEach(passenger => {
            row += `<tr  id="${passenger.passenger_id}">
                    <td scope="passenger_id">p01-`+ passenger.id +`</td>
                </tr>`
            });

            // users = data.list;

            document.querySelector(".passengers").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";
    // let users = [];


    const requestData = {
        fromDate: fromDate,
        toDate: toDate
    };

    // console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/driverListByDates',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            driverID = data.list;
            console.log(data);
            row += `<tr id="driver-count-row">
                        <td scope="driver" style="font-weight:700; height:5px">Total : ${data.list.length}</td>
                    </tr>`;
            data.list.forEach(driver => {
            row += `<tr  id="${driver.driver_id}">
                    <td scope="driver_id">d01-`+ driver.id +`</td>
                </tr>`
            });

            // users = data.list;

            document.querySelector(".drivers").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});

