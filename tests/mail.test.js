var test = require('tape');
var mailImp = require('../services/mail')();
const fs = require('fs');
const fsextra = require('fs-extra');
var qrcode = require('../services/qrcode')();

var path = 'config/'

var qrpath = 'public/qrcode/2.png';
console.log(fs.existsSync(qrpath));
if (!fs.existsSync(qrpath)){
    console.log('criando arquivo para anexar');
    var machine = {"codigo":2,"tipoEquipamento":"notebook","modelo":"samsung","mesAnoAquisicao":"042019","valorAquisicao":6000}
    var qr = new qrcode;
    qr.gerarQRCode(machine, 'public/qrcode/');
}



test('Envia e-mail sucesso', (t) => {
    if (fs.existsSync(path + 'config.json')) {
        fs.unlinkSync(path + 'config.json');
    }

    fsextra.copy(path + 'configCerto.json', path + 'config.json')
        .then(() => {
            var mail = new mailImp;
            var result = mail.sendMail('2.png', function (result, err) {
                console.log('result')
                console.log(result);
                t.ok(result, "Executou corretamente");
                t.end();
            });
        })
        .catch(err => console.error(err));
})

test('Envia e-mail falha', (t) => {
    if (fs.existsSync(path + 'config.json')) {
        fs.unlinkSync(path + 'config.json');
    }

    fsextra.copy(path + 'configErrado.json', path + 'config.json')
        .then(() => {
            var mail = new mailImp;
            var result = mail.sendMail('2.png', function (result, err) {
                console.log('err')
                console.log(err);

                if (fs.existsSync(path + 'config.json')) {
                    fs.unlinkSync(path + 'config.json');
                }

                fsextra.copy(path + 'configCerto.json', path + 'config.json')
                    .then(() => {console.log('ok');});

                t.ok(err, "Executou corretamente");
                t.end();
            });
        })
        .catch(err => console.error(err));


})