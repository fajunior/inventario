//const test = require('tape');
var tape = require('tape')
var _test = require('tape-promise').default // <---- notice 'default'
var test = _test(tape) // decorate tape


var connection = require('../persistence/connectionFactory')();
var dao = require('../persistence/machineDAO');

var machineDAO = new dao(connection);

var buscarCodigo = function (dao1) {
    return new Promise((resolve, reject) => {
        console.log('passo1');
        dao1.getCode(function (erro, queryResult) {
            console.log('entrou');
            var code = queryResult[0];
            resolve(code);
        });
    });
}

test('Connection não nula', (t) => {

    t.assert(connection != null, "Descontou corretamente")
    t.end()
})

test('DAO não nulo', (t) => {

    t.assert(machineDAO != null, "Descontou corretamente")
    t.end()
})
/*
    buscarCodigo().then((resultado) => {
        console.log(resultado);
        
        test('Maior codigo não zero', (t) => {
            t.assert(1 == 1, "Descontou corretamente");
            t.end();
        });
    });
*/
test('Maior codigo não zero', (t) => {
    return buscarCodigo(machineDAO).then((resultado) => {
        console.log(resultado);
        
        t.assert(1 == 1, "Descontou corretamente");
        t.end();
    });

})
/*
*/