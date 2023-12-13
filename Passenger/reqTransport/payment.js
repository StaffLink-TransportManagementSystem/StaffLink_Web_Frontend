function cardPayment(){
    console.log("card payment");

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    const vehicleNo = urlParams.get('vehicleNo')
    console.log(vehicleNo);
    const passengerEmail = urlParams.get('passengerEmail')
    console.log(passengerEmail);

    window.location.href = "./cardPayment.html?vehicleNo="+vehicleNo+"&passengerEmail="+passengerEmail;

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