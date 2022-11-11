const usuario1 = document.getElementById("usuario1")
const email = document.getElementById("email");
const pass = document.getElementById("password");
const button = document.getElementById("button");

button.addEventListener("click", (e) => { 
    if (email.value.length < 1 || pass.value.length < 1){
        alert("Error, los campos estan vacios")
} else{
    location.replace("home.html")
    localStorage.setItem("text", email.value)
}
})
