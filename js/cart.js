
const CARTINFO = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const container = document.getElementById("container");
const lowSubtotal = document.getElementById("subtotalInf");
const shippingCostText = document.getElementById("shippingCostText");
const totalCostText = document.getElementById("totalCostText");



function showData(array) {
  let htmlContent = "";

  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    htmlContent += `<div class="table-responsive">
                        <table class="table">
                           <tbody> 
                           <tr>
                              <td class="col-md-1"><img src="${item.image}" width="50" height="50" alt=""  class="img-thumbnail" href="product-info.html"></td>
                              <td class="col-md-2">${item.name}</td>
                              <td class="col-md-2">${item.currency}<span class="unitCost">${item.unitCost}</span></td>
                              <td class="col-md-2"> <input type="number" class="amountOfProducts" oninput="calcTopTotal(${i})" name="tentacles" value="" min="1" max="10000000" required/> <p id="inputError" class="invalid-feedback"></p></td>
                              <td class="col-md-2" id="${i}"> <span>${item.currency}</span> <span class="subtotal">${item.unitCost}</span></td>
                            </tr> 
                          </tbody>
                        </table>
                      </div>
 `;
    container.innerHTML = htmlContent;
  }

}

const premiumRadio = document.getElementById("premiumradio");
const expressRadio = document.getElementById("expressradio");
const standardRadio = document.getElementById("standardradio");

let shippingCost = 15;
function showCostEnvio() {
  shippingCost = parseFloat(
    premiumRadio.checked
      ? premiumRadio.value
      : expressRadio.checked
        ? expressRadio.value
        : 5)
}


let amountOfProducts = "";
let DOLLAR_SYMBOL = "USD ";
let totalMultiplied = 0;
let subTotalTop = 0;


function calcTopTotal(indice) {
  shippingCost = "";
  let unitCost = document.getElementsByClassName("unitCost")[indice].innerHTML;
  amountOfProducts = document.getElementsByClassName("amountOfProducts")[indice].value;
  subTotalTop = document.getElementsByClassName("subtotal")[indice];

  if (unitCost == NaN || amountOfProducts == undefined || amountOfProducts == "") {
    unitCost.innerHTML = `<span class="unitCost">0</span>;`;
  } if (unitCost !== NaN) {
    totalMultiplied = parseFloat(amountOfProducts) * parseFloat(unitCost);
    subTotalTop.innerHTML = `<span class="costTotal">${totalMultiplied}</span>`; 
    lowSubtotal.innerHTML = DOLLAR_SYMBOL + `<span class="costTotal2" id="tot${indice}">${totalMultiplied}</span>`; 
  }
}

function calcLowTotal() {
  if (shippingCost !== NaN || shippingCost !== undefined || shippingCost !== "" || shippingCost <= 1 || subTotalTop !== NaN || subTotalTop !== undefined || subTotalTop !== "") {
    total = "USD " + (subTotalTop.innerText * (shippingCost / 100 + 1)).toFixed(1); 
    totalCostText.innerHTML = total;
    shippingCostText.innerHTML = "USD " + (subTotalTop.innerText * (shippingCost / 100)).toFixed(1); 
  }
  else {
    totalCostText.innerHTML = 0;
    shippingCostText.innerHTML = "USD " + 0;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {

  premiumRadio.addEventListener("change", function () {

    shippingCost = 15;
    calcLowTotal();

  });
  expressRadio.addEventListener("change", function () {
    shippingCost = 7;
    calcLowTotal();

  });
  standardRadio.addEventListener("change", function () {

    shippingCost = 5;
    calcLowTotal();
  });
});

document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch(CARTINFO);
  const json = await response.json();

  cartInfo = json;
  showData(cartInfo.articles)
});

const buttonCreditCard = document.getElementById("creditCard");
const numCreditCard = document.getElementById("numCreditCard");
const securityCode = document.getElementById("securityCode");
const expiration = document.getElementById("expiration");
const wireTransfer = document.getElementById("wireTransfer");
const accountNumber = document.getElementById("accountNumber");


(function () {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')
  let feedback_checkbox = document.getElementById("invalid_feedback_checkbox");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {

      if (amountOfProducts < 1) {
        document.getElementById("inputError").innerHTML = `El número ingresado debe ser mayor a 1`;
      }
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
        alert('¡Has comprado con éxito!')
      }

      form.classList.add('was-validated')


    }, false)

  })

})()


document.addEventListener("DOMContentLoaded", function (e) {

  if (!wireTransfer.checked && !buttonCreditCard.checked) {

    numCreditCard.setAttribute("disabled", "")
    securityCode.setAttribute("disabled", "")
    expiration.setAttribute("disabled", "")
    accountNumber.setAttribute("disabled", "");

    buttonCreditCard.addEventListener("change", () => {

        numCreditCard.removeAttribute("disabled")
        securityCode.removeAttribute("disabled")
        expiration.removeAttribute("disabled")
        wireTransfer.removeAttribute("required")
        document.getElementById("selectionPay").innerHTML = `Tarjeta de credito seleccionada`;
        if (accountNumber.getAttribute("disabled") === null) {
          accountNumber.setAttribute("disabled", "");
      }
    })

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

