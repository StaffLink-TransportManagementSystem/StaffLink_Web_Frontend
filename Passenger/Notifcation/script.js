// Selecting all required elements
const wrapper = document.querySelector(".wrapper"),
toast = wrapper.querySelector(".toast"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

// JavaScript Code
window.onload = () => {
    // ...
    function ajax() {
      // ...
      if (xhr.status == 200 && xhr.status < 300) {
        toast.classList.remove("offline");
        title.innerText = "Notification";
        subTitle.innerText = "Notification message goes here.";
        wifiIcon.innerHTML = "<i class='bx bxs-bus-school'></i>";
  
        // Set different notification messages based on conditions
        // if (/* Condition for bus arrival */) {
        //   title.innerText = "Bus Arrived";
        //   subTitle.innerText = "Your bus has arrived!";
        // } else if (/* Condition for payment due */) {
        //   title.innerText = "Payment Due";
        //   subTitle.innerText = "Payment for your reservation is due soon.";
        // } else if (/* Condition for payment received */) {
        //   title.innerText = "Payment Received";
        //   subTitle.innerText = "Your payment has been received. Thank you!";
        // }
  
        closeIcon.onclick = () => {
          wrapper.classList.add("hide");
        };
  
        setTimeout(() => {
          wrapper.classList.add("hide");
        }, 5000);
      } else {
        offline();
      }
    }
    // ...
  };
  

let sidebar = document.querySelector(".sidebar");
      let sidebarBtn = document.querySelector(".sidebarBtn");
      sidebarBtn.onclick = function () {
        sidebar.classList.toggle("active");
        if (sidebar.classList.contains("active")) {
          sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      };