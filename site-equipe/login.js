const usuarios = [
{usuario:"admin",senha:"1234"},
{usuario:"engenharia",senha:"1234"},
{usuario:"programacao",senha:"1234"}
];

function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

let encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

if(encontrado){

localStorage.setItem("usuario", usuario);
window.location.href="dashboard.html";

}else{

document.getElementById("erro").innerText="Usuário ou senha incorretos";

}

}