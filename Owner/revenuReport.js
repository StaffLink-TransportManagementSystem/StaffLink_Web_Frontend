var vehicleRevenue = ""


document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";


    const requestData = {
        ownerEmail : email,
        fromDate : fromDate,
        toDate : toDate,
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/RevenueOwner',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            vehicleRevenue = data.list;
            console.log(data);
            data.list.forEach(vehicle => {
            row += `<tr  id="${vehicle.id}">
                    <td scope="vehicleNo">`+ vehicle.vehicleNo +`</td>
                    <td scope="cash_total">${vehicle.cashTotal}</td>
                    <td scope="card_total">${vehicle.cardTotal}</td>
                    <td scope="total_amount">${vehicle.totalAmount}</td>
                </tr>`
            });

            document.querySelector(".vehicleRevenue").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});