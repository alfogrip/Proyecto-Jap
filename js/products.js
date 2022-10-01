const ORDER_DESC_BY_PRICE = "Desc";  
const ORDER_ASC_BY_PRICE = "Asc";
const ORDER_DESC_BY_PROD_COUNT = "Count";
let currentSortCriteria = undefined; 
let currentProductsArray = [];  
let productsArray = [];
let minPrice = undefined; 
let maxPrice = undefined;
let userEmail = localStorage.getItem("userEmail");
let catID = localStorage.getItem("catID");
let PRODUCTS_ID_URL = `${PRODUCTS_URL}${catID}${EXT_TYPE}`; 

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

function filterProductsByPrice(array){
    let result = array.filter( elem => {
        if(minPrice == undefined){
            return elem.cost <= maxPrice;
        } else if (maxPrice == undefined){
            return elem.cost >= minPrice;
        } else {
            return elem.cost >= minPrice && elem.cost <= maxPrice;
        };
    });
    return result;
};

function searchProducts(array,key){
    let result = array.filter( elem => {
        let title = elem.name.toLowerCase();
        let description = elem.description.toLowerCase();
        return title.includes(key) || description.includes(key);
    });
    return result; 
};

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html" 
};


function showProducts(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];
        htmlContentToAppend += `
        <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">  
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
        </div>
        `
    }
    document.getElementById("product-list").innerHTML = htmlContentToAppend;
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

    document.getElementById("profile").innerHTML = `${userEmail}`;

    document.getElementById("logout").addEventListener("click", function(){
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPass");
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

    document.getElementById("filterButton").addEventListener("click",function(){
        let inputMinCost = document.getElementById("filterMinPrice").value;
        let inputMaxCost = document.getElementById("filterMaxPrice").value;

        if(inputMinCost != "" && inputMinCost != undefined ){
            minPrice = inputMinCost;
        };
        if(inputMaxCost != "" && inputMaxCost != undefined ){
            maxPrice = inputMaxCost;
        };

        currentProductsArray = filterProductsByPrice(productsArray);
        showProducts(currentProductsArray);
    });

    document.getElementById("clearButton").addEventListener("click",function(){
        document.getElementById("filterMinPrice").value = "";
        document.getElementById("filterMaxPrice").value = "";
        minPrice = undefined;
        maxPrice = undefined;
        showProducts(productsArray);
    });

    document.getElementById("searchFilter").addEventListener("keyup",function(){
        let search = document.getElementById("searchFilter").value
        currentProductsArray = searchProducts(productsArray,search);
        showProducts(currentProductsArray);

    })

});
