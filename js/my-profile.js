let actualUser = JSON.parse(localStorage.getItem("actualUser"));
let form = document.querySelector(".needs-validation");
let dzoptions = {
    url:"/",
    autoQueue: false
};
let myDropzone = new Dropzone("div#file-upload", dzoptions);

function getImgUrl(){
    let divImg = document.querySelector(".dz-image");
    return divImg.querySelector('img').src
};

function getAndUpdateUserInformation(){

    actualUser.email = document.getElementById("inp-email").value;
    actualUser.nickName = document.getElementById("inp-nick-name").value;
    actualUser.firstName = document.getElementById("inp-name").value;
    actualUser.middleName = document.getElementById("inp-middle-name").value;
    actualUser.surname = document.getElementById("inp-surname").value;
    actualUser.secondSurname = document.getElementById("inp-second-surname").value;
    actualUser.telephone = document.getElementById("inp-tel").value;
    //actualUser.img = getImgUrl();
    localStorage.setItem("actualUser", JSON.stringify(actualUser));

};

document.addEventListener("DOMContentLoaded",function(){

    document.getElementById("inp-email").value = actualUser.email;
    document.getElementById("inp-nick-name").value = actualUser.nickName;
    document.getElementById("inp-name").value = actualUser.firstName;
    document.getElementById("inp-middle-name").value = actualUser.middleName;
    document.getElementById("inp-surname").value = actualUser.surname;
    document.getElementById("inp-second-surname").value = actualUser.secondSurname;
    document.getElementById("inp-tel").value = actualUser.telephone;

    if(actualUser.img !== "") document.getElementById("profile-img").src = actualUser.img

    document.addEventListener("submit", function(event){

        if(!form.checkValidity()){

            event.preventDefault();
            event.stopPropagation();

        } else getAndUpdateUserInformation();

        form.classList.add("was-validated")
    });

    document.getElementById("profile").innerHTML = `${actualUser.email}`;

    if(actualUser.nickName !== "") document.getElementById("div-user-name").innerHTML = `<h4>${actualUser.nickName}</h4>`

    document.getElementById("logout").addEventListener("click", function(){

        localStorage.clear();

    });
});