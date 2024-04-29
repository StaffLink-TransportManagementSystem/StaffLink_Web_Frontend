document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".table1");

    function getPayload(token) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    function checkCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split("; ");
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    console.log(checkCookie("jwt"))

    const token = checkCookie("jwt");
    const payload = getPayload(token);
    console.log("Payload",payload);


    var ownerEmail = payload.id;
  
    let row ="";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getPassengerPaymentsByOwner?ownerEmail='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.payments.forEach(payment => {
                row += `<tr>
                <td>`+ payment.date +`</td>
                <td>`+ payment.passengerEmail +`</td>
                <td>`+ payment.paymentType +`</td>
                <td>`+ payment.amount +`</td>`
                if(payment.status == "Pending" || payment.status == "pending"){
                    row+=`<td><span class="status pending">Pending</span></td>
            </tr>`
                }
                else if(payment.status == "Paid" || payment.status == "paid"){
                    row+=`<td><span class="status delivered">Paid</span></td>
            </tr>`
                    
                }
                
                });

                document.querySelector(".table1").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerFinancials?ownerEmail='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",})
            .then(response => response.json())
            .then(data => {
                document.querySelector(".cardPay").innerHTML = `Rs. `+ data.payments.card.toFixed(2) ;
                document.querySelector(".cashPay").innerHTML = `Rs. `+ data.payments.cash.toFixed(2) ;
                document.querySelector(".subscription").innerHTML = `Rs. -`+ ((data.payments.card + data.payments.cash)*0.12).toFixed(2) ;  
                document.querySelector(".balance").innerHTML = `<b>Rs. `+ (data.payments.card + data.payments.cash - ((data.payments.card + data.payments.cash)*0.12)).toFixed(2) +`</b>`; 
                var balance = (data.payments.card - ((data.payments.card + data.payments.cash)*0.12)).toFixed(2);
                if(balance < 0){
                    document.getElementById("ownerPayment").innerHTML = `<button class="submit-btn" onclick="pay('`+balance+`')">Pay Through System</button>`;
                }
                else{
                    document.getElementById("ownerPayment").innerHTML = `<button class="submit-btn" onclick="pay('0')">Pay Through System</button>`;
                }
                document.getElementById("ownerPayment").innerHTML = `<button class="submit-btn" onclick="pay('${(data.payments.subscription - data.payments.cash)}')">Pay Through System</button>`;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".table2");
    function getPayload(token) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    function checkCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split("; ");
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    console.log(checkCookie("jwt"))

    const token = checkCookie("jwt");
    const payload = getPayload(token);
    console.log("Payload",payload);


    var ownerEmail = payload.id;
  
    let row ="";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerFinancials?ownerEmail='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(payment => {
                row += `<tr>
                <td>`+ payment.date +`</td>
                <td>`+ payment.passengerEmail +`</td>
                <td>`+ payment.paymentType +`</td>
                <td>`+ payment.amount +`</td>
                <td><span class="status `+payment.status.toLowerCase()+`">`+payment.status+`</span></td>
            </tr>`
                });

                document.querySelector(".table2").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });

function pay(amount){
    console.log("Payment", amount);
    location.href = "./ownerPayments/cardPayment.html?amount="+amount;
    // alert("Payment Successful", amount);
}



document.addEventListener('DOMContentLoaded', function() {
    function getPayload(token) {
        return JSON.parse(atob(token.split(".")[1]));
    }

    function checkCookie(cName) {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split("; ");
        let res;
        cArr.forEach((val) => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        });
        return res;
    }

    console.log(checkCookie("jwt"))

    const token = checkCookie("jwt");
    const payload = getPayload(token);
    console.log("Payload",payload);


    var ownerEmail = payload.id;

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerDetails?email='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }, credentials: "include",})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("totalPassengers").innerHTML = data.passengerCount;
                document.getElementById("totalVehicles").innerHTML = data.vehicleCount;
            })
            .catch(error => {
                console.error('Error:', error);
            });

    fetch('http://127.0.0.1:8080/try2_war_exploded/getOwnerFinancials?ownerEmail='+ownerEmail,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, credentials: "include",})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var totalRevenue = data.payments.card + data.payments.cash;
            var balance = data.payments.card - ((data.payments.card + data.payments.cash)*0.12);
            document.getElementById("totalRevenue").innerHTML = "Rs. " + totalRevenue.toFixed(2);
            document.getElementById("balance").innerHTML = "Rs. " + balance.toFixed(2);
        })
        .catch(error => {
            console.error('Error:', error);
        });

});