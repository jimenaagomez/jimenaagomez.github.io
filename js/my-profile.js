 (function () {
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

let firstName = undefined;
let lastName = undefined;

let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailProfileInput = document.getElementById("emailProfile");

document.getElementById("buttonProfile").addEventListener("click", (e) => {
 e.preventDefault;
    firstName = firstNameInput.value.trim();
    lastName = lastNameInput.value;
  
    profileInfo = {
      firstName: firstName,
      lastName: lastName
    }
    console.log(profileInfo)
    if (profileInfo){
      getEmailProfile = localStorage.removeItem("ProfileInfo");
      localStorage.setItem("ProfileInfo", JSON.stringify(profileInfo))
    } else{
    if(firstName || lastName){
    localStorage.setItem("ProfileInfo", JSON.stringify(profileInfo))
  }}
  })

  
document.addEventListener("DOMContentLoaded", (e) => {
  getEmailProfile = localStorage.getItem("user")
  console.log(getEmailProfile)
  e.preventDefault;
  getProfileInfo = JSON.parse(localStorage.getItem("ProfileInfo"));
 if(getProfileInfo){
   firstNameInput.value = getProfileInfo.firstName;
   lastNameInput.value = getProfileInfo.lastName;
   emailProfileInput.value = getEmailProfile;}
   const url = localStorage.getItem("my-image");
   const img = new Image();
   img.src = url;
   document.querySelector("#display-image").style.backgroundImage = `url(${url})`;


}) 



const inputEl = document.getElementById('image-input');

inputEl.addEventListener('change' , () => {

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
