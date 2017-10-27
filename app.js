const express = require('express');
const http = require('http');
const socket = require('socket.io');


var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 2000;
var io = socket(server);


app.use(express.static(__dirname + '/files/'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/files/XO.html');
});


io.on('connection',(socket)=>{
    console.log('...');
    socket.on('onConn',function(data){
        console.log(`new connection at ${data.hh}:${data.mm}:${data.ss}`);
    });
    socket.on('restart',function(data){
        socket.broadcast.emit('restartPressed',{ });
    });
    socket.on('move',function(data){
        socket.broadcast.emit('serverMsg',{
            player : data.move,
            playerPos : data.position
        });
    });
    
});



server.listen(port,()=>{
    console.log('server started on port ' + port);
});