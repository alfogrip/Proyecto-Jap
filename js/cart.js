const DOLLAR = 40;
let userEmail = localStorage.getItem("userEmail");
let cartArrayJSON = [];
let currentCartArray = [];
let container = document.getElementById("container");
let productsToAdd = JSON.parse(localStorage.getItem("cartArt"));
let CART_USER = `${CART_INFO_URL}25801${EXT_TYPE}`;

function deleteProdFromCart(prod){
    currentCartArray = currentCartArray.filter(elem => elem.id != prod.id)
    productsToAdd = productsToAdd.filter(elem => elem.id != prod.id)
    localStorage.setItem("cartArt",JSON.stringify(productsToAdd))
};

function calculateSubtotal(){
    let total = 0;
    let subtotalList = [];
    let divCart = document.getElementById("div-cart");
    subtotalList = divCart.getElementsByClassName("sub-total");
        for(let i = 0; i < subtotalList.length; i++){
            if(subtotalList[i].dataset.currency === "UYU"){
                total += parseInt(subtotalList[i].dataset.subtotal / DOLLAR);
            } else{
                total += parseInt(subtotalList[i].dataset.subtotal);
            };
        };
    return total;
}

function calculateDeliveryCost(total){
    let deliveryCost = 0;
    let divDelivery = document.getElementById("del-options");
    let deliveryOptions = divDelivery.getElementsByTagName("input");
    if(deliveryOptions[0].checked && total > 0){
        deliveryCost += parseInt(total * 0.15);
    };
    if(deliveryOptions[1].checked && total > 0){
        deliveryCost = parseInt(total * 0.07);
    };
    if(deliveryOptions[2].checked && total > 0){
        deliveryCost = parseInt(total * 0.05);
    };
    return deliveryCost;
};

function selectDelivery(){
    let divDelivery = document.createElement("div");
    let formPayment;
    divDelivery.classList.add("row");
    divDelivery.setAttribute("id","div-delivery");
    divDelivery.innerHTML = `
    <div class="col-5 my-4" id="del-options">
        <form action="" method="get">
            <h4>Tipo de envío</h4>
                <div class="select-delivery">
                    <p class="m-0">
                        <input type="radio" id="premium" name="delivery" value="premium" data-type="premium" checked>
                        <label for="premium">Premium 2 a 5 días (15%)</label>
                    </p>
                </div>
                <div class="select-delivery">
                    <p class="m-0">
                        <input type="radio" id="express" name="delivery" value="express" data-type="express">
                        <label for="express">Express 5 a 8 días (7%)</label>
                    </p>
                </div>
                <div class="select-delivery">
                    <p class="m-0">
                        <input type="radio" id="standard" name="delivery" value="standard" data-type="standard">
                        <label for="standard">Standard 12 a 15 días (5%)</label>
                    </p> 
                </div>
        </form>
    </div>
    <div class="col-6 my-4 address">
        <form action="" method="get">
            <h4>Dirección</h4>
            <div class="row mb-2">
                <div class="col input-container">
                    <input type="text" name="street" id="street" required>
                    <label for="street">Calle</label>
                </div>
                <div class="col input-container">
                    <input type="text" name="number" id="number" required>
                    <label for="number">Número</label>
                </div>
                <div class="col input-container">
                    <input type="text" name="corner" id="corner" required>
                    <label for="corner">Esquina</label>
                </div>
            </div>
        </form>
    </div><hr>
    `
    container.appendChild(divDelivery);
};

function payment(){
    let divPayment = document.createElement("div");
    divPayment.innerHTML = `
    <hr><h4 class="my-4">Forma de pago</h4>
    <div id="payment-method">
        <p>No se ha seleccionado <a href="#" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</a></p>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true"">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel"><b>Forma de pago</b></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body mx-3">
                    <form action="" method="get" id="form-payment">
                        <div>
                            <div class="mb-4">
                                <input type="radio" name="inp-payment-method" id="inp-credit-card">
                                <label for="inp-credit-card">Tarjeta de crédito</label><hr>
                                <div class="row" id="div-credit-card">
                                    <div class="col-6">
                                        <label for="inp-credit-num">Número de la tarjeta</label>
                                        <input class="form-control" type="text" id="inp-credit-num">
                                        <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                                        <input class="form-control" type="text" id="inp-credit-exp">
                                    </div>
                                    <div class="col-5">
                                        <label for="inp-credit-cod">Número de seg.</label>
                                        <input class="form-control" type="text" id="inp-credit-cod">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="radio" name="inp-payment-method" id="inp-bank">
                                <label for="inp-bank">Transferencia bancaria</label><hr>
                                <div id="div-bank">
                                    <label for="inp-bank-num">Número de cuenta</label>
                                    <input class="form-control w-50" type="number" id="inp-bank-num">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
    `
    container.appendChild(divPayment);
    formPayment = document.getElementById("form-payment");
    formPayment.addEventListener("change",function(){
        let divCredit = document.getElementById("div-credit-card");
        let divBank = document.getElementById("div-bank");
        let div = document.getElementById("payment-method");
        if(document.getElementById("inp-credit-card").checked){
            divBank.innerHTML = `
            <label for="inp-bank-num">Número de cuenta</label>
            <input class="form-control w-50" type="text" id="inp-bank-num" disabled>
            `
            divCredit.innerHTML = `
            <div class="col-6">
                <label for="inp-credit-num">Número de la tarjeta</label>
                <input class="form-control" type="text" id="inp-credit-num">
                <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                <input class="form-control" type="text" id="inp-credit-exp">
            </div>
            <div class="col-5">
                <label for="inp-credit-cod">Número de seg.</label>
                <input class="form-control" type="text" id="inp-credit-cod">
            </div>
            `
            div.innerHTML = `
            <p>Tarjeta de crédito <a href="#" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</a></p>
            `
        };
        if(document.getElementById("inp-bank").checked){
            divCredit.innerHTML = `
            <div class="col-6">
                <label for="inp-credit-num">Número de la tarjeta</label>
                <input class="form-control" type="text" id="inp-credit-num" disabled>
                <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                <input class="form-control" type="text" id="inp-credit-exp" disabled>
            </div>
            <div class="col-5">
                <label for="inp-credit-cod">Número de seg.</label>
                <input class="form-control" type="text" id="inp-credit-cod" disabled>
            </div>
            `
            divBank.innerHTML = `
            <label for="inp-bank-num">Número de cuenta</label>
            <input class="form-control w-50" type="text" id="inp-bank-num">
            `
            div.innerHTML = `
            <p>Transferencia bancaria <a href="#" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</a></p>
            `
        }
    })
};

function showTotalCost(){
    let totalPrice = calculateSubtotal();
    let deliveryCost = calculateDeliveryCost(totalPrice);
    let divCart = document.getElementById("div-cart");
    let divDelivery = document.getElementById("del-options");
    let divCost = document.createElement("div");
    divCost.classList.add("mb-5");
    divCost.innerHTML = `
        <h4 class="my-3">Costos</h4>
        <ul class="list-group">
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <p class="m-0">Subtotal</p>
                        <small>Costo unitario del producto por cantidad</small>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center" id="products-total">
                        <p class="m-0">USD${totalPrice}</p>    
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <p class="m-0">Costo del envío</p>
                        <small>Según el tipo de envío</small>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center" id="delivery-cost">
                        <p class="m-0">USD${deliveryCost}</p>    
                    </div>
                 </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <div class="col">
                        <p class="m-0">Total($)</p>
                    </div>
                    <div class="col d-flex justify-content-end align-items-center" id="cart-total">
                        <p class="m-0">USD${totalPrice + deliveryCost}</p>    
                    </div>
                 </div>
            </li>
        </ul>
        `
    container.appendChild(divCost);
    divCart.addEventListener("click",function(){
        totalPrice = calculateSubtotal();
        deliveryCost = calculateDeliveryCost(totalPrice);
        document.getElementById("products-total").innerHTML = `
        <p class="m-0">USD${totalPrice}</p>
        `
        document.getElementById("delivery-cost").innerHTML = `
        <p class="m-0">USD${deliveryCost}</p>
        `
        document.getElementById("cart-total").innerHTML = `
        <p class="m-0">USD${totalPrice + deliveryCost}</p>
        `

    });
    divDelivery.addEventListener("change",function(){
        deliveryCost = calculateDeliveryCost(totalPrice);
        document.getElementById("delivery-cost").innerHTML = `
        <p class="m-0">USD${deliveryCost}</p>
        `
        document.getElementById("cart-total").innerHTML = `
        <p class="m-0">USD${totalPrice + deliveryCost}</p>
        `
    });
};

function showCartArticles(array){
    let divCart = document.createElement("div");
    let listOfArticles = document.createElement("ul");
    let listHeader = document.createElement("li");
    let divButton = document.createElement("div");
    divCart.setAttribute("id","div-cart");
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
            <div class="col d-flex justify-content-center sub-total" data-currency="${array[i].currency}" data-subtotal="${array[i].unitCost*array[i].count}">
                <p class="m-0">${array[i].currency}${array[i].unitCost * array[i].count}</p>
            </div>
            <div class="col-1">
                <button class="btn-check" id="btn-delete${i}"></button>
                <label class="btn btn-light" for="btn-delete${i}"><i class="fa fa-trash-o"></i></label>
            </div>
        </div>
        `
        listOfArticles.appendChild(article);
        article.addEventListener("input",function(){
            let quantity = parseInt(article.querySelector("input").value);
            // if(quantity >= 1){
                let productTotal = quantity * array[i].unitCost;
                let div = article.querySelector("div.sub-total");
                div.setAttribute("data-subtotal",productTotal);
                div.innerHTML = `
                <p class="m-0">${array[i].currency}${productTotal}</p>
                `
            // } else {
            //     alert("La cantidad ingresada de producto debe ser mayor que 0")
            // };
        });
        article.querySelector("button").addEventListener("click",function(){
            deleteProdFromCart(array[i]);
            listOfArticles.removeChild(article);
            if(currentCartArray.length == 0){
                listOfArticles.removeChild(listHeader);
            };
        });
    };
    divCart.innerHTML = `
    <h4>Artículos</h4><hr>
    `
    divCart.appendChild(listOfArticles);
    container.appendChild(divCart);
    selectDelivery();
    showTotalCost();
    payment();
    divButton.innerHTML = `<button type="button" class="btn btn-lg btn-primary w-100" id="btn-cart">Finalizar compra</button>`
    container.appendChild(divButton);
};

function addAndShowCartArticles(array){
    if(productsToAdd == null){
        showCartArticles(array);
    } else {
        currentCartArray = array;
        for(product of productsToAdd){
            currentCartArray.push(product);
        }
        showCartArticles(currentCartArray);
    };
};

document.addEventListener("DOMContentLoaded", function(){

    getJSONData(CART_USER).then(objCartArticles => { 
        if (objCartArticles.status === "ok") {
            cartArrayJSON = objCartArticles.data.articles;
            addAndShowCartArticles(cartArrayJSON);
        };
    });

    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.clear();
    });
});