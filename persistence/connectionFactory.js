//importa a biblioteca do mysql
var mysql = require('mysql');

function createDBConnection(){
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'inventario',
        password: 'inventario',
        database: 'inventario'
    });
    return connection;
}

module.exports = function(){
    return createDBConnection();
}