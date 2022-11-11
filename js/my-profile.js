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


let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailProfileInput = document.getElementById("emailProfile");

document.getElementById("buttonProfile").addEventListener("submit", (e) => {
 e.preventDefault;
    let firstName = firstNameInput.value.trim();
    let lastName = lastNameInput.value;
  
    profileInfo = {
      firstName: firstName,
      lastName: lastName
    }
if(firstName || lastName){
    localStorage.setItem("ProfileInfo", JSON.stringify(profileInfo))
  }
  })

  
document.addEventListener("DOMContentLoaded", (e) => {
  getEmailProfile = localStorage.getItem("text")
  console.log(getEmailProfile)
  e.preventDefault;
  getProfileInfo = JSON.parse(localStorage.getItem("ProfileInfo"));

   firstNameInput.value = getProfileInfo.firstName;
   lastNameInput.value = getProfileInfo.lastName;
   emailProfileInput.value = getEmailProfile;

}) 

const image_input = document.querySelector("#image-input");

image_input.addEventListener("change", function() {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const uploaded_image = reader.result;
    document.querySelector("#display-image").style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);
});
