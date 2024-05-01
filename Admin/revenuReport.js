var cashRevenue = ""
var cardRevenue = ""
var totalCardAmount = 0;
var totalCashAmount = 0;


document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";


    const requestData = {
        fromDate : fromDate,
        toDate : toDate,
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/cashRevenue',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            cashRevenue = data.list;
            console.log(data);
            data.list.forEach(passengerPayments => {
            row += `<tr  id="${passengerPayments.id}">
                    <td scope="vehicle_id">`+ passengerPayments.vehicleNo +`</td>
                    <td scope="amount">${passengerPayments.totalCash}</td>
                </tr>`
                totalCashAmount += passengerPayments.totalCash;
            });

            row += `<tr>
                <td><b>Total</td>
                <td><b>${totalCashAmount}</td>
            </tr>`;

            row += `<tr>
                <td><b>Sub Fee (12%)</td>
                <td><b>${totalCashAmount*0.12}</td>
            </tr>`;

            document.querySelector(".cash").innerHTML = row;   
        })
        .catch(error => {
            console.error('Error:', error);
        });
});




document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";


    const requestData = {
        fromDate : fromDate,
        toDate : toDate,
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/cardRevenue',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            cashRevenue = data.list;
            console.log(data);
            data.list.forEach(passengerPayments => {
            row += `<tr  id="${passengerPayments.id}">
                    <td scope="vehicle_id">`+ passengerPayments.vehicleNo +`</td>
                    <td scope="amount">${passengerPayments.totalCard}</td>
                </tr>`
                totalCardAmount += passengerPayments.totalCard;
            });

            row += `<tr>
                <td><b>Total</td>
                <td><b>${totalCardAmount}</td>
            </tr>`;

            row += `<tr>
                <td><b>Sub Fee (12%)</td>
                <td><b>${totalCardAmount*0.12}</td>
            </tr>`;

            document.querySelector(".card").innerHTML = row;   
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

