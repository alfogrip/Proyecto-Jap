let userEmail = localStorage.getItem("userEmail");
let prodID = localStorage.getItem("prodID");
let productInfo = undefined;
let commentsArray = [];
let currentCommentsArray = [];
let PRODUCTS_INFO_ID_URL = `${PRODUCT_INFO_URL}${prodID}${EXT_TYPE}`;
let PRODUCT_COMMENTS_ID_URL = `${PRODUCT_INFO_COMMENTS_URL}${prodID}${EXT_TYPE}`;

function addNewComment(score,desc,date){
    let newComment = {
        "product": parseInt(prodID),
        "score": parseInt(score),
        "description": desc,
        "user": userEmail,
        "dateTime": date
    };
    currentCommentsArray = commentsArray;
    currentCommentsArray.push(newComment);
    showComments(currentCommentsArray);
}

function showComments(array){
    let htmlContentToAppend = "";
    let addComments = "";
    for(let i = 0; i < array.length; i++){
        addComments += `
        <li class="list-group-item">
            <p class="m-0"><b>${array[i].user}</b> - ${array[i].dateTime} - ${array[i].score}</p>
            <p class="m-0">${array[i].description}</p>
        </li>
        `
    };
    htmlContentToAppend += `
    <div class="row">
        <h4 class="mt-4">Comentarios</h4>
        <div>
            <ul class="list-group">${addComments}</ul>
        </div>
    </div>
    `
    document.getElementById("product-comments").innerHTML = htmlContentToAppend;
};

function showProduct(prod){
    let htmlContentToAppend = ""
    let addImages = "";
    let imgArray = prod.images;
    for(let i = 0; i < imgArray.length; i++){
        addImages += `
        <div class="col-3">
            <img src="${imgArray[i]}" class="img-thumbnail">
        </div>
        `
    };
    htmlContentToAppend += `
        <div class="row">
            <h3 class="my-4">${prod.name}</h3><hr>
            <b>Precio</b>
            <p>${prod.currency} ${prod.cost}</p>
            <b>Descripción</b>
            <p>${prod.description}</p>
            <b>Categoría</b>
            <p>${prod.category}</p>
            <b>Cantidad de vendidos</b>
            <p>${prod.soldCount}</p>
            <b>Imágenes ilustrativas</b>
            ${addImages}
        </div>
        `
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
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

    // Agrega el email en el encabezado
    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("add-comment").addEventListener("submit",function(event){
        event.preventDefault();

        let comment = document.getElementById("textArea").value;
        let date = new Date().toLocaleString();
        let score = document.getElementById("select-score").value;
        addNewComment(score,comment,date);
        document.getElementById("textArea").value = "";
    })
});