function cardPayment(){
    console.log("card payment");

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);

    
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
}