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
});