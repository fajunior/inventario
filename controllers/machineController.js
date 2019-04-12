const qr = require('qr-image');
const fs = require('fs');

function getDao(app) {
    var connection = app.persistence.connectionFactory;
    var machineDAO = new app.persistence.machineDAO(connection);
    return machineDAO;
}

module.exports = function (app) {
    //lista inventário
    app.get('/machine', function (req, res) {
        var machineDAO = getDao(app);

        machineDAO.list(function (error, queryResult) {
            res.send(queryResult);
        });
    });

    //consulta por codigo
    app.get('/machine/:code', function (req, res) {
        var code = req.params.code;
        var machineDAO = getDao(app);

        machineDAO.findByCode(code, function (error, queryResult) {
            var machine = queryResult[0];
            res.send(machine);
        });
    });

    //Cadastra nova máquina
    app.post('/machine', function (req, res) {
        var machine = req.body;
        var machineDAO = getDao(app);

        //Inserir máquina no banco
        machineDAO.insert(machine, function (error, queryResult) {
            if (error) {
                console.log(error);
                res.send('Não foi possível inserir objeto');
            } else {
                //recuperar a máquina com todos os dados
                machineDAO.getCode(function (error2, queryResult2) {
                    //recupera código da máquina inserida
                    var newMachine = queryResult2[0];
                    //Adiciona os dados passados na requisicao
                    for (attribute in machine) {
                        newMachine[attribute] = machine[attribute];
                    }

                    //Gera o qrcode a partir do json
                    var qr_png = qr.imageSync(JSON.stringify(newMachine), {
                        type: 'png'
                    })
                    let qr_code_file_name = newMachine.codigo + '.png';

                    fs.writeFileSync('./public/qrcode/' + qr_code_file_name, qr_png, (err) => {
                        if (err) {
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