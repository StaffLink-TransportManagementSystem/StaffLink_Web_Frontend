function getData() {
    fetch('localhost:15000/project_name/passengerRegister',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }})
        .then(response => response.json())
        .then(data => {
            console.log(data.message)
            // document.getElementById("demo").innerHTML = data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

getData()