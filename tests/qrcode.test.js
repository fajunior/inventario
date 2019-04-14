var test = require('tape');
var qrcode = require('../services/qrcode')();
var fs = require('fs');

var machine = {"codigo":2,"tipoEquipamento":"notebook","modelo":"samsung","mesAnoAquisicao":"042019","valorAquisicao":6000}

var path = 'public/qrcode/2.png';
if (fs.existsSync(path)){
    fs.unlinkSync(path);
}

test('QRCode não existe', (t) => {
    
    t.notOk(fs.existsSync(path), "Executou corretamente");
    t.end();
})

test('QRCode criado', (t) => {
    var qr = new qrcode;

    qr.gerarQRCode(machine, 'public/qrcode/');
    t.ok(fs.existsSync(path), "Executou corretamente");
  
    t.end();
})