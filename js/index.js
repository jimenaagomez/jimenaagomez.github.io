const password = document.getElementById("password");
const email = document.getElementById("emailIndex");


document.getElementById("buttonIndex").addEventListener("click", (e) => { 
    if (email.value.length < 1 || password.value.length < 1){
        alert("Error, los campos estan vacios")
} else{
    location.replace("home.html")
    localStorage.setItem("user", email.value)
}
})
