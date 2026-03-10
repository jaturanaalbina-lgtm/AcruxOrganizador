async function login(){

let email = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

const { data, error } = await supabase.auth.signInWithPassword({
email: email,
password: senha
});

if(error){
document.getElementById("erro").innerText = "Login inválido";
return;
}

localStorage.setItem("usuario", email);

window.location.href = "dashboard.html";

}