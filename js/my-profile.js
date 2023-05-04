(function () {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {


      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

      }

      if (form.checkValidity()) {
        
        alert('¡Perfil modificado con éxito!')
      }

      form.classList.add('was-validated')


    }, false)

  })

})()

let firstName = undefined;
let lastName = undefined;
let emailProfile = undefined;
let getEmailProfile = undefined;
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailProfileInput = document.getElementById("emailProfile");

  
document.getElementById("buttonProfile").addEventListener("click", (e) => {
  e.preventDefault;
  //valor ingresado de los input al momento, de dar click en enviar
  firstName = firstNameInput.value;
  lastName = lastNameInput.value;
  emailProfile = emailProfileInput.value;
  getEmailProfile = localStorage.getItem("user"); 

  //las guardo en un array
  profileInfo = {
    firstName: firstName,
    lastName: lastName
  }

  if (profileInfo) { //si los campos de nombre y apellido estan con valores, se remueve el anterior profileInfo, y se mandan los nuevos datos
    localStorage.removeItem("ProfileInfo");
    localStorage.setItem("ProfileInfo", JSON.stringify(profileInfo))
  } else {
      if (firstName || lastName) { //si esta ingresado el nombre o el apellido, osea alguno de los datos se guarda en el local storage
        localStorage.setItem("ProfileInfo", JSON.stringify(profileInfo))
      }
  }
  if(getEmailProfile !== emailProfile){//Si el email del local storage es diferente al valor ingresado actualmente, avisar al usuario

    alert("Su correo ha sido modificado exitosamente");
    localStorage.setItem("user", emailProfile); 

  }
})

document.addEventListener("DOMContentLoaded", (e) => {
e.preventDefault;
//si tengo el email logueado:
  if (localStorage.getItem("user")) {
    
   //lo guardo en una variable
    getEmailProfile = localStorage.getItem("user");
    //y traigo la info del perfil y lo guardo tambien
    getProfileInfo = JSON.parse(localStorage.getItem("ProfileInfo"));
     //asignación


    if (getProfileInfo) {
      firstNameInput.value = getProfileInfo.firstName;
      lastNameInput.value = getProfileInfo.lastName;
      emailProfileInput.value = getEmailProfile;
    } 
    
    else{
      emailProfileInput.value = getEmailProfile;// si no dejame solo el correo por default
    }


    const url = localStorage.getItem("my-image");
    const img = new Image();
    img.src = url;
    document.querySelector("#display-image").style.backgroundImage = `url(${url})`;

  } 
  
  
  else {
    alert("Debe loguearse primero")
    location.replace("index.html")
  }

  
})

//cuando le doy al boton cerrar sesión
document.getElementById("signOff").addEventListener("click", (e) => {
  localStorage.removeItem("ProfileInfo");
  localStorage.removeItem("my-image");
})

const inputEl = document.getElementById('image-input');
//desafiate
inputEl.addEventListener('change', () => {

  const file = inputEl.files[0];
  // Obtiene el archivo del elemento de entrada
  const fr = new FileReader();
  // Crea un nuevo objeto FileReader
  fr.readAsDataURL(file);
  // Establece FileReader para generar datos como una cadena URL
  fr.addEventListener('load', () => {
    // Waits for file reading to be complete
    const url = fr.result
    // Save result
    localStorage.setItem("my-image", url);


    const img = new Image();
    img.src = url;

    document.querySelector("#display-image").style.backgroundImage = `url(${url})`;

    // Make URL src of image and append to DOM

  })

})

