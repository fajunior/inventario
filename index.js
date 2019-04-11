//Importa express
const express = require('express');
//Inicia o express
const app = express();

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});

app.get('/', function(req, res){
    res.send('Rota OK');
});