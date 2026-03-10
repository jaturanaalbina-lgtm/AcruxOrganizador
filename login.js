async function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

const { data, error } = await supabase.auth.signInWithPassword({
usuario: usuario,
password: senha
});

if(error){
document.getElementById("erro").innerText = "Login inválido";
return;
}

localStorage.setItem("usuario", usuario);

window.location.href = "dashboard.html";

}