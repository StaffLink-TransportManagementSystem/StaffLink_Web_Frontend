document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/viewAllRequests',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.list.forEach(owner => {
                row += `<tr>
                        <td scope="email" data-label="P ID">`+ owner.email +`</td>
                        <td class="Name">`+ owner.name +`</td>
                        <td class="NIC">`+ owner.NIC +`</td>
                        <td class="contact">`+ owner.contact +`</td>
                        
                        <td class="Action">
                            <a href="#moredetails"><button class="moredetails">MORE</button></a>
                            <a href="http://127.0.0.1:5501/Owner/editOwner.html?email=`+ owner.email +`" onclick="updatefunction(owner.email,owner.name,owner.NIC,owner.contact)"><button class="edit">EDIT</button></a>
                            <a href="http://127.0.0.1:5501/Owner/deleteOwner.html?email=`+ owner.email +`" onclick=""><button class="delete">DELETE</button></a>
                        </td>
                    </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });
    
  });