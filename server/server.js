const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath =  path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000; //required for heroku 
// console.log(__dirname  + '/../public');
// console.log(publicPath);

var server = http.createServer(app); //created a server using http instead of express but same thing
var io = socketIO(server); //websocket IO 

app.use(express.static(publicPath));

io.on('connection', (socket) => { //socket is the individual connection, so upon the event emitter
    //'connection' a paramter socket is also passed through 
    console.log("New user connected");

    socket.emit('newMessage', {
        from: 'Boob@hotmail.com',
        text: 'Hello there dude',
        createdAt: 123
    });

    socket.on('createMessage', (message) => {
        console.log('Create message', message);
    });

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});