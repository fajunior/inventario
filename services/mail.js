const nodemailer = require('nodemailer');
const fs = require('fs');

function mail() {}

mail.prototype.sendMail = function (qrcodeName, callback) {
    var configFile = fs.readFileSync('config/config.json');
    var config = JSON.parse(configFile);
    //enviando email
    var transporter = nodemailer.createTransport({
        host: config.smtp,
        port: config.port,
        service: config.service,
        auth: {
            user: config.username,
            pass: config.password
        }
    });

    var message = '<p>Equipamento cadastrado com sucesso</p>';
    console.log(message);
    const mailOptions = {
        from: config.fromMail, // sender address
        to: config.destinationMail, // list of receivers
        subject: config.subjectMail, // Subject line
        html: message,
        attachments: [{ // stream as an attachment
            filename: 'qrcode.jpg',
            content: fs.createReadStream('public/qrcode/' + qrcodeName)
        }] // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            callback(null,err);
        } else {
            console.log(info);
            callback(info,null);
        }
    });
}
module.exports = function () {
    return mail;
}