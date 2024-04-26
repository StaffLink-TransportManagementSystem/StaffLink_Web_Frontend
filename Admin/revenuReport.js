var revenue = ""


document.addEventListener("DOMContentLoaded", function () {
    console.log("check");
    let row ="";


    const requestData = {
        fromDate : fromDate,
        toDate : toDate,
    };

    console.log(requestData);

    fetch('http://127.0.0.1:8080/try2_war_exploded/revenueReport',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            revenue = data.list;
            console.log(data);
            data.list.forEach(passengerPayments => {
            row += `<tr  id="${passengerPayments.id}">
                    <td scope="vehicle_id">`+ passengerPayments.vehicleNo +`</td>
                </tr>`
            });

            // users = data.list;

            document.querySelector(".cash").innerHTML = row;   
        })
        .catch(error => {
            // console.error('Error:', error);
        });
});
