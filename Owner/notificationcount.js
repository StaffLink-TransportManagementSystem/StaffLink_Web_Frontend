
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
    
    Email = payload.id;


fetch(`http://127.0.0.1:8080/try2_war_exploded/getOwnerNotificationCount?Email=` + Email, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: "include"
})
  .then(response => response.json())
  .then(data => {
    const notificationBadge = document.querySelector('.notification-badge');
    console.log("not",notificationBadge);
    if (notificationBadge) {
        notificationBadge.textContent = data.NotificationCount;
        if (data.NotificationCount === 0) {
            notificationBadge.style.display = 'none';
        } 
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


});

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