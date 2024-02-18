// const e = require("express");

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

function makePayment(e) {
    e.preventDefault();
    const form = document.querySelector("form"),
    sub = document.querySelector(".sub");

    // sub.addEventListener("click", () => {
        console.log("form submitted");
        // Get form elements
        const id = form.querySelector('.id-input').value;
        const cardNumber = form.querySelector('.card-number-input').value;
        const cardHolder = form.querySelector('.card-holder-input').value;
        const amount = form.querySelector('.amount-input').value;
        const cvv = form.querySelector('.cvv-input').value;
        const month = form.querySelector('.month-input').value;
        const year = form.querySelector('.year-input').value;

        var paymentError = document.querySelector(".paymentFor-error-message");
        var cardNumberError = document.querySelector(".cardNo-error-message");
        var cardHolderError = document.querySelector(".holder-error-message");
        var amountError = document.querySelector(".amount-error-message");
        var cvvError = document.querySelector(".cvv-error-message");
        var monthError = document.querySelector(".month-error-message");
        var yearError = document.querySelector(".year-error-message");

        paymentError.style.display = "none";
        cardNumberError.style.display = "none";
        cardHolderError.style.display = "none";
        amountError.style.display = "none";
        cvvError.style.display = "none";
        monthError.style.display = "none";
        yearError.style.display = "none";

        var checker = true;

        if (!id) {
            paymentError.innerText = "Please select a payment method.";
            paymentError.style.display = "block";
            console.log("payment error");
            checker = false;
        }
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

        if(checker){
            const data = {
                passengerEmail: payload.id,
                vehicleNo: "CBA7357",
                requestID: id,
                paymentType: "Card",
                cardNumber: cardNumber,
                cardHolder: cardHolder,
                amount: amount,
                cvv: cvv,
                month: month,
                year: year
            };

            fetch('http://127.0.0.1:8080/try2_war_exploded/passengerPaymentRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if(data.message == "Registration successfully"){
                        Swal.fire({
                            title: "Payment Successful!",
                            icon: "success"
                        }).then(()=>{
                            location.reload();
                        })
                    }
                    else{
                        Swal.fire({
                            title: "Payment Failed!",
                            icon: "error"
                        })
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    // });
}

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
    
    passengerEmail = payload.id;
  
    let row ="";

    fetch('http://127.0.0.1:8080/try2_war_exploded/getPassengerPaymentsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.payments.forEach(payment => {
                row += `<tr>
                <td>`+ payment.id +`</td>
                <td>`+ payment.vehicleNo +`</td>
                <td>2023.11.27</td>
                <td>`+ payment.date +`</td>
                <td> Rs. `+ payment.amount +`</td>
                <td>`+ payment.paymentType +`</td>
                <td><span class="status `+ payment.status.toLowerCase() +`">`+ payment.status +`</span></td>
            </tr>`
                });

                document.querySelector(".tbody").innerHTML = row;   

            })
            .catch(error => {
                console.error('Error:', error);
            });

            const d = new Date();
            let year = d.getFullYear();
            var years = "<option value=\"year\" selected disabled>year</option>";
            for(let i=0;i<15;i++){
                years += `<option value="`+(year+i)+`">`+(year+i)+`</option>`
            }
            console.log(years);
});