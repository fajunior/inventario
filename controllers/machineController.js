var moment = require('moment');
const qr = require('qr-image');
const fs = require('fs');


const configFile = fs.readFileSync('config/config.json');
const config = JSON.parse(configFile);

function getDao(app) {
    var connection = app.persistence.connectionFactory;
    var machineDAO = new app.persistence.machineDAO(connection);
    return machineDAO;
}

var inserir = function (machine, app) {
    return new Promise((resolve, reject) => {
        var machineDAO = getDao(app);
        //Inserir máquina no banco
        machineDAO.insert(machine, function (error, queryResult) {
            if (error) {
                console.log(error);
                res.status(500).send('Não foi possível inserir objeto');
            } else {

                var machineDAO = getDao(app);
                machineDAO.getCode(function (error2, queryResult2) {
                    //recupera código da máquina inserida
                    var newMachine = queryResult2[0];
                    //Adiciona os dados passados na requisicao
                    for (attribute in machine) {
                        newMachine[attribute] = machine[attribute];
                    }
                    resolve(newMachine);
                });
            }

        });
    });
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
    //lista inventário
    app.get('/machine', function (req, res) {
        var machineDAO = getDao(app);

        machineDAO.list(function (error, queryResult) {
            res.send(queryResult);
        });
    });

    app.delete('/machine/:code', function (req, res) {
        var code = req.params.code;
        var machineDAO = getDao(app);
        machineDAO.delete(code, function (error, queryResult) {
            /*try {
                fs.unlinkSync(path)
                //file removed
              } catch(err) {
                console.error(err)
              }*/
            res.send('removido');
        });
    });

    //Cadastra nova máquina
    app.post('/machine', function (req, res) {
        var machine = req.body;
        var machineDAO = getDao(app);


        inserir(machine, app).then((resultado) => {
            console.log(resultado);
            //gerar qrcode
            var qrcode = new app.services.qrcode;
            var qrcodeName = qrcode.gerarQRCode(resultado);
            //enviar email
            var mail = new app.services.mail;
            mail.sendMail(qrcodeName);
            //enviarEmail(qrcodeName);
            res.location('/machine/' + machine.codigo);
            // Send the link of generated QR code
            res.status(201).send({
                'qr_img': "qrcode/" + qrcodeName
            });
        });
    });

    //Cadastra nova máquina
    app.get('/buscar/:code', function (req, res) {
        var code = req.params.code;
        consultaPorId(app, code).then((resultado) => {
            if (resultado){
                var machine = calcularDepreciacao(resultado);
                res.status(200).json(machine);
            } else {
                res.status(400).send('não encontrado');
            }
        });
    });
   
}