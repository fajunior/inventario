module.exports = function(app){
    app.get('/machine', function(req, res){
        res.send('[{"codigo":1,"tipoEquipamento":"Computador", "modelo":"Inspiron", "mesAnoAquisicao": "032019", "valorAquisicao":3000, "foto":"001.png"}]');
    });

  
}