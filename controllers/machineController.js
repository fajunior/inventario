var machines = [
    {"codigo":1,"tipoEquipamento":"Computador", "modelo":"Inspiron", "mesAnoAquisicao": "032019", "valorAquisicao":3000, "foto":"001.png"}
];

module.exports = function(app){
    app.get('/machine', function(req, res){
        var connection = app.persistence.connectionFactory;
        //já que o DAO tem um prototype então tenho que ter o new para garantir que cada thread tem um dao
        var machineDAO = new app.persistence.machineDAO(connection);
        machineDAO.list(function(error, queryResult){
            var string=JSON.stringify(queryResult);
            json =  JSON.parse(string);
            res.send(json);
        });

    });

    app.post('/machine', function(req, res){
        var machine = req.body;

        var connection = app.persistence.connectionFactory;
        
        var machineDAO = new app.persistence.machineDAO(connection);
        machineDAO.insert(machine, function(error, queryResult){
            if (error) {
                console.log(error);
                res.send('Não foi possível inserir objeto');
            } else {
                res.json(machine);
            }
        });

        machines.push(machine);
        console.log(machine);
        res.send('Máquina cadastrada');
    })
}