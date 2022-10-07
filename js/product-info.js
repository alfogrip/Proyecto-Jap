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

function addToCart(prod,count){
    let prodToAdd = {
        "count": count,
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
    for(let j = 0; j < 5-rate; j++){
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
        <div id="img${i}" class="col">
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
            <div class="col">
                <img class="img-thumbnail" id="mainImg" src="${imgArray[0]}">
                <div class="row mt-2">
                    ${addImages}
                </div>
            </div>
            <div class="col">
                <h3 class="my-4">${prod.name}</h3>
                <p>${prod.description}</p>
                <p><b>Precio: </b>${prod.currency} ${prod.cost}</p>
                <p><b>Categoría: </b>${prod.category}</p>
                <p><b>Vendidos: </b>${prod.soldCount}</p>
                <p><b>Cantidad: </b>
                    <input class="form-control w-25" type="number" value="1" id="product-amount" min="1">
                </p>
                <div class="row" id="div-btn-addToCart">
                    <div class="col-4">
                        <button class="btn btn-primary" id="btn-addToCart" type="button">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div><hr>
        `
    document.getElementById("product-info").innerHTML = productInfo;
    document.getElementById("related-products").innerHTML = relatedProducts;
    document.getElementById("btn-addToCart").addEventListener("click", function(){
        let amount = document.getElementById("product-amount").value;
        // let container = document.getElementById("div-btn-addToCart");
        // let div = document.createElement("div");
        // div.classList.add("col");
        // div.classList.add("justify-content-center");
        // div.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`
        // container.appendChild(div);
        addToCart(prod,amount);
    });
    
    document.getElementById("img0").addEventListener("mouseover",function(){
        document.getElementById("mainImg").src = `${imgArray[0]}`;
    });
    document.getElementById("img1").addEventListener("mouseover",function(){
        document.getElementById("mainImg").src = `${imgArray[1]}`;
    });
    document.getElementById("img2").addEventListener("mouseover",function(){
        document.getElementById("mainImg").src = `${imgArray[2]}`;
    });
    document.getElementById("img3").addEventListener("mouseover",function(){
        document.getElementById("mainImg").src = `${imgArray[3]}`;
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