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

    // alert("Valid email address!");

    // document.form1.text1.focus();

    return true;

  } else {

    // alert("Invalid email address!");

    // document.form1.text1.focus();

    return false;

  }

}

function validateContactNumber(contactNumber) {
  // Remove any spaces or non-numeric characters
  contactNumber = contactNumber.replace(/\D/g, '');

  // Check if the contact number starts with '0' and has exactly 10 digits
  return /^0\d{9}$/.test(contactNumber);
}

let profilePic = document.getElementById("default-pic");
let inputFile = document.getElementById("pic");

inputFile.onchange = function () {
  profilePic.src = URL.createObjectURL(inputFile.files[0]);
}



function deletePhoto() {
  document.getElementById("default-pic").src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
}


function editAcc(e) {
  e.preventDefault();
  console.log("editAcc");
  document.querySelector('.passengerName').disabled = false;
  document.querySelector('.NIC').disabled = false;
  document.querySelector('.age').disabled = false;
  document.querySelector('.Telephone').disabled = false;

  // document.querySelector('.Telephone').disabled = false;
  document.querySelector('.edit').style.display = "none";
  document.querySelector('.save').style.display = "block";


}


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

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

  const email = payload.id;

  console.log("email", email);


  fetch("http://127.0.0.1:8080/try2_war_exploded/getDriver?email=" + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },credentials: "include",
  })
    .then(response => response.json())
    .then(data => {
      console.log("Passenger data",data.driver)
      form.querySelector('.passengerID').value = data.driver.id;
      form.querySelector('.email').value = data.driver.email;
      form.querySelector('.passengerName').value = data.driver.name;
      form.querySelector('.NIC').value = data.driver.NIC;
      form.querySelector('.age').value = data.driver.age;
      form.querySelector('.ownerEmail').value = data.driver.ownerEmail;
      form.querySelector('.Telephone').value = data.driver.contact;
      


    })
    .catch(error => {
      console.error('Error:', error);
    });


});

function updateProfile(e) {
  e.preventDefault();
  const form = document.querySelector("form"),
    sub = document.querySelector(".sub");

  const id = form.querySelector('.passengerID').value;
  const name = form.querySelector('.passengerName').value;
  const NIC = form.querySelector('.NIC').value;
  const age = form.querySelector('.age').value;
  const contact = form.querySelector('.Telephone').value;
  const email = form.querySelector('.email').value;
  // const Telephone = form.querySelector('.Telephone').value;
  // const profilePic = document.getElementById("default-pic");

  console.log("update form submitted");
  console.log(id);
  console.log(name);
  console.log(NIC);
  // console.log(Telephone);
  console.log(email);

  var checker = true;

  var nameError = document.querySelector(".name-error-message");
  var NICError = document.querySelector(".nic-error-message");
  var contactError = document.querySelector(".contact-error-message");
  var emailError = document.querySelector(".email-error-message");
  var ageError = document.querySelector(".age-error-message");

  nameError.style.display = "none";
  NICError.style.display = "none";
  contactError.style.display = "none";
  ageError.style.display = "none";
  emailError.style.display = "none";

  if (!name) {
    nameError.innerText = "Please enter your name.";
    nameError.style.display = "block";
    console.log("name error");
    checker = false;
  }
  if (!NIC) {
    NICError.innerText = "Please enter your NIC.";
    NICError.style.display = "block";
    console.log("NIC error");
    checker = false;
  }
  else if (!validateNIC(NIC)) {
    NICError.innerText = "Please enter a valid NIC.";
    NICError.style.display = "block";
    console.log("NIC error");
    checker = false;
  }
  
  if (!email) {
    emailError.innerText = "Please enter your email.";
    emailError.style.display = "block";
    console.log("email error");
    checker = false;
  }
  else if (!ValidateEmail(email)) {
    emailError.innerText = "Please enter a valid email.";
    emailError.style.display = "block";
    console.log("email error");
    checker = false;
  }
  if (!age) {
    ageError.innerText = "Please enter your age.";
    ageError.style.display = "block";
    console.log("age error");
    checker = false;
  }
  else if (age < 18||age>100) {
    ageError.innerText = "Please enter a valid age.";
    ageError.style.display = "block";
    console.log("age error");
    checker = false;
  }
  if (!contact) {
    contactError.innerText = "Please enter your contact number.";
    contactError.style.display = "block";
    console.log("contact error");
    checker = false;
  }
  else if (!validateContactNumber(contact)) {
    contactError.innerText = "Please enter a valid contact number.";
    contactError.style.display = "block";
    console.log("contact error");
    checker = false;
  }

  if (checker === true) {
    console.log("update form submitted");
    console.log(id);
    console.log(name);
    console.log(NIC);
    // console.log(Telephone);
    console.log(email);

    const data = {
      id: id,
      name: name,
      NIC: NIC,
      email: email,
      age: age,
      contact: contact,
      // profilePic: profilePic
    }
    // alert("Your profile has been updated successfully!");
    fetch('http://127.0.0.1:8080/try2_war_exploded/driverEdit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify(data), credentials: "include",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        if (data.message === "Update successfully") {
          Swal.fire({
            title: "Driver Updated Successfully!",
            icon: "success"
          }).then(() => {
            window.location.href = "profile.html";
          })
        }
        else {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error"
          }).then(() => {
            window.location.href = "profile.html";
          })
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}


function deleteAccount() {

  console.log("deleteAccount");
  
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
  
    const email = payload.id;

  const data = { email: email };
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',

    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes!'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("http://127.0.0.1:8080/try2_war_exploded/driverDelete", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },credentials: "include", body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          if (data.message === "Delete successfully") {
            Swal.fire({
              title: "Deleted Successfully!",
              icon: "success"
            }).then(() => {
              window.location.href = "../login-register/index.html";
            })
          }
          if (data.message === "Driver is still assigned to a vehicle") {
            Swal.fire({
              title: "Driver is still assigned to a vehicle!",
              icon: "error"
            }).then(() => {
              window.location.href = "profile.html";
            })
          }
          else {
            Swal.fire({
              title: "Something went wrong!",
              icon: "error"
            }).then(() => {
              window.location.href = "profile.html";
            })
          }
        })
    }

  })
}

//Live location sharing
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
  console.log("Payload", payload);

  var driverEmail = payload.id;

  
  fetch("http://127.0.0.1:8080/try2_war_exploded/checkOnTrip?email=" + driverEmail, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }, credentials: "include",
  })
      .then(response => response.json())
      .then(data => {
          console.log(data.message);
          if (data.message === "On Trip") {
              // onTheTrip();
              var tripbutton = document.getElementById("startTrip");
              tripbutton.innerHTML = "End Trip";
              tripbutton.setAttribute("onclick", "endTrip()");
              tripbutton.classList.add("delete-btn");
              onTripStatus = "ontrip";
              console.log("onTripStatus update", onTripStatus);
          }
      })
      .catch(error => {
          console.error('Error:', error);


      })

  var interval = setInterval(getLocation, 30000);

});

function getLocation() {
  // alert("Getting Location", onTripStatus);
  if (onTripStatus == "ontrip") {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          alert("Geolocation is not supported by this browser.");
      }
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // alert("Latitude: " + latitude + "\nLongitude: " + longitude);
  var data = {
      email: driverEmail,
      latitude: latitude,
      longitude: longitude
  }

  console.log("data to location",data);

  fetch("http://127.0.0.1:8080/try2_war_exploded/createLocationTracking", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      }, credentials: "include", body: JSON.stringify(data)
  })
      .then(response => response.json())
      .then(data => {
          console.log("Location data", data.message);

      })

}