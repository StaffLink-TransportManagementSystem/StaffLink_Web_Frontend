function validateCreditCardNumber(cardNumber) {
    // Remove spaces and non-digit characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    // Check if the card number is a numeric value with a valid length
    if (!/^\d+$/.test(cleanedCardNumber) || cleanedCardNumber.length !== 12) {
        return false;
    }

    return true;
}

function validateCreditCardAmount(amount) {
    // Check if the amount is a positive number
    const numericAmount = parseFloat(amount);
    return !isNaN(numericAmount) && numericAmount >= 0;
}

function validateCVV(cvv) {
    // Check if the CVV is a numeric value with the required length
    return /^\d{3}$/.test(cvv);
}

function validateMonth(month) {
    // Check if the month is a numeric value within the valid range (1 to 12)
    const numericMonth = parseInt(month, 10);
    return !isNaN(numericMonth) && numericMonth >= 1 && numericMonth <= 12;
}

function validateYear(year) {
    // Check if the year is a numeric value and within a reasonable range
    const numericYear = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    return !isNaN(numericYear) && numericYear >= currentYear && numericYear <= currentYear + 10; // Adjust the range as needed
}

function cardPayment(){
    console.log("card payment");

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);
    let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };
    fetch('http://localhost:8080/try2_war_exploded/getRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = "./cardPayment.html?vehicleNo="+vehicleNo+"&passengerEmail="+passengerEmail+"&amount="+data.Request.price;
    })

    // window.location.href = "./cardPayment.html?vehicleNo="+vehicleNo+"&passengerEmail="+passengerEmail+"&amount=";

    // let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };
    // fetch('http://localhost:8080/try2_war_exploded/passengerCardPayment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }, body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     location.reload();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}

function cashPayment(){
    console.log("cash payment");

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);

    let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail };

    Swal.fire({
        title: "Pay to driver?",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Pay To Driver",        
      }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://localhost:8080/try2_war_exploded/passengerCashPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                if(data.message == "Payment successfully"){
                    Swal.fire({
                        title: "Reservation Success!",
                        icon: "success"
                    })
                }
                
                
            })
            .then(()=>{
                window.location.href = "./index.html"
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
      });

    // fetch('http://localhost:8080/try2_war_exploded/passengerCashPayment', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }, body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     location.reload();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}

document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);
    const amount = urlParams.get('amount')
    console.log(amount);

    const form = document.querySelector("form");
    form.querySelector(".amount-input").value = amount;
});

function makePayment(e){
    e.preventDefault();
    console.log("make payment");
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);
    const price = urlParams.get('amount')
    console.log(price);

    const form = document.querySelector("form");

    const cardNumber = form.querySelector('.card-number-input').value;
        const cardHolder = form.querySelector('.card-holder-input').value;
        const amount = form.querySelector('.amount-input').value;
        const cvv = form.querySelector('.cvv-input').value;
        const month = form.querySelector('.month-input').value;
        const year = form.querySelector('.year-input').value;

        // var paymentError = document.querySelector(".paymentFor-error-message");
        var cardNumberError = document.querySelector(".cardNo-error-message");
        var cardHolderError = document.querySelector(".holder-error-message");
        var amountError = document.querySelector(".amount-error-message");
        var cvvError = document.querySelector(".cvv-error-message");
        var monthError = document.querySelector(".month-error-message");
        var yearError = document.querySelector(".year-error-message");

        // paymentError.style.display = "none";
        cardNumberError.style.display = "none";
        cardHolderError.style.display = "none";
        amountError.style.display = "none";
        cvvError.style.display = "none";
        monthError.style.display = "none";
        yearError.style.display = "none";

        var checker = true;

        // if (!id) {
        //     paymentError.innerText = "Please select a payment method.";
        //     paymentError.style.display = "block";
        //     console.log("payment error");
        //     checker = false;
        // }
        if (!cardNumber) {
            cardNumberError.innerText = "Please enter a card number.";
            cardNumberError.style.display = "block";
            console.log("card number error");
            checker = false;
        }
        else if (!validateCreditCardNumber(cardNumber)) {
            cardNumberError.innerText = "Please enter a valid card number.";
            cardNumberError.style.display = "block";
            console.log("card number error");
            checker = false;
        }
        if (!cardHolder) {
            cardHolderError.innerText = "Please enter a card holder name.";
            cardHolderError.style.display = "block";
            console.log("card holder error");
            checker = false;
        }
        if (!amount) {
            amountError.innerText = "Please enter an amount.";
            amountError.style.display = "block";
            console.log("amount error");
            checker = false;
        }
        else if (!validateCreditCardAmount(amount)) {
            amountError.innerText = "Please enter a valid amount.";
            amountError.style.display = "block";
            console.log("amount error");
            checker = false;
        }

        if (!cvv) {
            cvvError.innerText = "Please enter a cvv.";
            cvvError.style.display = "block";
            console.log("cvv error");
            checker = false;
        }
        else if (!validateCVV(cvv)) {
            cvvError.innerText = "Please enter a valid cvv.";
            cvvError.style.display = "block";
            console.log("cvv error");
            checker = false;
        }

        if (!month) {
            monthError.innerText = "Please select a month.";
            monthError.style.display = "block";
            console.log("month error");
            checker = false;
        }
        else if (!validateMonth(month)) {
            monthError.innerText = "Please select a valid month.";
            monthError.style.display = "block";
            console.log("month error");
            checker = false;
        }

        if (!year) {
            yearError.innerText = "Please select a year.";
            yearError.style.display = "block";
            console.log("year error");
            checker = false;
        }
        else if (!validateYear(year)) {
            yearError.innerText = "Please select a valid year.";
            yearError.style.display = "block";
            console.log("year error");
            checker = false;
        }
        else if(year == "year"){
            yearError.innerText = "Please select a valid year.";
            yearError.style.display = "block";
            console.log("year error");
            checker = false;
        }

        if(checker){
            const data = {
                passengerEmail: passengerEmail,
                vehicleNo: vehicleNo,
                cardNumber: cardNumber,
                cardHolder: cardHolder,
                amount: amount,
                cvv: cvv,
                month: month,
                year: year
            };

            // HAVE TO HANDLE

            // let data = { vehicleNo: vehicleNo, passengerEmail: passengerEmail, amount: amount, cardNo: form.querySelector(".cardNo").value, cvv: form.querySelector(".cvv").value, expDate: form.querySelector(".expDate").value };
        }
}