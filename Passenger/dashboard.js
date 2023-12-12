document.addEventListener("DOMContentLoaded", function () {

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
                <td>`+ payment.date +`</td>
                <td> Rs.`+ payment.amount +`</td>
                </tr>`
                });

                document.querySelector(".tbody2").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            // const d = new Date();
            // let year = d.getFullYear();
            // var years = "<option value=\"year\" selected disabled>year</option>";
            // for(let i=0;i<15;i++){
            //     years += `<option value="`+(year+i)+`">`+(year+i)+`</option>`
            // }
            // console.log(years);
            // document.getElementById('yearInput').innerHTML = years;
    
  });