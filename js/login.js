let form = document.querySelector(".needs-validation");
let userPersonalInfo = {
    email: '',
    password: '',
    userName: '',
    firstName: '',
    secondName: '',
    surname: '',
    secondSurname: '',
    telephone: '',
    img: ''
};

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
    console.log("llego")
};

document.addEventListener("DOMContentLoaded",function(){
    form.addEventListener("submit",function(event){
        if(!form.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
        } else{
            userPersonalInfo.email = document.getElementById("email").value;
            userPersonalInfo.password = document.getElementById("pass").value;
            localStorage.setItem("userPersonalInfo",JSON.stringify(userPersonalInfo));
            form.classList.add("was-validated");
            window.location.href = "home.html";
            event.preventDefault();
        }
        form.classList.add("was-validated");
    });

});