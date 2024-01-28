let form = document.querySelector(".needs-validation");
let actualUser = {};

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

    let googleUser = {
        email: responsePayload.email,
        nickName: '',
        firstName: responsePayload.given_name,
        middleName: '',
        surname: responsePayload.family_name,
        secondSurname: '',
        telephone: '',
        img: '' 
    }

    actualUser = googleUser;
    users.push(googleUser);
    localStorage.setItem("actualUser",JSON.stringify(actualUser));
    window.location.href = "index.html";

};

function createNewUser(email,pass){
    let userPersonalInfo = {
        email: email,
        password: pass,
        nickName: '',
        firstName: '',
        middleName: '',
        surname: '',
        secondSurname: '',
        telephone: '',
        img: ''
    };
    actualUser = userPersonalInfo;
};

document.addEventListener("DOMContentLoaded",function(){

    form.addEventListener("submit",function(event){

        if(!form.checkValidity()){
            
            event.preventDefault();
            event.stopPropagation();

        } else {

            let userEmail = document.getElementById("email").value;
            let userPass = document.getElementById("pass").value;
            createNewUser(userEmail,userPass);
            window.location.href = "index.html";
            event.preventDefault();
            localStorage.setItem("actualUser",JSON.stringify(actualUser));
            
        }
        form.classList.add("was-validated");
    });
    
});