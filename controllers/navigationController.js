var moment = require('moment');
const fs = require('fs');



function getDao(app) {
    var connection = app.persistence.connectionFactory;
    var machineDAO = new app.persistence.machineDAO(connection);
    return machineDAO;
}

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('/detalhes/:code', function (req, res) {
        var code = req.params.code;
        var machineDAO = getDao(app);

        var configFile = fs.readFileSync('config/config.json');  
        var config = JSON.parse(configFile);

        machineDAO.findByCode(code, function (error, queryResult) {
            var machine = queryResult[0];
            //calcula depreciação
            moment.locale('pt-br');
            
            var data1 = moment(machine.mesAnoAquisicao,'MM/YYYY');
            var data2 = moment();
            //tirando a diferenca da data2 - data1 em meses
            var diff  = data2.diff(data1, 'month');
            machine.depreciacao = config.depreciacao * diff;

            res.render('detailMachine', machine);
        });
    });

    app.get('/detalhes', function (req, res) {
        var code = req.params.code;
        var machineDAO = getDao(app);

        
        res.render('detailMachine');


        
    });
}