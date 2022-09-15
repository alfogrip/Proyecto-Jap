let email = document.getElementById("email");
let pass = document.getElementById("pass");
let pEmail = "Ingrese un email";
let pPass = "Ingrese una contraseña"

// Función que parsea el token de Google para el inicio de sesión.
function parseJwt(token){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

function handleCredentialResponse(response){
    const responsePayload = parseJwt(response.credential);
    localStorage.setItem("userEmail",responsePayload.email);
    window.location.href = "home.html";
};

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

});