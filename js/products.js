globalProducts = undefined;
const PRODUCTOS = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let minCost = undefined;
let maxCost = undefined;
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";


//cambiar por prod
function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}

const showData = (array) => {
  const container = document.getElementById('prod-list-container');
  container.innerHTML = "";
  for (let products of array) {
    container.innerHTML += `
    <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active">
    <div class="row">
      <div class="col-3">
        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
      </div>
      <div class="col">
        <div class="d-flex w-100 justify-content-between">
          <h4 class="mb-1">${products.name}</h4>
          <div class="productoFooter d-flex justify-content-between">
            <div class="precio">
              <span class="moneda">${products.currency}</span>
              <span class="precio">${products.cost}</span><br>
              <small class="text-muted">${products.soldCount} artículos</small>
            </div>
          </div>
        </div>
        <small class="text-muted">${products.description} artículos</small>
      </div>

    </div>
  </div> `;
  }
};


document.addEventListener("DOMContentLoaded", async () => {
  const txtMinCost = document.getElementById("rangeFilterCostMin");
  const txtMaxCost = document.getElementById("rangeFilterCostMax");

  const response = await fetch(PRODUCTOS);
  const json = await response.json();

  globalProducts = json;
  showData(globalProducts.products);

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    txtMinCost.value = "";
    txtMaxCost.value = "";

    minCost = undefined;
    maxCost = undefined;

    showData(globalProducts.products);
  });

  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    const minCost = (txtMinCost.value);
    const maxCost = (txtMaxCost.value);

    if (minCost && !maxCost) {
      const filteredArray = globalProducts.products.filter((value) => value.cost >= minCost);
      showData(filteredArray)
      console.log(filteredArray)

    } else if (!minCost && maxCost) {
      const filteredArray = globalProducts.products.filter((value) => value.cost <= maxCost);
      showData(filteredArray);
      console.log(filteredArray)

    } else if (minCost && maxCost) {
      const filteredArray = globalProducts.products.filter(
        (value) => value.cost >= minCost && value.cost <= maxCost);
      showData(filteredArray);
    }
  });

  document.getElementById("sortAZ").addEventListener("click", () => {
    globalProducts.products.sort((a, b) => {
      if (a.cost > b.cost) return 1;
      if (a.cost < b.cost) return -1;
      return 0;
    });
    showData(globalProducts.products);
  });

  document.getElementById("sortZA").addEventListener("click", () => {
    globalProducts.products.sort((a, b) => {
      if (a.cost > b.cost) return -1;
      if (a.cost < b.cost) return 1;
      return 0;
    });
    showData(globalProducts.products);
  });
  document.getElementById("sortByCount").addEventListener("click", () => {
    globalProducts.products.sort((a, b) => {
      if (a.soldCount > b.soldCount) return -1;
      if (a.soldCount < b.soldCount) return 1;
      return 0;
    });
    showData(globalProducts.products); // falta hacer por cantidad de articulos vendidos y modificar el html para que aparezca
  });
});

//global products esta arriba seria: globalProducts
let titleFilter = undefined;
let name = undefined;

function prodSearch(){
  const container = document.getElementById('prod-list-container');
  container.innerHTML += ``
let search = document.getElementById("inputProdSearch").value;
titleFilter = globalProducts.products.filter(({name, description})=>{
return name.toLowerCase().indexOf(search.toLowerCase()) > -1 || description.toLowerCase().indexOf(search.toLowerCase()) > -1;
})
showData(titleFilter)
}

