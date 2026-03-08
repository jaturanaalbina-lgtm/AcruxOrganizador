<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

<script src="js/supabase.js"></script>

</head>

<body>

<h1>Painel Admin</h1>

<input id="titulo" placeholder="Título da tarefa">

<select id="area">

<option>Engenharia</option>
<option>Prototipagem</option>
<option>Garfo</option>
<option>Programacao</option>

</select>

<button onclick="criarTarefa()">Criar</button>

<script src="js/admin.js"></script>

</body>
</html>