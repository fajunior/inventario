//Construtor que recebe a conexão por parâmetro
function machineDAO(connection) {
    //Cria uma variável global this._connection atribuindo a conexão à ela
    this._connection = connection;
}

//Procedimentoi para inserir
machineDAO.prototype.insert = function (machine, callback) {
    var sql = 'INSERT INTO machine SET ?';
    this._connection.query(sql, machine, callback);
}
//Procedimentoi para listar
machineDAO.prototype.list = function (callback) {
    var sql = 'select * from machine';
    this._connection.query(sql, callback);
}
//Procedimentoi para buscar por id
machineDAO.prototype.findById = function (id, callback) {
    var sql = 'select * from machine where codigo = ?';
    this._connection.query(sql, [id], callback);
}
module.exports = function () {
    return machineDAO;
}