const { subscribe } = require("diagnostics_channel");

function makePayment(){
    const form = document.querySelector("form");
    sub = document.querySelector(".sub");

    sub.addEventListener("click", () => {
        console.log("form submitted");
        const provider = form.querySelector('.provider').value;
        const cardNumber = form.querySelector('.cardNumber').value;
    })
}