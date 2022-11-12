const pass = document.getElementById("password");
const usuario1 = document.getElementById("userLogin")
const email = document.getElementById("emailIndex");
const buttonIndex = document.getElementById("buttonIndex");

buttonIndex.addEventListener("click", (e) => { 
    if (email.value.length < 1 || pass.value.length < 1){
        alert("Error, los campos estan vacios")
} else{
    location.replace("home.html")
    localStorage.setItem("user", email.value)
}
})
