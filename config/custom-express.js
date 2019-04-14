//importar a biblioteca do express
var express = require('express'); 
//importa o consign
var consign = require('consign');
//importa o body-parser
var bodyparser = require('body-parser');
//importa o ejs
const ejs = require('ejs');
var expressValidator = require('express-validator');

module.exports = function(){
    var app = express();

    //para objetos json
    app.use(bodyparser.json());
    //para elementos http encoded
    app.use(bodyparser.urlencoded({extended: true}));
    // Set static folder
    app.use(express.static('./public'));
    //validador
    app.use(expressValidator());

    // Set view engine
    app.set('views', './public' + '/views');
    app.set('view engine', 'ejs')

    consign()
        //importa pasta de controladores
        .include('controllers')
        //importa pasta de persistencia
        .then('persistence')
        .then('services')
        //adiciona os controladores ao app
        .into(app);

    return app;
}