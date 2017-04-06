const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const {generateLocationMessage} = require('./utils/message.js');

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    //upon user connecting, emits the event newMessage which is picked up by client and displayed
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    //broadcast does not send to the individual client, but every other connection
    socket.on('createMessage', (message, callback) => { 
        console.log('Create message', message);
        //when client emits createMessage event, displays message to server 
        io.emit('newMessage', generateMessage(message.from, message.text)); //emits to all connections //socket.emit emits to a single connection
             //this will be heard on all open client connections 
        callback('This is from the server.'); //sends an event back to the front end client which lets the callback function execute on the client side
            
        // socket.broadcast.emit('newMessage', { //broadcast does not emit the message to the same client but rather every other client
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log("User was disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});