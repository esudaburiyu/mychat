var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket_io.listen(server);

server.listen(3000);

app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
//   res.sendfile(__dirname + '/index.html');
// });

io.sockets.on("connection", function (socket) {

  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", function (data) {
    io.sockets.emit("S_to_C_message", {value:data.value, id:socket.id});
  });

  // 切断したときに送信
  socket.on("disconnect", function () {
//    io.sockets.emit("S_to_C_message", {value:"user disconnected"});
  });
});