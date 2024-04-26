document.addEventListener("DOMContentLoaded", function() {
    const markAsReadButtons = document.querySelectorAll(".more-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    markAsReadButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const notifCard = button.closest(".notif-card");
            notifCard.style.backgroundColor = "#fff";
            button.style.display = "none";
        });
    });


    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const message = button.closest(".notif-card");
            message.style.display = "none";
        });
    });

    var passengerEmail = "passenger@gmail.com";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getPassengerNotification?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", })
            .then(response => response.json())
            .then(data => {
                console.log("data123", data);
            //     data.notifications.forEach(notification => {
            //     row += `<tr>
            //     <td>+ notification.id +</td>
            //     <td>+ notification.email +</td>
            //     <td>2023.11.27</td>
            //     <td>+ notification.Date +</td>
            //     <td> Rs. + notification.message +</td>
            //     <td>+ notification.userId +</td>
            //     <td><span class="status + notification.status.toLowerCase() +">+ notification.status +</span></td>
            // </tr>`
            //     });

            //     document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            // const d = new Date();
            // let year = d.getFullYear();
            // var years = "<option value=\"year\" selected disabled>year</option>";
            // for(let i=0;i<15;i++){
            //     years += <option value="+(year+i)+">+(year+i)+</option>
            // }
            // console.log(years);

});