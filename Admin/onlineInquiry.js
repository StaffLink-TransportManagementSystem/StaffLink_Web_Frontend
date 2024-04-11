var inquiryList = ""

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
    tbody = document.querySelector(".tbody");
    const searchInput = document.querySelector("[inquiryDetails]")
  
    let row ="";
    let users = []

    fetch('http://127.0.0.1:8080/try2_war_exploded/viewAllOnlineInquiry',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },credentials: "include",})
            .then(response => response.json())
            .then(data => {
                inquiryList = data.list;
                console.log(data);
                data.list.forEach(inquiry => {
                row += `<tr  id="${inquiry.inquiry_id}">
                        <td scope="inquiry_id">`+ inquiry.inquiry_id +`</td>
                        <td class="email">`+ inquiry.email +`</td>
                        <td scope="name">`+ inquiry.name +`</td>
                        <td class="message">`+ inquiry.message +`</td>
                    </tr>`
                });

                users = data.list;

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            searchInput.addEventListener("input", e => {
                const value = e.target.value.toLowerCase();
                users.forEach(data => {
                    const isVisible =
                        data.name.toLowerCase().includes(value) ||
                        data.email.toLowerCase().includes(value) ||
                        data.NIC.toLowerCase().includes(value)
   
                        document.getElementById(data.NIC).classList.toggle("hide", !isVisible)
                });
            });
    
  });