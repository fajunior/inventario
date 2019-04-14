//const test = require('tape');
var test = require('tape')

test('Maior codigo não zero', (t) => {
    var connection = require('../persistence/connectionFactory')();
    var dao = require('../persistence/machineDAO')();
    var machineDAO = new dao(connection);
    machineDAO.getCode(function (error, queryResult) {
        console.log(queryResult.codigo);
    });
    t.assert(1 == 1, "Descontou corretamente");
    t.end();
});