const ORDER_DESC_BY_PRICE = "DESC";
const ORDER_ASC_BY_PRICE = "ASC";
const ORDER_DESC_BY_PROD_COUNT = "Rel";
let currentSortCriteria = undefined;
let currentProductsArray = [];
let productsArray = [];
let userEmail = localStorage.getItem("userEmail");
let catID = localStorage.getItem("catID");
let PRODUCTS_ID_URL = `${PRODUCTS_URL}${catID}${EXT_TYPE}`;

// Agrega el email al encabezado.
document.getElementById("profile").innerHTML = `${userEmail}`;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a,b){
            if (a.cost > b.cost){return -1;}
            if (a.cost < b.cost){return 1;}
            return 0;
        });
    }
    else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a,b){
            if (a.cost < b.cost){return -1;}
            if (a.cost > b.cost){return 1;}
            return 0;
        });
    }
    else if(criteria === ORDER_DESC_BY_PROD_COUNT){
        result = array.sort(function(a,b){
            if (a.soldCount > b.soldCount){return -1;}
            if (a.soldCount < b.soldCount){return 1;}
            return 0;
        });
    }
    return result;
};

// Función que despliega una lista con los productos correspondientes a su categoría.
function showProducts(array){
    let htmlContent = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        htmlContent += 
            `<div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h4>${product.name} - ${product.currency} ${product.cost}</h4> 
                                <p>${product.description}</p> 
                            </div>
                            <small class="text-muted">${product.soldCount} vendidos</small> 
                        </div>
                    </div>
                </div>  
            </div>`
    }
    document.getElementById("product-list").innerHTML = htmlContent;
 };

 function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;
    if(productsArray != undefined){
        currentProductsArray = productsArray;
    };
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProducts(currentProductsArray);
};

document.addEventListener("DOMContentLoaded", function(){
    
    getJSONData(PRODUCTS_ID_URL).then(objProduct => {
        if (objProduct.status === "ok") {
            productsArray = objProduct.data.products;
            document.getElementById("product-title").innerHTML = `<h2>Productos</h2>
                <p>Verás aquí todos los productos de la categoría ${objProduct.data.catName}</p>`;
            showProducts(productsArray);
        }
    });

    document.getElementById("sortDescByPrice").addEventListener("click",function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE, productsArray);
        
    });
    document.getElementById("sortAscByPrice").addEventListener("click",function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE, productsArray);
        
    });
    document.getElementById("sortDescByCount").addEventListener("click",function(){
        sortAndShowProducts(ORDER_DESC_BY_PROD_COUNT, productsArray);
        
    });

});
