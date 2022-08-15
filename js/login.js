document.addEventListener("DOMContentLoaded",function(){

    document.addEventListener("submit",function(event){
        let emailUser = document.getElementById("email").value;
        let passUser = document.getElementById("pass").value;
        localStorage.setItem("email",emailUser);
        localStorage.setItem("password",passUser);
        event.preventDefault();
        // window.location.href = "https://alfogrip.github.io/proyectojap/"
        
    
    });

});