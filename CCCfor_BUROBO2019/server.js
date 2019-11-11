'use strict';

//HTTPサーバー関連設定
var path = require('path');
var express = require('express');
var app = express();

var staticPath = path.join(__dirname, '/');
app.use(express.static(staticPath));

app.set('port', process.env.PORT || 3000);

//ファイルシステム使用
const fs = require('fs');

//JSON宣言
var obj = {
    read: ''
}

//シリアルポート関連設定
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

//シリアル通信開始命令
serialport.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
})

//シリアル通信開始検知で実行
serialport.on('open', function () {
    return console.log('SerialPort open')
})

//シリアル通信-FEPへの書き込み
serialport.write("@RST\r\n", function (err) {
    if (err) {
        return console.log('SerialPort send error]', err.message);
    }
    console.log("\n[FEP RESET SIGNAL SENL]");
});

//シリアル通信-バッファにデータを確認すると読み込み
serialport.on('data', function (data) {
    console.log('\n[SerialPort READ]')
    //受信データをfiles/telemetry.jsonに書き込み
    let text = fs.readFileSync("files/telemetry.json", 'utf-8');
    obj.read = String(data);
    var json = JSON.stringify(obj);
    console.log(json);
    fs.writeFileSync("files/telemetry.json", String(json));

    console.log('[DONE]')
})

//HTTPサーバー開始命令
var server = app.listen(app.get('port'), function () {
    console.log('listening');
});