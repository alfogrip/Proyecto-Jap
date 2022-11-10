let userEmail = JSON.parse(localStorage.getItem("userPersonalInfo")).email;
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

function getUserInformation(){
    userPersonalInfo = {
        email: `${document.getElementById("inp-email").value}`,
        nickName: `${document.getElementById("inp-nick-name").value}`,
        firstName: `${document.getElementById("inp-name").value}`,
        middleName: `${document.getElementById("inp-middle-name").value}`,
        surname: `${document.getElementById("inp-surname").value}`,
        secondSurname: `${document.getElementById("inp-second-surname").value}`,
        telephone: `${document.getElementById("inp-tel").value}`,
        img: `${getImgUrl()}`
    };
    localStorage.setItem("userPersonalInfo",JSON.stringify(userPersonalInfo));
};


document.addEventListener("DOMContentLoaded",function(){

    if (JSON.parse(localStorage.getItem("userPersonalInfo")) != null){
        userPersonalInfo = JSON.parse(localStorage.getItem("userPersonalInfo"));
        document.getElementById("inp-email").value = userPersonalInfo.email;
        document.getElementById("inp-nick-name").value = userPersonalInfo.nickName;
        document.getElementById("inp-name").value = userPersonalInfo.firstName;
        document.getElementById("inp-middle-name").value = userPersonalInfo.middleName;
        document.getElementById("inp-surname").value = userPersonalInfo.surname;
        document.getElementById("inp-second-surname").value = userPersonalInfo.secondSurname;
        document.getElementById("inp-tel").value = userPersonalInfo.telephone;
        if(userPersonalInfo.nickName !== ""){
            document.getElementById("div-user-name").innerHTML = `<h4>${userPersonalInfo.nickName}</h4>`
        }
        if(userPersonalInfo.img !== ""){
            document.getElementById("profile-img").src = userPersonalInfo.img;
        }
    };

    document.addEventListener("submit", function(event){
        if(!form.checkValidity()){
            event.preventDefault();
            event.stopPropagation();
        } else{
            getUserInformation();
        }  
        form.classList.add("was-validated")
    });

    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.clear();
    });
});