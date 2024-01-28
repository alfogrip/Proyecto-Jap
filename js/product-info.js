let userEmail = JSON.parse(localStorage.getItem("actualUser")).email;
let prodID = localStorage.getItem("prodID");
let cartArticles = JSON.parse(localStorage.getItem("cartArt"));
let productInfo = undefined;
let commentsArray = []; 
let currentCommentsArray = [];
let PRODUCTS_INFO_ID_URL = `${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`;
let PRODUCT_COMMENTS_ID_URL = `${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`;

function setNewProductID(id){
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
};

function addToCart(prod,count){

    let i = 0;
    let prodToAdd = {
        "count": count,
        "currency": prod.currency,
        "id": prod.id,
        "image": prod.images[0],
        "name": prod.name,
        "unitCost": prod.cost
    };

    if(cartArticles === null){

        cartArticles = [];
        cartArticles.push(prodToAdd);
        localStorage.setItem("cartArt",JSON.stringify(cartArticles));

    } else {

        while(i < cartArticles.length && cartArticles[i].id != prodToAdd.id){
            i++
        };

        if(i >= cartArticles.length){

            cartArticles.push(prodToAdd);
            localStorage.setItem("cartArt",JSON.stringify(cartArticles));

        } else {

            cartArticles[i].count += prodToAdd.count;
            localStorage.setItem("cartArt",JSON.stringify(cartArticles));

        };              
    };
};

function addStarRating(rate){
    let htmlContentToAppend = "";
    for(let i = 0; i < rate; i++){
        htmlContentToAppend += `
        <span class="fa fa-star checked"></span>
        `
    };
    for(let j = 0; j < 5-rate; j++){
        htmlContentToAppend += `
        <span class="fa fa-star"></span>
        `
    };
    return htmlContentToAppend;
}

function addNewComment(score,desc,date){
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let newComment = {
        "product": parseInt(prodID),
        "score": parseInt(score),
        "description": desc,
        "user": userEmail,
        "dateTime": `${year}-${month}-${day} ${date.toLocaleTimeString()}`
    };
    currentCommentsArray = commentsArray;
    currentCommentsArray.push(newComment);
    showComments(currentCommentsArray);
};

function showComments(array){
    let htmlContentToAppend = "";
    let addComments = "";
    if (array.length !== 0){
        for(let i = 0; i < array.length; i++){
            addComments += `
            <li class="list-group-item">
                <p class="m-0"><b>${array[i].user}</b> - ${array[i].dateTime} - ${addStarRating(array[i].score)}</p>
                <p class="m-0">${array[i].description}</p>
            </li>
            `
        };
    } else {
        addComments += `
        <p class="m-0">Todavía no hay comentarios.</p>
        `
    };
    htmlContentToAppend += `
    <div class="row mt-4">
        <hr><h4 class="my-4">Comentarios</h4>
        <div>
            <ul class="list-group">${addComments}</ul>
        </div>
    </div>
    `
    document.getElementById("product-comments").innerHTML = htmlContentToAppend;
};

function showProduct(prod){
    let productInfo = "";
    let addImages = "";
    let imgArray = prod.images;
    let relatedProducts = "";
    let relatedProdInfo = "";
    for(let i = 0; i < imgArray.length; i++){
        addImages += `
        <div id="img${i}" class="mb-2">
            <img src="${imgArray[i]}" class="img-thumbnail">
        </div>
        `
    };
    for(let i = 0; i < prod.relatedProducts.length; i++){
        relatedProdInfo += `
        <div onclick="setNewProductID(${prod.relatedProducts[i].id})" class="col-3 card-group cursor-active">
            <div class="card">
                <img src="${prod.relatedProducts[i].image}" class="card-img-top">
                <h5 class="card-title my-4 mx-2">${prod.relatedProducts[i].name}</h5>
            </div>
        </div>
        `
    };
    relatedProducts += `
    <div class="container">
        <div class="row">
            <h4 class="my-3">Productos relacionados</h4>
            ${relatedProdInfo}
        </div>
    </div>
    `
    productInfo += `
        <div class="row mt-5">
            <div class="col-1">
                ${addImages}
            </div>
            <div class="col">
                <img class="img-thumbnail" id="main-img" src="${imgArray[0]}">
            </div>
            <div class="col-4 prod-info">
                <h3>${prod.name}</h3>
                <p>${prod.description}</p>
                <p><b class="sub-heading">Precio: </b>${prod.currency} ${prod.cost}</p>
                <p><b class="sub-heading">Categoría: </b>${prod.category}</p>
                <p><b class="sub-heading">Vendidos: </b>${prod.soldCount}</p>
                <p><b class="sub-heading">Cantidad: </b>
                    <input class="form-control w-25" type="number" value="1" id="product-amount" min="1">
                </p>
                <button class="button add-to-cart" id="btn-add-to-cart" type="button">Agregar al carrito</button>
            </div>
        </div>
        `
    document.getElementById("product-info").innerHTML = productInfo;
    document.getElementById("related-products").innerHTML = relatedProducts;
    document.getElementById("btn-add-to-cart").addEventListener("click", function(){
        
        if(userEmail !== undefined){

            let amount = Math.round(document.getElementById("product-amount").value);
            addToCart(prod,amount);
            alert('¡El producto se agregó correctamente!')

        } else alert('Debes iniciar sesión para agregar productos al carrito.');

    });

    for(let i = 0; i < imgArray.length; i++){

        document.getElementById(`img${i}`).addEventListener("mouseover",function(){
            document.getElementById("main-img").src = `${imgArray[i]}`;

        })

    };

};


document.addEventListener("DOMContentLoaded",function(){

    getJSONData(PRODUCT_COMMENTS_ID_URL).then(objProdComments => { 
        if (objProdComments.status === "ok") {
            commentsArray = objProdComments.data;
            showComments(commentsArray);
        };
    });

    getJSONData(PRODUCTS_INFO_ID_URL).then(objProductInfo => { 
        if (objProductInfo.status === "ok") {
            productInfo = objProductInfo.data;
            showProduct(productInfo);
        };
    });

    if(JSON.parse(localStorage.getItem("actualUser")) !== null){

        document.getElementById("nav-profile").innerHTML = `
            <a class="nav-link dropdown-toggle" id="profile" role="button" data-bs-toggle="dropdown" aria-expanded="false">${userEmail}</a>
            <ul class="dropdown-menu" aria-labelledby="profile">
                <li><a class="dropdown-item" href="cart.html"><i class="fa fa-shopping-cart"></i> Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html"><i class="fa fa-user"></i>  Mi perfil</a></li>
                <li><a class="dropdown-item" href="login.html" id="logout"><i class="fa fa-sign-out"></i> Cerrar sesión</a></li>
            </ul>
        `
        document.getElementById("logout").addEventListener("click", function(){
            localStorage.clear();
        });
    };

    document.getElementById("add-comment").addEventListener("submit",function(event){

        event.preventDefault();

        let comment = document.getElementById("textArea").value;
        let date = new Date();
        let score = document.getElementById("select-score").value;

        if(comment != "" && score != 0){
            addNewComment(score,comment,date);
            document.getElementById("textArea").value = "";
            document.getElementById("select-score").value = 0;

        } else alert(`Por favor ingrese un comentario y un puntaje antes de enviar.`);

    });

});
