let data = JSON.parse(localStorage.getItem("kanban")) || {
todo: [],
doing: [],
done: []
};

function save(){
localStorage.setItem("kanban", JSON.stringify(data));
}

function render(){

document.querySelectorAll(".tasks").forEach(e => e.innerHTML="");

for(let coluna in data){

let container = document.querySelector("#"+coluna+" .tasks");

data[coluna].forEach((task,i)=>{

let div = document.createElement("div");

div.className="task";

div.draggable=true;

div.id=coluna+"-"+i;

div.innerText=task;

div.ondragstart=drag;

container.appendChild(div);

});

}

}

function addTask(coluna){

let input = document.querySelector("#"+coluna+" .input-task");

if(input.value==="") return;

data[coluna].push(input.value);

input.value="";

save();

render();

}

function allowDrop(ev){
ev.preventDefault();
}

function drag(ev){
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev){

ev.preventDefault();

let id = ev.dataTransfer.getData("text");

let origem = id.split("-")[0];
let index = id.split("-")[1];

let task = data[origem][index];

data[origem].splice(index,1);

let destino = ev.currentTarget.id;

data[destino].push(task);

save();

render();

}

render();