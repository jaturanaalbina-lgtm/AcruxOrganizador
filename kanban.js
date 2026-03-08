const supabaseUrl = "https://povomrkytmlboxvntabb.supabase.co";
const supabaseKey = "const client = supabase.createClient(https://povomrkytmlboxvntabb.supabase.com, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdm9tcmt5dG1sYm94dm50YWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODQyODksImV4cCI6MjA4ODU2MDI4OX0.UDGgbDUHC-KL8Tbkleaeg-sX5zSk-PnES_1j2X5fnqQ)";

const supabase = window.supabase.createClient(https://povomrkytmlboxvntabb.supabase.co, https://povomrkytmlboxvntabb.supabase.com, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvdm9tcmt5dG1sYm94dm50YWJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODQyODksImV4cCI6MjA4ODU2MDI4OX0.UDGgbDUHC-KL8Tbkleaeg-sX5zSk-PnES_1j2X5fnqQ);

let usuario = localStorage.getItem("usuario") || "anonimo";


// CARREGAR TAREFAS
async function carregarTarefas(){

let { data, error } = await supabase
.from("tarefas")
.select("*");

if(error){
console.error(error);
return;
}

render(data);

}


// RENDERIZAR TAREFAS NO KANBAN
function render(lista){

document.querySelectorAll(".tasks").forEach(e => e.innerHTML = "");

lista.forEach(task => {

let div = document.createElement("div");

div.className = "task";
div.draggable = true;
div.id = task.id;

div.innerHTML = `
${task.titulo}
<br>
<small>${task.criado_por}</small>
`;

div.ondragstart = drag;

let coluna = document.querySelector(`#${task.coluna} .tasks`);

if(coluna) coluna.appendChild(div);

});

}


// ADICIONAR TAREFA
async function addTask(coluna){

let input = document.querySelector(`#${coluna} .input-task`);

let texto = input.value;

if(texto === "") return;

let { error } = await supabase
.from("tarefas")
.insert([
{
titulo: texto,
coluna: coluna,
criado_por: usuario
}
]);

if(error){
console.error(error);
return;
}

input.value = "";

carregarTarefas();

}


// PERMITIR DROP
function allowDrop(ev){
ev.preventDefault();
}


// INICIAR DRAG
function drag(ev){
ev.dataTransfer.setData("text", ev.target.id);
}


// SOLTAR TAREFA
async function drop(ev){

ev.preventDefault();

let id = ev.dataTransfer.getData("text");

let coluna = ev.currentTarget.id;

let { error } = await supabase
.from("tarefas")
.update({ coluna: coluna })
.eq("id", id);

if(error){
console.error(error);
return;
}

carregarTarefas();

}


// ATUALIZAÇÃO EM TEMPO REAL
supabase
.channel("tarefas")
.on(
"postgres_changes",
{
event: "*",
schema: "public",
table: "tarefas"
},
payload => {
carregarTarefas();
}
)
.subscribe();


// CARREGAR AO ABRIR
carregarTarefas();