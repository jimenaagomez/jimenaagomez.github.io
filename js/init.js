const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";



let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

//funcion generica le pasa no más el parametro URL 
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function deleteItem(){
  localStorage.removeItem("text")
  window.location = "index.html";
}


const usuario1 = document.getElementById("usuario1")
const email = document.getElementById("email");
const button = document.getElementById("button");

document.addEventListener("DOMContentLoaded", function(){
(localStorage.getItem("text")); 
 usuario1.innerHTML = (localStorage.getItem("text"));
});
 /*(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
  
  
    const forms = document.querySelectorAll('.needs-validation')
   
    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener('submit', function (event) {
  
        // validación manual de que el input no sea menor que 1
  
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
  
        }
  
        form.classList.add('was-validated')
  
  
      }, false)
  
    })
  
  })()*/

