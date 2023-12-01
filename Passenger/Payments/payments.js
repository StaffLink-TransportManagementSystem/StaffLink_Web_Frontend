// const e = require("express");

function validateCreditCardNumber(cardNumber) {
    // Remove spaces and non-digit characters
    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    // Check if the card number is a numeric value with a valid length
    if (!/^\d+$/.test(cleanedCardNumber) || cleanedCardNumber.length !== 16) {
        return false;
    }

    // Apply the Luhn algorithm
    let sum = 0;
    for (let i = 0; i < cleanedCardNumber.length; i++) {
        let digit = parseInt(cleanedCardNumber[i]);

        // Double every second digit
        if (i % 2 === 1) {
            digit *= 2;

            // If doubling results in a two-digit number, subtract 9
            if (digit > 9) {
                digit -= 9;
            }
        }

        // Sum all the digits
        sum += digit;
    }

    // The card number is valid if the sum is a multiple of 10
    return sum % 10 === 0;
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

function makePayment() {
    const form = document.querySelector("form"),
    sub = document.querySelector(".sub");

    sub.addEventListener("click", () => {
        console.log("form submitted");
        // Get form elements
        const payment = form.querySelector('.payment-input').value;
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

        if (!payment) {
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
        else if(year < year.getFullYear()){
            yearError.innerText = "Please select a valid year.";
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

        if(checker){
            const data = {
                paymentFor: payment,
                cardNumber: cardNumber,
                cardHolder: cardHolder,
                amount: amount,
                cvv: cvv,
                month: month,
                year: year
            };

            fetch('http://localhost:8080/try2_war_exploded/addPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // alert("Payment added successfully.");
                    // window.location.href = "http://localhost:8080/try2_war_exploded/Passenger/Payments/payments.html";
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    });
}

document.addEventListener("DOMContentLoaded", function () {
    // const form = document.querySelector("form"),
    // sub = document.querySelector(".sub");

    // sub.addEventListener("click", () => {
    //     console.log("form submitted");
    //     // Get form elements
    //     const payment = form.querySelector('.payment-input').value;
    //     const cardNumber = form.querySelector('.card-number-input').value;
    //     const cardHolder = form.querySelector('.card-holder-input').value;
    //     const amount = form.querySelector('.amount-input').value;
    //     const cvv = form.querySelector('.cvv-input').value;
    //     const month = form.querySelector('.month-input').value;
    //     const year = form.querySelector('.year-input').value;

    //     var paymentError = document.querySelector(".paymentFor-error-message");
    //     var cardNumberError = document.querySelector(".cardNo-error-message");
    //     var cardHolderError = document.querySelector(".holder-error-message");
    //     var amountError = document.querySelector(".amount-error-message");
    //     var cvvError = document.querySelector(".cvv-error-message");
    //     var monthError = document.querySelector(".month-error-message");
    //     var yearError = document.querySelector(".year-error-message");

    //     paymentError.style.display = "none";
    //     cardNumberError.style.display = "none";
    //     cardHolderError.style.display = "none";
    //     amountError.style.display = "none";
    //     cvvError.style.display = "none";
    //     monthError.style.display = "none";
    //     yearError.style.display = "none";

    //     var checker = true;

    //     if (!payment) {
    //         paymentError.innerText = "Please select a payment method.";
    //         paymentError.style.display = "block";
    //         console.log("payment error");
    //         checker = false;
    //     }
    //     if (!cardNumber) {
    //         cardNumberError.innerText = "Please enter a card number.";
    //         cardNumberError.style.display = "block";
    //         console.log("card number error");
    //         checker = false;
    //     }
    //     else if (!validateCreditCardNumber(cardNumber)) {
    //         cardNumberError.innerText = "Please enter a valid card number.";
    //         cardNumberError.style.display = "block";
    //         console.log("card number error");
    //         checker = false;
    //     }
    //     if (!cardHolder) {
    //         cardHolderError.innerText = "Please enter a card holder name.";
    //         cardHolderError.style.display = "block";
    //         console.log("card holder error");
    //         checker = false;
    //     }
    //     if (!amount) {
    //         amountError.innerText = "Please enter an amount.";
    //         amountError.style.display = "block";
    //         console.log("amount error");
    //         checker = false;
    //     }
    //     else if (!validateCreditCardAmount(amount)) {
    //         amountError.innerText = "Please enter a valid amount.";
    //         amountError.style.display = "block";
    //         console.log("amount error");
    //         checker = false;
    //     }

    //     if (!cvv) {
    //         cvvError.innerText = "Please enter a cvv.";
    //         cvvError.style.display = "block";
    //         console.log("cvv error");
    //         checker = false;
    //     }
    //     else if (!validateCVV(cvv)) {
    //         cvvError.innerText = "Please enter a valid cvv.";
    //         cvvError.style.display = "block";
    //         console.log("cvv error");
    //         checker = false;
    //     }

    //     if (!month) {
    //         monthError.innerText = "Please select a month.";
    //         monthError.style.display = "block";
    //         console.log("month error");
    //         checker = false;
    //     }
    //     else if (!validateMonth(month)) {
    //         monthError.innerText = "Please select a valid month.";
    //         monthError.style.display = "block";
    //         console.log("month error");
    //         checker = false;
    //     }

    //     if (!year) {
    //         yearError.innerText = "Please select a year.";
    //         yearError.style.display = "block";
    //         console.log("year error");
    //         checker = false;
    //     }
    //     else if(year < year.getFullYear()){
    //         yearError.innerText = "Please select a valid year.";
    //         yearError.style.display = "block";
    //         console.log("year error");
    //         checker = false;
    //     }
    //     else if (!validateYear(year)) {
    //         yearError.innerText = "Please select a valid year.";
    //         yearError.style.display = "block";
    //         console.log("year error");
    //         checker = false;
    //     }

    //     if(checker){
    //         const data = {
    //             paymentFor: payment,
    //             cardNumber: cardNumber,
    //             cardHolder: cardHolder,
    //             amount: amount,
    //             cvv: cvv,
    //             month: month,
    //             year: year
    //         };

    //         fetch('http://localhost:8080/try2_war_exploded/addPayment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log('Success:', data);
    //                 // alert("Payment added successfully.");
    //                 // window.location.href = "http://localhost:8080/try2_war_exploded/Passenger/Payments/payments.html";
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //     }

    // });

    passengerEmail = "rhatu2000@gmail.com"
  
    let row ="";

    fetch('http://localhost:8080/try2_war_exploded/getPassengerPaymentsByPassenger?passengerEmail='+passengerEmail,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                data.payments.forEach(payment => {
                row += `<tr>
                <td>`+ payment.id +`</td>
                <td>2023.11.27</td>
                <td>`+ payment.date +`</td>
                <td>`+ payment.amount +`</td>
                <td>`+ payment.paymentType +`</td>
                <td><span class="status `+payment.status.toLowerCase()+`">`+payment.status+`</span></td>
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
            document.getElementById("yearInput").innerHTML = years;
    
  });