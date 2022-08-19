document.addEventListener("DOMContentLoaded",function(){

    let userEmail = document.getElementById("email");
    let userPass = document.getElementById("pass");
    let pEmail = "Ingrese un email";
    let pPass = "Ingrese una contraseña";

    document.getElementById("form-login").addEventListener("submit",function(event){
        event.preventDefault();
        
        if (userEmail.value == "" && userPass.value == ""){
            userEmail.style.border = "red solid 1px";
            userPass.style.border = "red solid 1px";
            document.getElementById("p-email").innerHTML = pEmail;
            document.getElementById("p-pass").innerHTML = pPass;
        } else if (userEmail.value == ''){
            userEmail.style.border = "red solid 1px";
            document.getElementById("p-email").innerHTML = pEmail;
        } else if(userPass.value == ''){
            userPass.style.border = "red solid 1px";
            document.getElementById("p-pass").innerHTML = pPass;
        } else{
            window.location.href = "home.html";
        }

    });

});