//importar a biblioteca do express
const express = require('express'); 

//instanciar o express
const app = express();

//importa o machineController
const machineController = require('./controllers/machineController')(app);

app.listen(3000, function(){
    console.log('Servidor rodando na porta 3000');
});

