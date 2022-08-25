let productsArray = [];
let userEmail = localStorage.getItem("userEmail");

// Agrega el email al encabezado
document.getElementById("profile").innerHTML = `${userEmail}`;

function showProducts(array){
    let catCars = "";
    for(let i = 0; i < array.length; i++){
        let car = array[i];
        catCars += 
            `<div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${car.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${car.name} - ${car.currency} ${car.cost}</h4> 
                                <p>${car.description}</p> 
                            </div>
                            <small class="text-muted">${car.soldCount} vendidos</small> 
                        </div>
                    </div>
                </div>  
            </div>`
    }
    document.getElementById("product-list").innerHTML = catCars;
 }

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_CAR_URL).then(objProduct => {
        if (objProduct.status === "ok") {
            productsArray = objProduct.data.products;
            document.getElementById("product-title").innerHTML = `<h2>Productos</h2>
            <p>Verás aquí todos los productos de la categoría ${objProduct.data.catName}</p>`;
            showProducts(productsArray);
        }
    });
});