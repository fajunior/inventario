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
    var sql = "select codigo, tipoEquipamento, modelo, mesAnoAquisicao, valorAquisicao, concat('qrcode/',codigo,'.png') as qrcodeURL from machine";
    this._connection.query(sql, callback);
}

//Procedimentoi para buscar por codigo
machineDAO.prototype.findByCode = function (codigo, callback) {
    var sql = 'select * from machine where codigo = ?';
    this._connection.query(sql, [codigo], callback);
}

//Procedimento para pegar o codigo inserido
machineDAO.prototype.getCode = function (callback) {
    var sql = 'select max(codigo) as codigo from machine';
    this._connection.query(sql, callback);
}

module.exports = function () {
    return machineDAO;
}