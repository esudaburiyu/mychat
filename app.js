var http = require('http');
var express = require('express');
var socket_io = require('socket.io');
var validator = require('validator');

var app = express();
var server = http.createServer(app);
var io = socket_io.listen(server);

server.listen(process.env.PORT, process.env.IP);

app.use(express.static(__dirname + '/public'));

io.sockets.on("connection", function (socket) {
  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
    var msg = validator.escape(data.value);
    io.sockets.emit("S_to_C_message", {msg: msg, id: socket.id});
  });
  // 切断したときに送信
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});
