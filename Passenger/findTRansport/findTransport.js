document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form"),
        sub = document.querySelector(".sub");
    
    sub.addEventListener("click", () => {
        console.log("form submitted");
        // Get form elements
        const startingLocation = form.querySelector('.startLocation').value;
        const endingLocation = form.querySelector('.endLocation').value;
        const type = form.querySelector('.type').value;
        const startingTime = form.querySelector('.startTime').value;
        const EndingTime = form.querySelector('.offTime').value;

        var checker = true;

        var startLocationError = document.querySelector(".startLocation-error-message");
        var endLocationError = document.querySelector(".endLocation-error-message");
        var typeError = document.querySelector(".type-error-message");
        var startTimeError = document.querySelector(".startTime-error-message");
        var offTimeError = document.querySelector(".offTime-error-message");

        startLocationError.style.display = "none";
        endLocationError.style.display = "none";
        typeError.style.display = "none";
        startTimeError.style.display = "none";
        offTimeError.style.display = "none";

        if (!startingLocation) {
            startLocationError.innerText = "Please enter a starting location.";
            startLocationError.style.display = "block";
            console.log("starting location error");
            checker = false;
        }
        if (!endingLocation) {
            endLocationError.innerText = "Please enter an ending location.";
            endLocationError.style.display = "block";
            console.log("ending location error");
            checker = false;
        }
        if (!type) {
            typeError.innerText = "Please enter a type.";
            typeError.style.display = "block";
            console.log("type error");
            checker = false;
        }
        if (!startingTime) {
            startTimeError.innerText = "Please enter a starting time.";
            startTimeError.style.display = "block";
            console.log("starting time error");
            checker = false;
        }
        if (!EndingTime) {
            offTimeError.innerText = "Please enter an off time.";
            offTimeError.style.display = "block";
            console.log("off time error");
            checker = false;
        }

        // let row = "";
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = "";
      
        // demoResult.forEach(result => {
        //   const resultDiv = document.createElement("div");
        //   resultDiv.classList.add("result-item");
        //   resultDiv.innerHTML = `<p>Transport Type: ${result.serviceprovider}</p>
        //                          <p>Transport Type: ${result.transportType}</p>
        //                          <p>Departure Time: ${result.departureTime}</p>
        //                          <p>Arrival Time: ${result.arrivalTime}</p>`;
          
        //   // Add request and details buttons
        //   const buttonsDiv = document.createElement("div");
        //   buttonsDiv.classList.add("result-buttons");
        //   const requestButton = document.createElement("button");
        //   requestButton.classList.add("request-button");
        //   requestButton.innerText = "Request";
        //   const detailsButton = document.createElement("button");
        //   detailsButton.classList.add("details-button");
        //   detailsButton.innerText = "More Details";
      
        //   buttonsDiv.appendChild(requestButton);
        //   buttonsDiv.appendChild(detailsButton);
        //   resultDiv.appendChild(buttonsDiv);
      
        //   resultsContainer.appendChild(resultDiv);
        // });

        if (checker) {
            fetch('http://localhost:8080/try2_war_exploded/findTransport',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    data.list.forEach(vehical => {
                        const resultDiv = document.createElement("div");
          resultDiv.classList.add("result-item");
          resultDiv.innerHTML = `<p>Transport Vehicle No: ${vehical.vehicleNo}</p>
                                 <p>Transport Type: ${vehical.type}</p>
                                 <p>Departure Time: ${vehical.startTime}</p>
                                 <p>Arrival Time: ${vehical.offTime}</p>`;
          
          // Add request and details buttons
          const buttonsDiv = document.createElement("div");
          buttonsDiv.classList.add("result-buttons");
          const requestButton = document.createElement("button");
          requestButton.classList.add("request-button");
          requestButton.innerText = "Request";
          const detailsButton = document.createElement("button");
          detailsButton.classList.add("details-button");
          detailsButton.innerText = "More Details";
      
          buttonsDiv.appendChild(requestButton);
          buttonsDiv.appendChild(detailsButton);
          resultDiv.appendChild(buttonsDiv);
      
          resultsContainer.appendChild(resultDiv);
                        // row += ``;
                    });
                    document.querySelector(".table").innerHTML = row;
                })

                })
                .catch(error => {
                    console.log(error);
                })
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    let tripTypeSelect = document.querySelector(".type");
    let startingTimeInput = document.querySelector(".starting-time");
    let endingTimeInput = document.querySelector(".ending-time");
  
    // Initially hide the starting time and ending time input boxes
    startingTimeInput.classList.add("hide-input");
    endingTimeInput.classList.add("hide-input");
  
    tripTypeSelect.addEventListener("change", function () {
      // Show or hide the starting and ending time input boxes based on the selected option
      if (tripTypeSelect.value === "Morning") {
        startingTimeInput.classList.remove("hide-input");
        endingTimeInput.classList.add("hide-input");
      } else if (tripTypeSelect.value === "Evening" || tripTypeSelect.value === "Both") {
        startingTimeInput.classList.remove("hide-input");
        endingTimeInput.classList.remove("hide-input");
      }
    });
  });