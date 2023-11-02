document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const vehicleNo = window.location.href.split("=")[1];

    // console.log(window.location.href.split("=")[1]);
    
  
    fetch("http://localhost:8080/try2_war_exploded/getOwner?email=" + email ,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(data => {
                console.log(data.owner) 
                form.querySelector('.email').value = data.owner.email;  
                form.querySelector('.name').value = data.owner.name;
                form.querySelector('.NIC').value = data.owner.NIC;
                form.querySelector('.contact').value = data.owner.contact;
                
                

            })
            .catch(error => {
                console.error('Error:', error);
            });
            
    
  });


  
  function updatefunction() {

    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");
      // Get form elements
      const email = form.querySelector('.email').value;
      const name = form.querySelector('.name').value;
      const NIC = form.querySelector('.NIC').value;
      const contact = form.querySelector('.contact').value;
      

        

  
      // Validate form data (You can add more validation as needed)
      if (!email ) {
        alert("Please fill in all required fields.");
      }
      else if (!name) {
        alert("Please fill in all required fields.");
      }
      else if(!NIC){
        alert("Please fill in all required fields.");
      }
      else if(!contact){
        alert("Please fill in all required fields.");
      }
        
        else {
            // All form data are valid, so submit to the server
           
  
      // Prepare the data to send to the backend (You can structure it as needed)
      const data = {
        email:email,
        name:name,
        NIC:NIC,
        contact:contact,
       
      };
  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/ownerEdit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/ownerDashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    });

  };

  function deletefunction() {

    const form = document.querySelector("form"),
     sub = document.querySelector(".sub");
  
    sub.addEventListener("click", () => {
    //   event.preventDefault(); // Prevent the default form submission
        console.log("update form submitted");

      const email = form.querySelector('.email').value;
      
      const data = {
        email:email,}

  
      // Simulate an HTTP POST request to a backend endpoint (replace with your actual backend URL)
      fetch('http://localhost:8080/try2_war_exploded/ownerDelete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(data),})
            .then(response => response.json())
            .then(data => {
                console.log(data.message)
                window.location.href = "http://127.0.0.1:5501/Owner/ownerDashboard.html";
                // document.getElementById("demo").innerHTML = data.message;
            })
            .catch(error => {
                console.error('Error:', error);
            });
      }
    );
  };



  