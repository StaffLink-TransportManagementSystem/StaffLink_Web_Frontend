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
      console.log("Payload", payload);
    
      const email = payload.id;

      var ownerEmail = "";
    
      console.log("email", email);
    
    fetch("http://127.0.0.1:8080/try2_war_exploded/getDriver?email=" + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },credentials: "include",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Driver data",data.driver)
            ownerEmail = data.driver.ownerEmail;
            
            fetch("http://127.0.0.1:8080/try2_war_exploded/getOwner?email=" + ownerEmail, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },credentials: "include",
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Owner data",data.owner)
                    document.querySelector('.ownerID').innerText = data.owner.id;
                    document.querySelector('.ownerEmail').innerText = data.owner.email;
                    document.querySelector('.ownerName').innerText = data.owner.name;
                    document.querySelector('.ownerContact').innerText = data.owner.NIC;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
            
        });
    });