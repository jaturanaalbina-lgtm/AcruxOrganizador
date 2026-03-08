const supabaseUrl = "https://povomrkytmlboxvntabb.supabase.com";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdm9tcmt5dG1sYm94dm50YWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODQyODksImV4cCI6MjA4ODU2MDI4OX0.UDGgbDUHC-KL8Tbkleaeg-sX5zSk-PnES_1j2X5fnqQ";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let usuario = localStorage.getItem("usuario");

async function carregarTarefas(){

let { data } = await supabase
.from("tarefas")
.select("*");

render(data);

}

function render(lista){

document.querySelectorAll(".tasks").forEach(e=>e.innerHTML="");

lista.forEach(task => {

let div = document.createElement("div");

div.className="task";

div.draggable=true;

div.id=task.id;

div.innerHTML = `
${task.titulo}
<br>
<small>Criado por: ${task.criado_por}</small>
`;

div.ondragstart = drag;

let coluna = document.querySelector(`#${task.coluna} .tasks`);

if(coluna) coluna.appendChild(div);

});

}

async function addTask(coluna){

let input = document.querySelector(`#${coluna} .input-task`);

let texto = input.value;

if(texto === "") return;

await supabase
.from("tarefas")
.insert([
{
titulo: texto,
coluna: coluna,
criado_por: usuario
}
]);

input.value="";

}

function allowDrop(ev){
ev.preventDefault();
}

function drag(ev){
ev.dataTransfer.setData("text", ev.target.id);
}

async function drop(ev){

ev.preventDefault();

let id = ev.dataTransfer.getData("text");

let novaColuna = ev.currentTarget.id;

await supabase
.from("tarefas")
.update({ coluna: novaColuna })
.eq("id", id);

}

supabase
.channel("tarefas")
.on(
"postgres_changes",
{ event: "*", schema: "public", table: "tarefas" },
payload => {
carregarTarefas();
}
)
.subscribe();

carregarTarefas();