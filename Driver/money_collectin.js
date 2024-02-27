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
      console.log("Payload", payload);
    
      const email = payload.id;
    
      console.log("email", email);

      var row = "";

        fetch("http://127.0.0.1:8080/try2_war_exploded/getPaymentCollection?email=" + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                console.log("Payment data",data.paymentCollection)
                data.paymentCollection.forEach(payment => {
                    row += `
                    <tr>
                    <td>${payment.id}</td>
                    <td>${payment.vehicleNo}</td>
                    <td>${payment.passengerName}</td>
                    <td>${payment.amount}</td>
                    <td>${payment.reservationID}</td>
                    <td>${payment.paymentStatus}</td>`

                    if(payment.paymentStatus.toLowerCase() == "pending"){
                        row += `<td class="Action">
                        <button class="edit-btn" onclick="collectedMoney(${payment.id})">Collect Money</button>
                        </td>`
                    }
                    else if(payment.paymentStatus.toLowerCase() == "paid"){
                        row +=
                    `<td class="Action">
                            <button class="add-btn" disable)">Collected</button>
                        </td>  `
                    }
                    row += `</tr>`
                });

                    document.querySelector(".tbody").innerHTML = row;   
    
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });