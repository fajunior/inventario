const fs = require('fs');
function mail() {

}

mail.prototype.sendMail = function (qrcodeName, callback) {
    var configFile = fs.readFileSync('config/config.json');
    var config = JSON.parse(configFile);

    var send = require('gmail-send')({
        user: config.username,
        pass: config.password,
        to: config.destinationMail,
        subject: 'attached ' + filepath, // Override value set as default
        html: '<p>Equipamento cadastrado com sucesso</p>'
    });
    
    var filepath = 'public/qrcode/' + qrcodeName; // File to attach
    
    send({ // Overriding default parameters
        subject: config.subjectMail,
        files: [filepath],
    }, function (err, res) {
        console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
        if (err) {
            callback(null, err);
        } else {
            callback(res, null);
        }
    });

}

module.exports = function () {
    return mail;
}