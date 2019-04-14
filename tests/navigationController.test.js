'use strict';

var test = require('tape');
var request = require('supertest');



//instanciar o express
var app = require('../config/custom-express')();

var codigo;
var machine = {
    "tipoEquipamento": "notebook",
    "modelo": "samsung",
    "mesAnoAquisicao": "032019",
    "valorAquisicao": 6000
}

if (require.main === module) {
    app.listen(3000);
}

test('GET /machine - Listar', function (assert) {
    request(app)
        .get('/machine')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            
            var actualThings = res.body;

            assert.error(err, 'Lista sem erro');
            //assert.same(actualThings, expectedThings, 'Retrieve list of things');
            assert.end();
        });
});

test('POST /machine - Cadastrar falha no valor de aquisicao', function (assert) {
    var machineError = {};
    for (var attribute in machine) {
        machineError[attribute] = machine[attribute];
    }
    machineError.valorAquisicao = null;
    request(app)
        .post('/machine')
        .send(machineError)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;

            assert.error(err, 'Retorno sem erro');
            assert.equals('Valor Aquisicao é obrigatório',newMachine[0].msg, 'Valor Aquisicao é obrigatório');
            assert.equals('Valor Aquisicao deve ser decimal',newMachine[1].msg, 'Valor Aquisicao deve ser decimal');
            assert.end();
        });
});

test('POST /machine - Cadastrar falha no mes ano de aquisicao não numerico', function (assert) {
    var machineError = {};
    for (var attribute in machine) {
        machineError[attribute] = machine[attribute];
    }
    machineError.mesAnoAquisicao = 'texto';
    request(app)
        .post('/machine')
        .send(machineError)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;

            assert.error(err, 'Retorno sem erro');
            assert.equals('Mês e ano do equipamento deve ser numérico',newMachine[0].msg, 'Mês e ano do equipamento deve ser numérico');
            assert.end();
        });
});

test('POST /machine - Cadastrar falha no mes ano de aquisicao nulo', function (assert) {
    var machineError = {};
    for (var attribute in machine) {
        machineError[attribute] = machine[attribute];
    }
    machineError.mesAnoAquisicao = null;
    request(app)
        .post('/machine')
        .send(machineError)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;

            assert.error(err, 'Retorno sem erro');
            assert.equals('Mês e ano do equipamento deve ser numérico',newMachine[1].msg, 'Mês e ano do equipamento deve ser numérico');
            assert.equals('Mês e ano do equipamento é obrigatório',newMachine[0].msg, 'Mês e ano do equipamento é obrigatório');
            assert.end();
        });
});


test('POST /machine - Cadastrar falha no mes ano de aquisicao', function (assert) {
    var machineError = {};
    for (var attribute in machine) {
        machineError[attribute] = machine[attribute];
    }
    machineError.mesAnoAquisicao = '000000000';
    request(app)
        .post('/machine')
        .send(machineError)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;
            console.log(newMachine);

            assert.error(err, 'Retorno sem erro');
            assert.equals('Tamanho máximo do mês e ano do equipamento é 6',newMachine[0].msg, 'Tamanho máximo do mês e ano do equipamento é 6');
            assert.end();
        });
});

test('POST /machine - Cadastrar falha no mes ano de aquisicao, data inválida', function (assert) {
    var machineError = {};
    for (var attribute in machine) {
        machineError[attribute] = machine[attribute];
    }
    machineError.mesAnoAquisicao = '999999';
    request(app)
        .post('/machine')
        .send(machineError)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;

            assert.error(err, 'Retorno sem erro');
            assert.equals('Data inválida',newMachine[0].msg, 'Tamanho máximo do mês e ano do equipamento é 6');
            assert.end();
        });
});

test('POST /machine - Cadastrar com sucesso', function (assert) {
    
    request(app)
        .post('/machine')
        .send(machine)
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var newMachine = res.body;
            var fullFilename = newMachine.qr_img;
            console.log(fullFilename);
            codigo = fullFilename.split('.').slice(0, -1).join('.').replace('qrcode/','');
            codigo = parseInt(codigo);

            assert.error(err, 'Retorno sem erro');
            assert.ok(newMachine.qr_img, 'Retornou url do qrcode para ser exibido');
            assert.ok(codigo > 0 , 'Cadastrando equipamento');
            assert.end();
        });
});

test('GET /buscar/:code - Buscar por ID', function (assert) {
    var expected = {"codigo":codigo};
    for (attribute in machine) {
        expected[attribute] = machine[attribute];
    }


    request(app)
        .get('/buscar/'+codigo)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {

            var newMachine = res.body;
            console.log(newMachine);
            

            assert.error(err, 'Retorno sem erro');
            assert.equals(newMachine.codigo, expected.codigo, 'Codigo igual');
            assert.equals(newMachine.modelo, expected.modelo, 'modelo igual');
            assert.equals(newMachine.mesAnoAquisicao, expected.mesAnoAquisicao, 'mesAnoAquisicao igual');
            assert.equals(newMachine.valorAquisicao, expected.valorAquisicao, 'Valor aquisicao igual');
            assert.ok(newMachine.depreciacao > 0, 'Depreciação maior que zero');
            assert.ok(newMachine.valorAquisicao > newMachine.valorAtual, 'Valor aquisicao maior que o atual');
            assert.ok(newMachine.valorAquisicao == (newMachine.valorAtual + newMachine.depreciacao), 'Valor atual igual ao de aquisição menos deprecisação');
            assert.end();
        });
});

test('DELETE /machine/:code - Remover por ID', function (assert) {
 
        request(app)
        .delete('/machine/'+codigo)
        .expect(202)
        .expect('Content-Type', /text/)
        .end(function (err, res) {

            var retorno = res.body;
            console.log(retorno);

            assert.error(err, 'Retorno sem erro');
            assert.end();
        });
});

test('GET /buscar/:code - Buscar por ID depois da remoção', function (assert) {
    request(app)
        .get('/buscar/'+codigo)
        .expect(204)
        .end(function (err, res) {

            var newMachine = res.body;

            assert.error(err, 'Retorno sem erro');
            assert.end();
        });
});