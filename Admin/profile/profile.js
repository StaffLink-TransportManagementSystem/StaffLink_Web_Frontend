let profilePic = document.getElementById("default-pic");
let inputFile = document.getElementById("pic");

inputFile.onchange = function(){
    profilePic.src = URL.createObjectURL(inputFile.files[0]);
}



function deletePhoto() {
    document.getElementById("default-pic").src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
}
