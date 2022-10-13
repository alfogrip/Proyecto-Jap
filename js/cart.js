let userEmail = localStorage.getItem("userEmail");
let cartArray = [];
let productsToAdd = JSON.parse(localStorage.getItem("cartArt"));
let CART_USER = `${CART_INFO_URL}25801${EXT_TYPE}`;

function deleteProdFromCart(prod){
    productsToAdd = productsToAdd.filter(elem => elem.id != prod.id)
    localStorage.setItem("cartArt",JSON.stringify(productsToAdd))
};

function selectDelivery(){
    let container = document.getElementById("container");
    let divDelivery = document.createElement("div");
    divDelivery.classList.add("row");
    divDelivery.innerHTML = `
    <div class="col-5">
        <form action="" method="get">
            <h4 class="mt-4">Tipo de envío</h4>
                <p class="m-0">
                    <input type="radio" id="premium" name="delivery" value="premium">
                    <label for="premium">Premium 2 a 5 días (15%)</label>
                </p>
                <p class="m-0">
                    <input type="radio" id="express" name="delivery" value="express">
                    <label for="express">Express 5 a 8 días (7%)</label>
                </p>
                <p class="m-0">
                    <input type="radio" id="standard" name="delivery" value="standard">
                    <label for="standard">Standard 12 a 15 días (5%)</label>
                </p> 
        </form>
    </div>
    <div class="col-6">
        <form action="" method="get">
            <h4 class="mt-4">Dirección</h4>
            <div class="row mb-2">
                <div class="col">
                    <label for="street">Calle</label>
                    <input class="form-control type="text" name="street" id="street" required>
                </div>
                <div class="col">
                    <label for="number">Número</label>
                    <input class="form-control type="text" name="number" id="number" required>
                </div>
                <div class="col">
                <label for="corner">Esquina</label>
                <input class="form-control type="text" name="corner" id="corner" required>
            </div>
            </div>
        </form>
    </div>
    `
    container.appendChild(divDelivery);
};

function showCartArticles(array){
    let container = document.getElementById("container");
    let divCart = document.createElement("div");
    let listOfArticles = document.createElement("ul");
    let listHeader = document.createElement("li");
    listOfArticles.classList.add("list-group");
    listHeader.classList.add("list-group-item");
    listHeader.innerHTML = `
        <div class="row ">
            <div class="col-2">
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0"><b>Nombre</b></p>
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0"><b>Costo</b></p>   
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0"><b>Cantidad</b></p>
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0"><b>Subtotal</b></p>
            </div>
            <div class="col-1">
            </div>
        </div>
    
    `
    listOfArticles.appendChild(listHeader);
    for(let i = 0; i < array.length; i++){
        let article = document.createElement("li");
        article.classList.add("list-group-item")
        article.innerHTML = `
        <div class="row d-flex align-items-center">
            <div class="col-2">
                <img src="${array[i].image}" class="img-thumbnail" alt="imagen del producto">
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0">${array[i].name}</p>
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0">${array[i].currency}${array[i].unitCost}</p>
            </div>
            <div class="col d-flex justify-content-center">
                <div class="col-4">
                    <input class="form-control" type="number" value="${array[i].count}" min="1">
                </div>
            </div>
            <div class="col d-flex justify-content-center">
                <p class="m-0">${array[i].currency}${array[i].unitCost * array[i].count}</p>
            </div>
            <div class="col-1">
                <button class="btn-check" name="delete" id="btn-delete${i}"></button>
                <label class="btn btn-light" for="btn-delete${i}"><i class="fa fa-trash-o"></i></label>
            </div>
        </div>
        `
        article.addEventListener("input",function(){
            let quantity = parseInt(article.getElementsByTagName("input")[0].value);
            let div = article.getElementsByTagName("div")[6];
            let totalPrice = quantity * array[i].unitCost;
            array[i].count = quantity;
            console.log(array[i].count)
            div.innerHTML = `
            <p>${array[i].currency}${totalPrice}</p>
            `
        });
        article.getElementsByTagName("button")[0].addEventListener("click",function(){
            listOfArticles.removeChild(article);
            deleteProdFromCart(array[i]);
        });
        listOfArticles.appendChild(article);
    };
    divCart.innerHTML = `
    <h4>Artículos</h4><hr>
    `
    divCart.appendChild(listOfArticles);
    container.appendChild(divCart);
    selectDelivery();
};

function addAndShowCartArticles(array){
    if(productsToAdd == null){
        showCartArticles(array);
    } else {
        let currentCartArray = array;
        for(product of productsToAdd){
            currentCartArray.push(product);
        }
        showCartArticles(currentCartArray);
    };
};

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_USER).then(objProdComments => { 
        if (objProdComments.status === "ok") {
            cartArray = objProdComments.data.articles;
            addAndShowCartArticles(cartArray);
        };
    });

    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.clear();
    });
});