document.addEventListener("DOMContentLoaded", function () {
    
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

    passengerEmail = payload.id;
  
    let row ="";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getPassengerPaymentsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
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