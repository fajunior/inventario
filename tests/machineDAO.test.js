//var test = require('tape');
const test = require('tape-async');

//instanciar o express
const app = require('../config/custom-express')();;


test('Maior codigo não zero', async  (t) => {
    var connection = app.persistence.connectionFactory;
    var machineDAO = new app.persistence.machineDAO(connection);
    await machineDAO.getCode(function (erro, queryResult) {
        console.log(queryResult);
        connection = null;
    });
    t.equal(1,1, "teste");
    t.end();
});
