var moment = require('moment');
const fs = require('fs');

const configFile = fs.readFileSync('config/config.json');
const config = JSON.parse(configFile);

function getDao(app) {
    var connection = app.persistence.connectionFactory;
    var machineDAO = new app.persistence.machineDAO(connection);
    return machineDAO;
}

var consultaPorId = function(app, code){
    return new Promise((resolve, reject) => {
        var machineDAO = getDao(app);
        machineDAO.findByCode(code, function (error, queryResult) {
            machine = queryResult[0];                
            resolve(machine);
        });
    });
}

var calcularDepreciacao = function(machine){
    //calcula depreciação
    moment.locale('pt-br');
    
    var data1 = moment(machine.mesAnoAquisicao, 'MM/YYYY');
    var data2 = moment();
    //tirando a diferenca da data2 - data1 em meses
    var diff = data2.diff(data1, 'month');
    machine.depreciacao = config.depreciacao * diff;
    machine.valorAtual = machine.valorAquisicao - machine.depreciacao;
    return machine;
}

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/detalhes/:code', function (req, res) {
        var code = req.params.code;
        consultaPorId(app, code).then((resultado) => {
            var machine = calcularDepreciacao(resultado);
            res.status(200).render('detailMachine', machine);
        });
        
    });

    app.get('/cadastrar', function (req, res) {
        res.render('add');
    });

    app.get('/buscar', function (req, res) {
        res.render('find');
    });
}