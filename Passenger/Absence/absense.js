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

    fetch('http://127.0.0.1:8080/try2_war_exploded/getAbasntsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var row = "";
                for (let i = 0; i < data.absents.length; i++) {
                    row += `
                    <tr>
                    <td>${data.absents[i].id}</td>
                    <td>${data.absents[i].vehicleNo}</td>
                    <td>${data.absents[i].daysOfAbsent}</td>
                    <td>${data.absents[i].startingDate}</td>
                    <td>${data.absents[i].endingDate}</td>
                    </tr>`
                }
                document.querySelector('.tbody').innerHTML = row;
            })
            .catch(error => {
                console.error('Error:', error);
            });
});
