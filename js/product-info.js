let userEmail = localStorage.getItem("userEmail");
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

function addToCart(prod){
    let prodToAdd = {
        "count": 1,
        "currency": prod.currency,
        "id": prod.id,
        "image": prod.images[0],
        "name": prod.name,
        "unitCost": prod.cost
    };
    if(cartArticles == null){
        cartArticles = [];
        cartArticles.push(prodToAdd);
        localStorage.setItem("cartArt",JSON.stringify(cartArticles));
    } else{
        cartArticles.push(prodToAdd);
        localStorage.setItem("cartArt",JSON.stringify(cartArticles));
    };
};

function addStarRating(rate){
    let htmlContentToAppend = "";
    for(let i = 0; i < rate; i++){
        htmlContentToAppend += `
        <span class="fa fa-star checked"></span>
        `
    };
    for(let i = 0; i < 5-rate; i++){
        htmlContentToAppend += `
        <span class="fa fa-star"></span>
        `
    };
    return htmlContentToAppend;
};

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
    if (array.length != 0){
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
    <div class="row">
        <h4 class="my-4">Comentarios</h4>
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
        <div class="col-3">
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
        <div>
            <h3 class="my-4">${prod.name}</h3><hr>
        </div>
        <div class="row">
            <div class="col">
                <div id="carousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="5000">
                            <img src="${imgArray[0]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="${imgArray[1]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="${imgArray[2]}" class="d-block w-100">
                        </div>
                        <div class="carousel-item" data-bs-interval="5000">
                            <img src="${imgArray[3]}" class="d-block w-100">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                <div class="row mt-2">
                    ${addImages}
                </div>
            </div>
            <div class="col">
                <p class="mb-0 mt-2"><b>Precio</b></p>
                <p>${prod.currency} ${prod.cost}</p>
                <p class="mb-0 mt-2"><b>Descripción</b></p>
                <p>${prod.description}</p>
                <p class="mb-0 mt-2"><b>Categoría</b></p>
                <p>${prod.category}</p>
                <p class="mb-0 mt-2"><b>Cantidad de vendidos</b></p>
                <p>${prod.soldCount}</p>
                <button class="btn btn-primary" id="btn-addToCart" type="button">Agregar al carrito</button>
            </div>
        </div>
        `
    document.getElementById("product-info").innerHTML = productInfo;
    document.getElementById("related-products").innerHTML = relatedProducts; 
    document.getElementById("btn-addToCart").addEventListener("click", function(){
        addToCart(prod);
    });
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

    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.clear();
    });

    document.getElementById("add-comment").addEventListener("submit",function(event){
        event.preventDefault();

        let comment = document.getElementById("textArea").value;
        let date = new Date();
        let score = document.getElementById("select-score").value;
        if(comment != "" && score != 0){
            addNewComment(score,comment,date);
            document.getElementById("textArea").value = "";
            document.getElementById("select-score").value = 0;
        } else {
            alert("Debe ingresar un comentario y un puntaje antes de enviar.")
        };
    });
});