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
        from: 'Admin',
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
        });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
        });

    socket.on('createMessage', (message) => { 
        console.log('Create message', message);

        io.emit('newMessage', { //emits to all connections //socket.emit emits to a single connection
            from: message.from, //this will be heard on all open client connections 
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', { //broadcast does not emit the message to the same client but rather every other client
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});