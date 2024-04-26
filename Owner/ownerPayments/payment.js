const amount = window.location.href.split("=")[1];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("amount-input").value = amount;
});

function makePayment(e) {
    // alert("Payment made");
    e.preventDefault();
    const cardNumber = document.getElementById("card-number").value;
    const cardHolder = document.getElementById("card-holder").value;
    const cvv = document.getElementById("cvv").value;
    const expiryMonth = document.getElementById("expiry-month").value;
    const expiryYear = document.getElementById("expiry-year").value;

    var cardNumberError = document.getElementById("cardNo-error-message");
    var cardHolderError = document.getElementById("holder-error-message");
    var cvvError = document.getElementById("cvv-error-message");
    var expiryMonthError = document.getElementById("month-error-message");
    var expiryYearError = document.getElementById("year-error-message");

    // cardNumberError.style.display = "none";
    // cardHolderError.style.display = "none";
    // cvvError.style.display = "none";
    // expiryMonthError.style.display = "none";
    // expiryYearError.style.display = "none";

    var checker = true;
    var message = "";

    if (cardNumber.length != 16) {
        cardNumberError.innerHTML = "Please enter a valid card number";
        cardNumberError.style.display = "block";
        console.log("Card number error");
        checker = false;
    }
    if (cardHolder == "") {
        cardHolderError.innerHTML = "Please enter the card holder's name";
        cardHolderError.style.display = "block";
        console.log("Card holder error");
        checker = false;
    }
    
    if (expiryMonth == "month") {
        // expiryMonthError.innerHTML = "Please select the expiry month";
        message = "Please select the expiry month";
        // expiryMonthError.style.display = "block";
        console.log("Month error");
        checker = false;
    }
    else if (expiryYear == "year") {
        // expiryYearError.innerHTML = "Please select the expiry year";
        message = "Please select the expiry year";
        // expiryYearError.style.display = "block";
        console.log("Year error");
        checker = false;
    }
    else if (cvv.length != 3) {
        // cvvError.innerHTML = "Please enter a valid cvv";
        message = "Please enter a valid cvv";
        // cvvError.style.display = "block";
        console.log("CVV error");
        checker = false;
    }


    if (checker) {
        const data = {
            cardNumber: cardNumber,
            cardHolder: cardHolder,
            cvv: cvv,
            expiryMonth: expiryMonth,
            expiryYear: expiryYear,
            amount: amount
        }
        console.log(data);
        Swal.fire({
            title: "Payment Done!",
            icon: "success"
          }).then(()=>{
            window.location.href = "../ownerDashboard.html";
          })
    }
    else {
        Swal.fire({
            title: message,
            icon: "error"
          }).then(()=>{
            // location.reload();
          })
    }
}
// fetch('http://