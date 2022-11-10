document.addEventListener("DOMContentLoaded", function(){

    if(JSON.parse(localStorage.getItem("userPersonalInfo")) !== null){
        let userEmail = JSON.parse(localStorage.getItem("userPersonalInfo")).email;
        document.getElementById("nav-profile").innerHTML = `
        <a class="nav-link dropdown-toggle" id="profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">${userEmail}</a>
        <ul class="dropdown-menu" aria-labelledby="profile">
            <li><a class="dropdown-item" href="cart.html"><i class="fa fa-shopping-cart"></i> Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html"><i class="fa fa-user"></i>  Mi perfil</a></li>
            <li><a class="dropdown-item" href="login.html" id="logout"><i class="fa fa-sign-out"></i> Cerrar sesión</a></li>
        </ul
        `
        document.getElementById("logout").addEventListener("click", function(){
            localStorage.clear();
        });
    }; 

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
