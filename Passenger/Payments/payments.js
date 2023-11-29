document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".table2");
    passengerEmail = "rhatu2000@gmail.com"
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/getPassengerPaymentsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.payments.forEach(payment => {
                row += `<tr>
                <td>`+ payment.id +`</td>
                <td>2023.11.27</td>
                <td>`+ payment.date +`</td>
                <td>`+ payment.amount +`</td>
                <td>`+ payment.paymentType +`</td>
                <td><span class="status `+payment.status.toLowerCase()+`">`+payment.status+`</span></td>
            </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });