let userEmail = JSON.parse(localStorage.getItem("userPersonalInfo")).email;

document.addEventListener("DOMContentLoaded", function(){
    
    document.getElementById("profile").innerHTML = `${userEmail}`;  

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.clear();
    });

    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

});
