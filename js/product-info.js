const PRODUCTOSINFO = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const COMMENTSINFO = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const container = document.getElementById("container");
const tbody = document.getElementById("container2");
const container3 = document.getElementById("container4");
const container5 = document.getElementById("relatedProducts");
const carrousel = document.getElementById("carrousel");
let products = [];
let comments = [];

htmlContent = "";

function showData1(item) {
  container.innerHTML += `
      
      <div class="container">
      <div class="row">

      <div class="col-5">
      <div id="carouselExampleCaptions" class="carousel slide row " data-bs-ride="false">
        <div class="carousel-indicators col col-8">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${productsInfo.images[0]}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>First slide label</h5>
              <p>Some representative placeholder content for the first slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="${productsInfo.images[1]}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src="${productsInfo.images[2]}" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>  

      <div class="col-6">
        
        <div class="">
          <h3>${item.name}</h3>
          <div>
            <h6>Precio</h6>
            <p>${item.currency} ${item.cost}</p>
          </div>
          <div>
            <h6>Descripción</h6>
            <p>${item.description}</p>
          </div>
          <div>
            <h6>Categoria</h6>
            <p>${item.category}</p>
          </div>
          <div>
            <h6>Cantidad de vendidos</h6>
            <p>${item.soldCount}</p>
          </div>
        </div>
      </div>
      
    </div>
    </div>`
}


/*


  htmlContent += `
   <br><br> 
   <h4>Comentarios</h4> 
   <br>`
  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
    htmlContent +=
      `<p>Usuario: ${comments.user} Fecha: ${comments.dateTime}</p>
    <p>${comments.description}</p> `

    for (let i = 0; i < 5; i++) {
      if (i < comments.score) {
        htmlContent += `<span class="fa fa-star checked"></span>`;
      } else {
        htmlContent += `<span class="fa fa-star" style="color: black"></span>`
      }
      tbody.innerHTML = htmlContent;
    }
  }<h1 class="text-center card-title ">Comentarios</h1>
}
*/
function showComments(array) {
  htmlContent += `<h1 class="text-center card-title ">Comentarios</h1>`
  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
  htmlContent += `<div class="row row-cols-1 justify-content-center">
      
                    <div class="col-8">
                      
                      <div class="card">
                        <div class="card-body">
                          <div class="row justify-content-lg-start">
                            <div class="col-2">
                              <h6 class="card-title">Usuario: ${comments.user}</h6>
                            </div>
                            <div class="col-2">
                              <p class="card-text">Fecha:${comments.dateTime}</p>
                            </div>
                            <div class="col-8">`
                            for (let i = 0; i < 5; i++) {
                              if (i < comments.score) {
                                htmlContent += `<span class="fa fa-star checked"></span>`
                              } else {
                                htmlContent += `<span class="fa fa-star" style="color: black"></span>`
                              }}
                              htmlContent += `</div>
                          </div>
                          <p class="card-text">Esta es una tarjeta más larga con texto de apoyo a continuación como introducción
                            natural a contenido adicional. Este contenido es un poco más largo.</p>
                        </div>
                      </div>
                    </div>
                  </div>` }
                  tbody.innerHTML = htmlContent;
  

}


function showRelatedProducts(array) {
  for (let i = 0; i < array.length; i++) {
    let related = array[i];
    container5.innerHTML +=
      ` <div class="col-md-4" onClick="setProdInfoID(${related.id})">
            <div class="card mb-4 shadow-sm custom-card cursor-active" >
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

/*
function showComments(array) {

  htmlContent += `
   <br><br> 
   <h4>Comentarios</h4> 
   <br>`
  for (let i = 0; i < array.length; i++) {
    let comments = array[i];
    htmlContent +=
      `<p>Usuario: ${comments.user} Fecha: ${comments.dateTime}</p>
    <p>${comments.description}</p> `

    for (let i = 0; i < 5; i++) {
      if (i < comments.score) {
        htmlContent += `<span class="fa fa-star checked"></span>`;
      } else {
        htmlContent += `<span class="fa fa-star" style="color: black"></span>`
      }
      tbody.innerHTML = htmlContent;
    }
  }
}




<div id="carouselExampleCaptions" class="carousel slide row " data-bs-ride="false">
    <div class="carousel-indicators col col-8">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="${productsInfo.images[0]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="${productsInfo.images[1]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="${productsInfo.images[2]}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>


*/ 