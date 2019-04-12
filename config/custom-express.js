//importar a biblioteca do express
var express = require('express'); 
//importa o consign
var consign = require('consign');
//importa o body-parser
var bodyparser = require('body-parser');

module.exports = function(){
    var app = express();

    //para objetos json
    app.use(bodyparser.json());
    //para elementos http encoded
    app.use(bodyparser.urlencoded({extended: true}));

    // Set static folder
    app.use(express.static('./public'))

    consign()
        //importa pasta de controladores
        .include('controllers')
        //importa pasta de persistencia
        .then('persistence')
        //adiciona os controladores ao app
        .into(app);

    return app;
}