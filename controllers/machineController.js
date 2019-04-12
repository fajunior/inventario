const qr = require('qr-image');
const fs = require('fs');

module.exports = function(app){
    

    //lista inventário
    app.get('/machine', function(req, res){
        var connection = app.persistence.connectionFactory;
        var machineDAO = new app.persistence.machineDAO(connection);

        machineDAO.list(function(error, queryResult){
            //var string=JSON.stringify(queryResult);
            //json =  JSON.parse(string);
            res.send(queryResult);
        });
    });
    
    //consulta por codigo
    app.get('/machine/consult/:code', function(req, res){
        var code = req.params.code;
        var connection = app.persistence.connectionFactory;
        var machineDAO = new app.persistence.machineDAO(connection);

        machineDAO.findByCode(code, function(error, queryResult){
            var machine = queryResult[0];
            res.send(machine);
        });
    });

    //Cadastra nova máquina
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
                   
                    //Gera o qrcode a partir do json
                    var qr_png = qr.imageSync(JSON.stringify(newMachine),{ type: 'png'})
                    let qr_code_file_name = newMachine.codigo + '.png';

                    fs.writeFileSync('./public/qrcode/' + qr_code_file_name, qr_png, (err) => {
                        if(err){
                            console.log(err);
                        }
                    })

                    // Send the link of generated QR code
                    res.send({
                        'qr_img': "qrcode/" + qr_code_file_name
                    });
                });
            }
        });

        
    })
}