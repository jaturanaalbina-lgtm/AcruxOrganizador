async function login(){

let email=document.getElementById("email").value;
let senha=document.getElementById("senha").value;

const {data,error}=await supabase.auth.signInWithPassword({

email:email,
password:senha

});

if(error){

document.getElementById("erro").innerText="Login inválido";
return;

}

localStorage.setItem("usuario_id",data.user.id);

window.location.href="dashboard.html";

}