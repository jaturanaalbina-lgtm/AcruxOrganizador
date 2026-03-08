const usuarios = [
{
usuario: "admin",
senha: "1234",
cargo: "adm"
},

{
usuario: "engenharia",
senha: "1234",
cargo: "engenharia"
},

{
usuario: "programacao",
senha: "1234",
cargo: "programacao"
}
];

function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

let encontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

if(encontrado){

localStorage.setItem("usuario", usuario);
localStorage.setItem("cargo", encontrado.cargo);

window.location.href = "dashboard.html";

}else{

document.getElementById("erro").innerText = "Usuário ou senha incorretos";

}

}