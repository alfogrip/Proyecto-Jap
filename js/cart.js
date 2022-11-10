const DOLLAR = 40;
const container = document.getElementById("container");
const form = document.getElementById("cart-form");
const divCart = document.getElementById("div-cart");
const divDeliveryOptions = document.getElementById("del-options");
const divPayment = document.getElementById("div-payment");
let userEmail = JSON.parse(localStorage.getItem("userPersonalInfo")).email;
let cartArrayJSON = [];
let currentCartArray = [];
let productsToAdd = JSON.parse(localStorage.getItem("cartArt"));
let CART_USER = `${CART_INFO_URL}25801${EXT_TYPE}`;

function validation(){
    let form = document.querySelector(".needs-validation");
    let creditCardOption = document.getElementById("inp-credit-card");
    let bankOption = document.getElementById("inp-bank");
    document.addEventListener("submit",function(event){
        event.preventDefault()
        event.stopPropagation()
            if(!form.checkValidity()){
                if(!creditCardOption.checked && !bankOption.checked){
                    document.getElementById("invalid-modal-div").innerHTML = `Debe elegir un método de pago.`
                } else{
                    document.getElementById("invalid-modal-div").innerHTML = ``
                }
            } else{
                document.getElementById("div-submit-btn").innerHTML = `
                <button type="submit" class="btn btn-lg btn-primary w-100" id="btn-cart">Finalizar compra</button>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    ¡Has comprado con éxito!
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                `
            }form.classList.add('was-validated');
        }) 
    };

function deleteProdFromCart(prod){
    currentCartArray = currentCartArray.filter(elem => elem.id != prod.id)
    productsToAdd = productsToAdd.filter(elem => elem.id != prod.id)
    localStorage.setItem("cartArt",JSON.stringify(productsToAdd))
};

function calculateSubtotal(){
    let total = 0;
    let subtotalList = [];
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
    let deliveryOptions = divDeliveryOptions.getElementsByTagName("input");
    if(deliveryOptions[0].checked && total > 0){
        deliveryCost = Math.round(total * 0.15);
    };
    if(deliveryOptions[1].checked && total > 0){
        deliveryCost = Math.round(total * 0.07);
    };
    if(deliveryOptions[2].checked && total > 0){
        deliveryCost = Math.round(total * 0.05);
    };
    return deliveryCost;
};

function showTotalCost(){
    let totalPrice = calculateSubtotal();
    let deliveryCost = calculateDeliveryCost(totalPrice);
    document.getElementById("products-total").innerHTML = `
    <p class="m-0">USD${totalPrice}</p>
    `
    document.getElementById("delivery-cost").innerHTML = `
    <p class="m-0">USD${deliveryCost}</p>
    `
    document.getElementById("cart-total").innerHTML = `
    <p class="m-0">USD${totalPrice + deliveryCost}</p>
    `
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
    divDeliveryOptions.addEventListener("change",function(){
        deliveryCost = calculateDeliveryCost(totalPrice);
        document.getElementById("delivery-cost").innerHTML = `
        <p class="m-0">USD${deliveryCost}</p>
        `
        document.getElementById("cart-total").innerHTML = `
        <p class="m-0">USD${totalPrice + deliveryCost}</p>
        `
    });
};

function payment(){
    let creditRadio = divPayment.querySelector("#inp-credit-card");
    let bankRadio = divPayment.querySelector("#inp-bank");
    let divCredit = divPayment.querySelector("#div-credit-card");
    let divBank = divPayment.querySelector("#div-bank");
    let creditInputs = divCredit.querySelectorAll("input");
    let bankInput = divBank.querySelector("input");
    let div = divPayment.querySelector("#payment-method");
    creditRadio.addEventListener("change",function(){
        if(creditRadio.checked){
            bankInput.setAttribute("disabled","true");
            creditInputs.forEach(element => {
                element.removeAttribute("disabled");
            });
            div.innerHTML = `
            <label class="form-check-label" for="modal-btn" data-option="bank">Tarjeta de crédito</label>
            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</button>
            `
        };
    });
    bankRadio.addEventListener("change",function(){
        if(bankRadio.checked){
            bankInput.removeAttribute("disabled");
            creditInputs.forEach(element => {
                element.setAttribute("disabled","true");
            });
            div.innerHTML = `
            <label class="form-check-label" for="modal-btn" data-option="bank">Transferencia bancaria</label>
            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</button>
            `
        }
    })
};

function showCartArticles(array){
    let listOfArticles = document.getElementById("cart-list");
    let listHeader = document.getElementById("cart-list-header");
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
                <div class="col-5">
                    <input class="form-control" type="number" value="${array[i].count}" min="1" required>
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
            let quantity = parseInt(article.querySelector("input").value)
            let productTotal = quantity * array[i].unitCost;
            let div = article.querySelector("div.sub-total");
            div.setAttribute("data-subtotal",productTotal);
            div.innerHTML = `<p class="m-0">${array[i].currency}${productTotal}</p>`
        });
        article.querySelector("button").addEventListener("click",function(){
            deleteProdFromCart(array[i]);
            listOfArticles.removeChild(article);
            if(currentCartArray.length == 0){
                listOfArticles.removeChild(listHeader);
            };
        });
    };
    divCart.appendChild(listOfArticles);
    showTotalCost();
    payment();
    validation();
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