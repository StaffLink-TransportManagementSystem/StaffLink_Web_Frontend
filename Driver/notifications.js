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
    let row = "";

fetch('http://127.0.0.1:8080/try2_war_exploded/getDriverNotification?Email=' + Email, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: "include"
})
.then(response => response.json())
.then(data => {
    console.log(data.notification);
    data.notification.forEach(notification => {
        // Check if viewStatus is 1, if yes, hide the "Mark as read" button
        const markAsReadButton = notification.viewStatus === 1 ? 'style="display: none;"' : '';
        row += `
        <div class="notif-card unread" id="${notification.notificationId}">
            <i class="fas fa-bullhorn"></i>
            <div class="message">
                <p class="desc">${notification.message}</p>
                <p class="time">${notification.Date}</p>
                <div class="buttons">
                    <button class="more-btn" ${markAsReadButton}>Mark as read</button>
                    <button class="delete-btn">Delete</button>
                </div>
            </div>
        </div>`;
    });

    document.querySelector(".container").innerHTML = row;

    addEventListenersToButtons();
})
.catch(error => {
    console.error('Error:', error);
});
});

function addEventListenersToButtons() {
    const markAsReadButtons = document.querySelectorAll(".more-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    markAsReadButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const notifCard = button.closest(".notif-card");
            const notificationId = notifCard.id;
            markAsRead(notificationId, notifCard, button);
        });
    });

    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const notifCard = button.closest(".notif-card");
            const notificationId = notifCard.id;
            deleteNotification(notificationId);
        });
    });
}

function markAsRead(notificationId, notifCard, button) {
    fetch('http://127.0.0.1:8080/try2_war_exploded/markAsRead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ notificationId: notificationId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        if (data.message === "Update successfully") {
            notifCard.style.backgroundColor = "#fff";
            button.style.display = "none";
        } else {
            // Handle error (if needed)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function deleteNotification(notificationId) {
    fetch('http://127.0.0.1:8080/try2_war_exploded/DeleteNotification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ notificationId: notificationId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        if (data.message === "Delete successfully") {
            const notifCard = document.getElementById(notificationId);
            notifCard.style.display = "none";
        } else {
            // Handle error (if needed)
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
