const PRODUCTOSINFO = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const COMMENTSINFO = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const container = document.getElementById("container");
const containerComments = document.getElementById("containerComments");
const relatedComments = document.getElementById("relatedComments");
let products = [];
let comments = [];

htmlContent = "";

function showData1(item) {
  container.innerHTML += `
      
  <div class="row">

    <div class="col-8">

      <div id="carouselExampleCaptions" class="carousel slide row  " data-bs-ride="false">
        <div class="carousel-indicators col col-8 ">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="${productsInfo.images[0]}"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img
              src="${productsInfo.images[1]}"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img
              src="${productsInfo.images[2]}"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img
              src="${productsInfo.images[3]}"
              class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

    </div>


    <div class="col 5">

      <div class="row">
        <p class="fs-1 fw-bold">${item.name} </p>
      </div>


      <div>
        <p class="fs-3">${item.currency} ${item.cost}</p>

      </div>
      <hr>
      <div>

        <p class="fw-bolder">Descripcion breve : </p>
        <p> ${item.description}</p>
      </div>

      <div>
        <p class="fw-bolder"> Categoria:</p>
        <p>${item.category}</p>
        <p class="fw-bolder"> Cantidad de vendidos:</p>
        <p>${item.soldCount}</p>

      </div>
      <hr>

      <div class="d-grid gap-2 col-6 mx-auto align-content-start">
        <button class="btn btn-outline-primary" type="button">Agregar a la cesta</button>
      </div>

    </div>

  </div>

</div>
<br> <br><br>
<hr>
<br>`;
}

function showComments(array) {
  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
    htmlContent += `
                      <div class="col-12">
                      <div class="card mb-2">
                      <div class="card-body mb-2">
                        <div class="row justify-content-lg-start mb-3">
                          <div class="col-2">
                            <h6 class="card-title">Usuario: ${comments.user}</h6>
                          </div>
                          <div class="col-3">
                            <p class="card-text">Fecha:${comments.dateTime}</p>
                          </div>
                          <div class="col-7">`
                          for (let i = 0; i < 5; i++) {
                            if (i < comments.score) {
                              htmlContent += `<span class="fa fa-star checked"></span>`
                            } else {
                              htmlContent += `<span class="fa fa-star" style="color: black"></span>`
                            }
                          }
                          htmlContent += `</div>
                        </div>
                        <p class="card-text">${comments.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                  ` }
  containerComments.innerHTML = htmlContent;


}

function showRelatedProducts(array) {
  for (let i = 0; i < array.length; i++) {
    let related = array[i];
    relatedComments.innerHTML +=
      ` <div class="col-md-3" onClick="setProdInfoID(${related.id})">
            <div class="card mb-3 shadow-sm custom-card cursor-active" >
              <img class="bd-placeholder-img card-img-top" src="${related.image}"
                alt="">
              <h3 class="m-3">${related.name}</h3>
              <div class="card-body">
                <p class="card-text">Click para ver más de ${related.name}.</p>
              </div>
            </div>
          </div>`
  }

}



function setProdInfoID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html"
}


document.addEventListener("DOMContentLoaded", async () => {

  const response = await fetch(PRODUCTOSINFO);
  const json = await response.json();

  productsInfo = json;
  showData1(productsInfo)
  showRelatedProducts(productsInfo.relatedProducts)

  if (productsInfo !== "") {
    const response = await fetch(COMMENTSINFO);
    const json = await response.json();
    productsComments = json;
    showComments(productsComments)
  }
});

