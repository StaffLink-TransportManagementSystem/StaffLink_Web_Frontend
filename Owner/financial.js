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
                data.payments.forEach(payment => {
                row += `<tr>
                <td>`+ payment.date +`</td>
                <td>`+ payment.passengerEmail +`</td>
                <td>`+ payment.paymentType +`</td>
                <td>`+ payment.amount +`</td>
                <td><span class="status pending">Pending</span></td>
            </tr>`
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
                document.querySelector(".cardPay").innerHTML = `Rs. `+ data.payments.card ;
                document.querySelector(".cashPay").innerHTML = `Rs. `+ data.payments.cash ;
                document.querySelector(".subscription").innerHTML = `Rs. -`+ data.payments.subscription ;  
                document.querySelector(".balance").innerHTML = `<b>Rs. `+ (data.payments.card + data.payments.cash - data.payments.subscription)+`</b>`; 

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