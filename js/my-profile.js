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
  
        form.classList.add('was-validated')
  
  
      }, false)
  
    })
  
  })()

  //arreglar esto luego
  let dataProfile = "";
  const firstname = document.getElementById("firstName");
  const lastname = document.getElementById("lastName").value;
  const emailProfile = document.getElementById("Email").value;
    
  document.getElementById("buttonProfile").addEventListener("click", (e) => {
      /*e.preventDefault; 
      profileInfo = {
        firstname: firstname,
        lastname: lastname,
        email: emailProfile
      }*/
      if (firstname.value){
      localStorage.setItem("profileInfo", firstname.value)
   }})

document.addEventListener("DOMContentLoaded", function(){
  if(firstname.value){
  getProfileInfo = localStorage.getItem("profileInfo");
getProfileInfo = firstname.value;
}
})