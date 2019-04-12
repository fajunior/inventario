module.exports = function(app){
    app.get('/machine', function(req, res){
        var connection = app.persistence.connectionFactory;
        //já que o DAO tem um prototype então tenho que ter o new para garantir que cada thread tem um dao
        var machineDAO = new app.persistence.machineDAO(connection);
        machineDAO.list(function(error, queryResult){
            //var string=JSON.stringify(queryResult);
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
               //Recupera o código e alimenta nos atributos da máquina
                machineDAO.getCode(function(error2, queryResult2){
                    var string=JSON.stringify(queryResult2);
                    var newMachine =  queryResult2[0];
                    var myNewVar={'5':'Electronics'};
                    for (attribute in machine) {
                        newMachine[attribute]=machine[attribute];
                    }
                   
                    res.json(newMachine);
                });
            }
        });
    })
}