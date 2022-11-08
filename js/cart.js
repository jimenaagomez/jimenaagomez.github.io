
const CARTINFO = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const container = document.getElementById("container");

const subTotalInf = document.getElementById("subtotalInf");
const costoDeEnvioText = document.getElementById("costoDeEnvioText");
const totalCostText = document.getElementById("totalCostText");



function showData5(array) {
  let htmlContenido = "";

  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    htmlContenido += `<div class="table-responsive">
    <table class="table">
    <tbody> <tr>
     <td class="col-md-1"><img src="${item.image}" width="50" height="50" alt=""  class="img-thumbnail" href="product-info.html"></td>
     <td class="col-md-2">${item.name}</td>
     <td class="col-md-2">${item.currency}<span class="costUnit">${item.unitCost}</span></td>
     <td class="col-md-2"> <input type="number" class="cant" oninput="multiplicar(${i})" name="tentacles" value="" min="1" max="10000000" required/> <p id="inputError" class="invalid-feedback"></p></td>
     <td class="col-md-2" id="${i}"> <span>${item.currency}</span> <span class="subtotal">${item.unitCost}</span></td>
     </tr> 
     </tbody>
     </table>
     </div>
 `;
    container.innerHTML = htmlContenido;
  }

}

const goldRadio = document.getElementById("goldradio");
const premiumRadio = document.getElementById("premiumradio");
const standardRadio = document.getElementById("standardradio");

let percCost = 15;
function showCostEnvio() {
  percCost = parseFloat(
    goldRadio.checked
      ? goldRadio.value
      : premiumRadio.checked
        ? premiumRadio.value
        : 5)
}


//variables para ser utilizadas en otra function
let cant = "";
let DOLLAR_SYMBOL = "USD ";
let totalMultiplicado = 0;
let subTotalSup = 0;


//sup
function multiplicar(indice) {
  percCost = "";
  let unitCost = document.getElementsByClassName("costUnit")[indice].innerHTML;
  cant = document.getElementsByClassName("cant")[indice].value;
  subTotalSup = document.getElementsByClassName("subtotal")[indice];

  if (unitCost == NaN || cant == undefined || cant == "") {
    unitCost.innerHTML = `<span class="costUnit">0</span>;`;
  } if (unitCost !== NaN) {
    totalMultiplicado = parseFloat(cant) * parseFloat(unitCost);
    subTotalSup.innerHTML = `<span class="costTotal">${totalMultiplicado}</span>`; //subtotalsuperior
    subTotalInf.innerHTML = DOLLAR_SYMBOL + `<span class="costTotal2" id="tot${indice}">${totalMultiplicado}</span>`; //subtotal inferior
  }
}

//function para calcular los totales y subtotales de la parte inferior
function showInf() {
  if (percCost !== NaN || percCost !== undefined || percCost !== "" || percCost <= 1 || subTotalSup !== NaN || subTotalSup !== undefined || subTotalSup !== "") {
    console.log(typeof subTotalSup)
    total5 = "USD " + (subTotalSup.innerText * (percCost / 100 + 1)).toFixed(1); //calculo del total porque esta el + 1
    totalCostText.innerHTML = total5;
    costoDeEnvioText.innerHTML = "USD " + (subTotalSup.innerText * (percCost / 100)).toFixed(1); //calculo del envio
  }
  else {
    totalCostText.innerHTML = 0;
    costoDeEnvioText.innerHTML = "USD " + 0;
  }
}

//function basada en sell.js
document.addEventListener("DOMContentLoaded", function (e) {

  goldRadio.addEventListener("change", function () {

    percCost = 15;
    showInf();

  });
  premiumRadio.addEventListener("change", function () {
    percCost = 7;
    showInf();

  });
  standardRadio.addEventListener("change", function () {

    percCost = 5;
    showInf();
  });
});

document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch(CARTINFO);
  const json = await response.json();

  cartInfo = json;
  showData5(cartInfo.articles)
});

const buttonCreditCard = document.getElementById("creditCard");
const numCreditCard = document.getElementById("numCreditCard");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const wireTransfer = document.getElementById("wireTransfer");
const accountNumber = document.getElementById("accountNumber");

//codigo extraido de boostrap
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to


  const forms = document.querySelectorAll('.needs-validation')
  let feedback_checkbox = document.getElementById("invalid_feedback_checkbox");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {

      // validación manual de que el input no sea menor que 1
      if (cant < 1) {
        document.getElementById("inputError").innerHTML = `El número ingresado debe ser mayor a 1`;
      }
      // validación manual de que alguna de las opciones tiene que estar seleccionada como metodo de pago
      if (!buttonCreditCard.checked && !wireTransfer.checked) {
        feedback_checkbox.innerHTML = `<p style="color:#dc3545">Debe seleccionar una forma de pago<p>`;
        feedback_checkbox.style.color = "";
        event.preventDefault()
        event.stopPropagation()
      }

      if (buttonCreditCard.checked || wireTransfer.checked) {
        feedback_checkbox.innerHTML = "";
      }

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

      }
      if (form.checkValidity()) {
        /*Swal.fire({
          title: 'Bienvenido',
          backdrop: true,
          timer: 10000
        })*/
        alert('¡Has comprado con éxito!')
      }

      form.classList.add('was-validated')


    }, false)

  })

})()


document.addEventListener("DOMContentLoaded", function (e) {
  //si ninguna de los botones esta chequeado, queda todo en disabled, usando el metodo setattribute, proporcionandole el valor verdadero al atributo disabled
  if (!wireTransfer.checked && !buttonCreditCard.checked) {
    numCreditCard.setAttribute("disabled", "")
    securityCode.setAttribute("disabled", "")
    expiration.setAttribute("disabled", "")
    accountNumber.setAttribute("disabled", "");

    buttonCreditCard.addEventListener("change", () => {
      //si la cuenta bancaria no esta chequeado y  tarjeta de credito si, entonces removemosel valor disabled de los campos

        numCreditCard.removeAttribute("disabled")
        securityCode.removeAttribute("disabled")
        expiration.removeAttribute("disabled")
        wireTransfer.removeAttribute("required")
        // y mandamos al inner que fue seleccionada la tarjeta de credit
        document.getElementById("selectionPay").innerHTML = `Tarjeta de credito seleccionada`;
        if (accountNumber.getAttribute("disabled") === null) {
          accountNumber.setAttribute("disabled", "");
      }
    })
    // lo mismo pero alreves
    wireTransfer.addEventListener("change", () => {
        accountNumber.removeAttribute("disabled")
        document.getElementById("selectionPay").innerHTML = `Transferencia bancaria seleccionada`; //

        if (numCreditCard.getAttribute("disabled") === null) {
          numCreditCard.setAttribute("disabled", "")
          securityCode.setAttribute("disabled", "")
          expiration.setAttribute("disabled", "")
        }
        if (buttonCreditCard.getAttribute("required") !== null) {
          buttonCreditCard.removeAttribute("required");
      }
    })
  }
})

