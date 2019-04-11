var machines = [
    {"codigo":1,"tipoEquipamento":"Computador", "modelo":"Inspiron", "mesAnoAquisicao": "032019", "valorAquisicao":3000, "foto":"001.png"}
];

module.exports = function(app){
    app.get('/machine', function(req, res){
        res.send(machines);
    });

    app.post('/machine', function(req, res){
        var machine = req.body;
        machines.push(machine);
        console.log(machine);
        res.send('Máquina cadastrada');
    })
}