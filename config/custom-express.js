//importar a biblioteca do express
const express = require('express'); 

module.exports = function(){
    const app = express();

    //importa o machineController
    const machineController = require('../controllers/machineController')(app);

    return app;
}