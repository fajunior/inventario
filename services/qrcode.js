const qr = require('qr-image');
const fs = require('fs');

function qrcode(){
}

qrcode.prototype.gerarQRCode = function (newMachine) {
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

    return qr_code_file_name;
    /*return new Promise((resolve, reject) => {
    });*/
}
module.exports = function () {
    return qrcode;
}