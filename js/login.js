let email = document.getElementById("email");
let pass = document.getElementById("pass");
let pEmail = "Ingrese un email";
let pPass = "Ingrese una contraseña"

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("form-login").addEventListener("submit",function(event){
        event.preventDefault(); 

        localStorage.setItem("userEmail",email.value);
        localStorage.setItem("userPass",pass.value);  

        if (email.value == "" && pass.value == ""){
            email.style.border = "red solid 1px";
            pass.style.border = "red solid 1px";
            document.getElementById("p-email").innerHTML = pEmail;
            document.getElementById("p-pass").innerHTML = pPass;
        } else if (email.value == ''){
            email.style.border = "red solid 1px";
            document.getElementById("p-email").innerHTML = pEmail;
        } else if(pass.value == ''){
            pass.style.border = "red solid 1px";
            document.getElementById("p-pass").innerHTML = pPass;
        } else{
            window.location.href = "home.html";
        }
    });
    // Inicio de sesión con Google


});