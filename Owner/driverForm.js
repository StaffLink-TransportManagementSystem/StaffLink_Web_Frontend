// const e = require('express');

function validateNIC(nic) {
  // Remove any spaces or non-alphanumeric characters
  nic = nic.replace(/[^a-zA-Z0-9]/g, '');

  if (nic.length === 12) {
    // New NIC: Should have 10 numeric characters
    return /^\d{12}$/.test(nic);
  } else if (nic.length === 10) {
    // Old NIC: Should have 9 characters followed by 'V' or 'v'
    return /^[0-9]{9}[Vv]$/.test(nic);
  } else {
    // Invalid length
    return false;
  }
}

function ValidateEmail(input) {

  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.match(validRegex)) {
    return true;
  } else {
    return false;
  }

}

function validateContactNumber(contactNumber) {
  // Remove any spaces or non-numeric characters
  contactNumber = contactNumber.replace(/\D/g, '');

  // Check if the contact number starts with '0' and has exactly 10 digits
  return /^0\d{9}$/.test(contactNumber);
}

function usedEmail(email) {
  console.log(email);
  fetch('http://localhost:8080/try2_war_exploded/getDriver?email=' + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      if (data.message == "No driver") {
        return false;
      }
      else {
        return true;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}




document.addEventListener("DOMContentLoaded", function () {
  // const Swal = require('sweetalert2')
  const form = document.querySelector("form"),
    sub = document.querySelector(".sub");


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
  console.log("Payload", payload);


  const owner = payload.id;
  
  form.querySelector('.ownerEmail').value = owner;

  sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
    console.log("form submitted");
    // Get form elements
    const email = form.querySelector('.email').value;
    const name = form.querySelector('.name').value;
    const NIC = form.querySelector('.NIC').value;
    const age = form.querySelector('.age').value;
    const contact = form.querySelector('.contact').value;
    const ownerEmail = form.querySelector('.ownerEmail').value;
    const password = form.querySelector('.password').value;



    var checker = true;


    var emailError = document.querySelector(".email-error-message");
    var nameError = document.querySelector(".name-error-message");
    var ageError = document.querySelector(".age-error-message");
    var contactError = document.querySelector(".contact-error-message");
    var NICError = document.querySelector(".NIC-error-message");
    var ownerEmailError = document.querySelector(".ownerEmail-error-message");
    var passwordError = document.querySelector(".password-error-message");

    emailError.style.display = "none";
    nameError.style.display = "none";
    contactError.style.display = "none";
    NICError.style.display = "none";
    ownerEmailError.style.display = "none";
    passwordError.style.display = "none";
    ageError.style.display = "none";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      emailError.innerText = "Please enter an email address.";
      emailError.style.display = "block";
      console.log("email error");
      checker = false;
    }
    else if (!ValidateEmail(email)) {
      emailError.innerText = "Please enter a valid email address.";
      emailError.style.display = "block";
      console.log("email error");
      checker = false;
    }
    else if (usedEmail(email)) {
      emailError.innerText = "This driver is already registered.";
      emailError.style.display = "block";
      console.log("email error");
      checker = false;
    }
    if (!name) {
      nameError.innerText = "Please enter an owner name.";
      nameError.style.display = "block";
      console.log("name error");
      checker = false;
    }
    if (!age) {
      ageError.innerText = "Please enter an age.";
      ageError.style.display = "block";
      console.log("age error");
      checker = false;
    }
    else if (age < 16 || age > 100) {
      ageError.innerText = "Please enter a valid age.";
      ageError.style.display = "block";
      console.log("age error");
      checker = false;
    }
    if (!NIC) {
      NICError.innerText = "Please enter an NIC number.";
      NICError.style.display = "block";
      console.log("NIC error");
      checker = false;
    }
    else if (validateNIC(NIC) === false) {
      NICError.innerText = "Please enter a Valid NIC number.";
      NICError.style.display = "block";
      console.log("NIC error");
      checker = false;
    }
    if (!contact) {
      contactError.innerText = "Please enter a contact number.";
      contactError.style.display = "block";
      console.log("contact error");
      checker = false;
    }
    else if (validateContactNumber(contact) === false) {
      contactError.innerText = "Please enter a Valid contact number.";
      contactError.style.display = "block";
      console.log("contact error");
      checker = false;
    }
    if (!ownerEmail) {
      ownerEmailError.innerText = "Please enter an owner email.";
      ownerEmailError.style.display = "block";
      console.log("ownerEmail error");
      checker = false;
    }
    else if (!ValidateEmail(ownerEmail)) {
      ownerEmailError.innerText = "Please enter a valid owner email.";
      ownerEmailError.style.display = "block";
      console.log("ownerEmail error");
      checker = false;
    }
    if (!password) {
      passwordError.innerText = "Please enter a password.";
      passwordError.style.display = "block";
      console.log("password error");
      checker = false;
    }
    else if (password.length < 6) {
      passwordError.innerText = "Password should be at least 6 characters.";
      passwordError.style.display = "block";
      console.log("password error");
      checker = false;
    }

    if (checker === true) {

      const data = {
        email: email,
        name: name,
        NIC: NIC,
        age: age,
        contact: contact,
        ownerEmail: ownerEmail,
        password: password,
      };

      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/driverRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message)
          if (data.message === "Registration successfully") {
            Swal.fire({
              title: "Driver Registered!",
              icon: "success"
            }).then(() => {
              window.location.href = "drivers.html";
            })
          }
          else {
            Swal.fire({
              title: "Driver Registration Failed!",
              icon: "error"
            }).then(() => {
              window.location.href = "drivers.html";
            })
          }
          // Swal.fire({
          //   title: "Driver Registered!",
          //   text: "That thing is still around?",
          //   icon: "question"
          // });
          // window.location.href = "http://127.0.0.1:5501/Owner/drivers.html";
          // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  });

});
