var history = ""


document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";


    const requestData = {
        passengerEmail : email,
        fromDate : fromDate,
        toDate : toDate,
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/paymentHistory',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            history = data.list;
            console.log(data);
            data.list.forEach(passengerPayments => {
            row += `<tr  id="${passengerPayments.id}">
                    <td scope="date">`+ passengerPayments.date +`</td>
                    <td scope="vehicle">${passengerPayments.vehicleNo}</td>
                    <td scope="amount">${passengerPayments.amount}</td>
                    <td scope="type">${passengerPayments.paymentType}</td>
                </tr>`
            });

            document.querySelector(".payments").innerHTML = row;   
        })
        .catch(error => {
            console.error('Error:', error);
        });
});



