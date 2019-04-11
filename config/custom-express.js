//importar a biblioteca do express
const express = require('express'); 
//importa o consign
const consign = require('consign');

module.exports = function(){
    const app = express();

    consign()
        //importa pasta de controladores
        .include('controllers')
        //adiciona os controladores ao app
        .into(app);

    return app;
}