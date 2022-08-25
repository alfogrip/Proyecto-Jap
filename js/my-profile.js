document.addEventListener("DOMContentLoaded",function(){

    let userEmail = localStorage.getItem("userEmail");
    document.getElementById("profile").innerHTML = `${userEmail}`;
})