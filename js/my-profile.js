let userEmail = localStorage.getItem("userEmail");

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("profile").innerHTML = `${userEmail}`;
});