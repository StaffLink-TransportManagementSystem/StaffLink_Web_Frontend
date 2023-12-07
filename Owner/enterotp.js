const codes = document.querySelectorAll(".code")

codes[0].focus()

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= 0 && e.key <= 9) {
            codes[idx].value = ''
            setTimeout(() => codes[idx + 1].focus(), 10)
        }
        else if(e.key === 'Backspace'){
            setTimeout(() => codes[idx - 1].focus(), 10)
        }
    })
})


function veify(){
    number01 = document.querySelector(".number01").value;
    number02 = document.querySelector(".number02").value;
    number03 = document.querySelector(".number03").value;
    number04 = document.querySelector(".number04").value;

    if(number01 == "" || number02 == "" || number03 == "" || number04 == ""){
        Swal.fire({
            title: "Please enter the OTP!",
            icon: "warning"
          }).then(()=>{
            window.location.href = "http://127.0.0.1:5501/Owner/profile.html";
          })
        //   alert("Please enter the OTP");
    }
    else{
        if(number01 == "1" && number02 == "2" && number03 == "3" && number04 == "4"){
            // alert("OTP verified");
            window.location.href = "http://127.0.0.1:5501/Owner/changepass.html";
        }
        else{
            Swal.fire({
                title: "Incorrect OTP!",
                icon: "error"
              }).then(()=>{
                window.location.href = "http://127.0.0.1:5501/Owner/enterotp.html";
              })
            // window.location.href = "http://127.0.0.1:5501/Owner/enterotp.html";
        }
        
    }
}