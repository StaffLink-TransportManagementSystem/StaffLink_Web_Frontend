const amount = window.location.href.split("=")[1];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("amount-input").value = amount;
});