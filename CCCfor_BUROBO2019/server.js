'use strict';

//HTTP�T�[�o�[�֘A�ݒ�
var path = require('path');
var express = require('express');
var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.set('port', process.env.PORT || 3000);

//�t�@�C���V�X�e���g�p
const fs = require('fs');

//JSON�錾
var obj = {
    read: ''
}

//�V���A���|�[�g�֘A�ݒ�
const SerialPort = require('serialport')
var portName = 'COM5';
var serialport = new SerialPort(portName, {
    baudRate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    autoOpen: false,
});

//�V���A���ʐM�J�n����
serialport.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
})

//�V���A���ʐM�J�n���m�Ŏ��s
serialport.on('open', function () {
    return console.log('SerialPort open')
})

//�V���A���ʐM-FEP�ւ̏�������
serialport.write("@RST\r\n", function (err) {
    if (err) {
        return console.log('SerialPort send error]', err.message);
    }
    console.log("\n[FEP RESET SIGNAL SENL]");
});

//�V���A���ʐM-�o�b�t�@�Ƀf�[�^���m�F����Ɠǂݍ���
serialport.on('data', function (data) {
    console.log('\n[SerialPort READ]')
    //��M�f�[�^��files/telemetry.json�ɏ�������
    let text = fs.readFileSync("files/telemetry.json", 'utf-8');
    obj.read = String(data);
    var json = JSON.stringify(obj);
    console.log(json);
    fs.writeFileSync("files/telemetry.json", String(json));

    console.log('[DONE]')
})

//HTTP�T�[�o�[�J�n����
var server = app.listen(app.get('port'), function () {
    console.log('listening');
});