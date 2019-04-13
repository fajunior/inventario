var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function (app) {

    app.get('/fileupload', function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.send();
    });

    //Upload arquivo
    app.post('/fileupload', function (req, res) {
        var form = new formidable.IncomingForm();
        const basepath = 'public/pictures/';
        var count = 0;
        form.parse(req, function (err, fields, files) {
            console.log(files);
            var fullFilename = files.myfile.name;
            var filename = fullFilename.split('.').slice(0, -1).join('.');
            var fileExtencion = fullFilename.split('.').slice(-1)[0];
            var newFullFilename = filename + '.' + fileExtencion;

            var oldpath = files.myfile.path;
            var newpath = basepath + newFullFilename;

            while (fs.existsSync(newpath)) {
                count++;
                newFullFilename = filename + '_' + count + '.' + fileExtencion;
                newpath = basepath + newFullFilename;
            }

            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                var fileNameJson = JSON.parse('{"filename":"'+newFullFilename+'"}');
                res.json(fileNameJson);
            });
        });

    });
}