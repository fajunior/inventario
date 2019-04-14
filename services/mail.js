function mail() {

}

mail.prototype.sendMail = function (qrcodeName, callback) {
    // Require'ing module and setting default options

    var send = require('gmail-send')({
        //var send = require('../index.js')({
        user: 'fajunior@gmail.com',
        // user: credentials.user,                  // Your GMail account used to send emails
        pass: 'aykglcecybjfwwjf',
        // pass: credentials.pass,                  // Application-specific password
        to: 'fcoajunior@gmail.com',
        // to:   credentials.user,                  // Send to yourself
        // you also may set array of recipients:
        // [ 'user1@gmail.com', 'user2@gmail.com' ]
        // from:    credentials.user,            // from: by default equals to user
        // replyTo: credentials.user,            // replyTo: by default undefined
        // bcc: 'some-user@mail.com',            // almost any option of `nodemailer` will be passed to it
        subject: 'test subject',
        text: 'gmail-send example 1', // Plain text
        //html:    '<b>html text</b>'            // HTML
    });

    var filepath = 'public/qrcode/' + qrcodeName; // File to attach

    send({ // Overriding default parameters
        subject: 'attached ' + filepath, // Override value set as default
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