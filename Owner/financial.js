document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".table1");
    ownerEmail = "rhatu2000@gmail.com"
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/getPassengerPaymentsByOwner?ownerEmail='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(payment => {
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
    
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".table2");
    ownerEmail = "rhatu2000@gmail.com"
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/getOwnerFinancials?ownerEmail='+ownerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(payment => {
                row += `<tr>
                <td>`+ payment.date +`</td>
                <td>`+ payment.passengerEmail +`</td>
                <td>`+ payment.paymentType +`</td>
                <td>`+ payment.amount +`</td>
                <td><span class="status pending">Pending</span></td>
            </tr>`
                });

                document.querySelector(".table2").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });