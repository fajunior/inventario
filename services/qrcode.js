const qr = require('qr-image');
const fs = require('fs');

function qrcode(){
    console.log('qrcode criado')
}

qrcode.prototype.gerarQRCode = function (newMachine, path) {
    //Gera o qrcode a partir do json
    var qr_png = qr.imageSync(JSON.stringify(newMachine), {
        type: 'png'
    })

    let qr_code_file_name = newMachine.codigo + '.png';

    fs.writeFileSync(path + qr_code_file_name, qr_png, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        }
    })

    return qr_code_file_name;
    /*return new Promise((resolve, reject) => {
    });*/
}
module.exports = function () {
    return qrcode;
}