const DOLLAR = 40;
let userEmail = localStorage.getItem("userEmail");
let cartArrayJSON = [];
let currentCartArray = [];
let container = document.getElementById("container");
let form = document.createElement("form");
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
        deliveryCost = parseInt(total * 0.15);
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
    divDelivery.classList.add("row");
    divDelivery.setAttribute("id","div-delivery");
    divDelivery.classList.add("mb-4");
    divDelivery.innerHTML = `
    <hr>
    <div class="col-5" id="del-options">
        <h4>Tipo de envío</h4>
        <p class="m-0">
            <input class="form-check-input" type="radio" id="premium" name="delivery" value="premium" data-type="premium" required>
            <label class="form-check-label" for="premium">Premium 2 a 5 días (15%)</label>
        </p>
        <p class="m-0">
            <input class="form-check-input" type="radio" id="express" name="delivery" value="express" data-type="express" required>
            <label class="form-check-label" for="express">Express 5 a 8 días (7%)</label>
        </p>
        <p class="m-0">
            <input class="form-check-input" type="radio" id="standard" name="delivery" value="standard" data-type="standard">
            <label class="form-check-label" for="standard">Standard 12 a 15 días (5%)</label>
        </p>
        <div class="invalid-feedback">Debe seleccionar un tipo de envio</div> 
    </div>
    <div class="col-6 address">
        <h4>Dirección</h4>
        <div class="row mb-2">
            <div class="col input-container">
                <label class="form-label" for="street">Calle</label>
                <input class="form-control" type="text" name="street" id="street" required>
                <div class="invalid-feedback">Ingrese una calle.</div>
            </div>
            <div class="col input-container">
                <label class="form-label" for="number">Número</label>
                <input class="form-control" type="number" name="number" id="number" min="0" required>
                <div class="invalid-feedback">Ingrese un número.</div>
            </div>
            <div class="col input-container">
                <label class="form-label" for="corner">Esquina</label>
                <input class="form-control" type="text" name="corner" id="corner" required>
                <div class="invalid-feedback">Ingrese una esquina.</div>
            </div>
        </div
    </div>
    `
    form.appendChild(divDelivery);
};

function payment(){
    let creditCardOption;
    let bankOption;
    let divPayment = document.createElement("div");
    divPayment.innerHTML = `
    <hr><h4 class="my-4">Forma de pago</h4>
    <div id="payment-method">
        <label for="modal-btn">No se ha seleccionado</label>
        <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal" id="modal-btn">Seleccionar</button>
        <div class="inv-feedback" id="invalid-modal-div"></div>
    </div>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel"><b>Forma de pago</b></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body mx-3">
                    <div>
                        <div class="mb-4">
                            <input class="form-check-input" type="radio" name="payment-method" id="inp-credit-card" required>
                            <label class="form-check-label" for="inp-credit-card">Tarjeta de crédito</label><hr>
                            <div class="row" id="div-credit-card">
                                <div class="col-6">
                                        <label for="inp-credit-num">Número de la tarjeta</label>
                                        <input class="form-control" type="number" name="credit-num" id="inp-credit-num" required>
                                        <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                                        <input class="form-control" type="text" name="credit-exp" id="inp-credit-exp" pattern="[0-12]{2}[0-99]{2}" placeholder="MMAA" required>
                                </div>
                                <div class="col-5">
                                    <label for="inp-credit-cod">Número de seg.</label>
                                    <input class="form-control" type="number" name="credit-cod" id="inp-credit-cod" required>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input class="form-check-input" type="radio" name="payment-method" id="inp-bank" required>
                            <label class="form-check-label" for="inp-bank">Transferencia bancaria</label><hr>
                            <div id="div-bank">
                                <label for="inp-bank-num">Número de cuenta</label>
                                <input class="form-control w-50" type="text" name="bank-num" id="inp-bank-num" required>
                            </div>
                        </div>
                    </div
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
    `
    form.appendChild(divPayment);
    creditCardOption = divPayment.querySelector("#inp-credit-card");
    creditCardOption.addEventListener("change",function(){
        let divCredit = divPayment.querySelector("#div-credit-card");
        let divBank = divPayment.querySelector("#div-bank");
        let div = divPayment.querySelector("#payment-method");
        if(divPayment.querySelector("#inp-credit-card").checked){
            divBank.innerHTML = `
            <label for="inp-bank-num">Número de cuenta</label>
            <input class="form-control w-50" type="number" name="bank-num" id="inp-bank-num" disabled>
            `
            divCredit.innerHTML = `
            <div class="col-6">
                <label for="inp-credit-num">Número de la tarjeta</label>
                <input class="form-control" type="number" name="credit-num" id="inp-credit-num" required>
                <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                <input class="form-control" type="number" name="credit-exp" id="inp-credit-exp" pattern="[0-12]{2}[0-99]{2}" placeholder="MMAA" required>
            </div>
            <div class="col-5">
                <label for="inp-credit-cod">Número de seg.</label>
                <input class="form-control" type="number" name="credit-cod" id="inp-credit-cod" required>
            </div>
            `
            div.innerHTML = `
            <label class="form-check-label" for="modal-btn">Tarjeta de crédito</label>
            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal" id="modal-btn">Seleccionar</button>
            `
        };
    })
    bankOption = divPayment.querySelector("#inp-bank");
    bankOption.addEventListener("change",function(){
        let divCredit = divPayment.querySelector("#div-credit-card");
        let divBank = divPayment.querySelector("#div-bank");
        let div = divPayment.querySelector("#payment-method");
        if(divPayment.querySelector("#inp-bank").checked){
            divCredit.innerHTML = `
            <div class="col-6">
                <label for="inp-credit-num">Número de la tarjeta</label>
                <input class="form-control" type="number" name="credit-num" id="inp-credit-num" disabled>
                <label class="mt-2" for="inp-credit-exp">Vencimiento (MM/AA)</label>
                <input class="form-control" type="number" name="credit-exp" id="inp-credit-exp" pattern="[0-12]{2}[0-99]{2}" placeholder="MMAA" disabled>
            </div>
            <div class="col-5">
                <label for="inp-credit-cod">Número de seg.</label>
                <input class="form-control" type="number" name="credit-cod" id="inp-credit-cod" disabled>
            </div>
            `
            divBank.innerHTML = `
            <label for="inp-bank-num">Número de cuenta</label>
            <input class="form-control w-50" type="number" name="bank-num" id="inp-bank-num" required>
            `
            div.innerHTML = `
            <label class="form-check-label" for="modal-btn" data-option="bank">Transferencia bancaria</label>
            <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal" data-bs-target="#modal">Seleccionar</button>
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
        <hr>
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
    form.appendChild(divCost);
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
    divCart.classList.add("mb-5")
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
    divCart.innerHTML = `<h4>Artículos</h4><hr>`
    divCart.appendChild(listOfArticles);
    form.appendChild(divCart);
    selectDelivery();
    showTotalCost();
    payment();
    divButton.setAttribute("id","div-submit-btn");
    divButton.innerHTML = `<button type="submit" class="btn btn-lg btn-primary w-100" id="btn-cart">Finalizar compra</button>`
    form.appendChild(divButton);
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
    form.setAttribute("action","");
    form.setAttribute("method","get");
    form.setAttribute("novalidate","true")
    form.classList.add("needs-validation");
    container.appendChild(form);

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