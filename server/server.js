const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const {generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users.js');

const publicPath =  path.join(__dirname, '../public');

var app = express();
var port = process.env.PORT || 3000; //required for heroku 
// console.log(__dirname  + '/../public');
// console.log(publicPath);

var server = http.createServer(app); //created a server using http instead of express but same thing
var io = socketIO(server); //websocket IO 

var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => { //socket is the individual connection, so upon the event emitter
    //'connection' a paramter socket is also passed through 
    console.log("New user connected");

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || (!isRealString(params.room))) {
           return callback('Name and room name are required.');
        }

        socket.join(params.room); //Joins a specific room 
        //socket.leave('The office fans)
        //io.emit -> io.to('The office fans).emit //emits to all in that particular room
        //socket.broadcast.emit -> socket.broadcast.to('the office fans).emit //to all in that particular room except current client/user
        //socket.emit individual client 
        users.removeUser(socket.id); //user joins the room and removes them from any previous rooms
        users.addUser(socket.id, params.name, params.room) //adds them to the new room 

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //emits to the specified room, a list of Users currently in room 

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //upon user connecting, emits the event newMessage which is picked up by client and displayed
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        //broadcast does not send to the individual client, but every other connection

        callback(); //No arguments passed in, since the first argument in the callback is the err argument 
    });//so if its valid we dont want to pass any errors back 

    socket.on('createMessage', (message, callback) => { 
        console.log('Create message', message);
        //when client emits createMessage event, displays message to server 
        io.emit('newMessage', generateMessage(message.from, message.text)); //emits to all connections //socket.emit emits to a single connection
             //this will be heard on all open client connections 
        callback(); //sends an event back to the front end client which lets the callback function execute on the client side
            
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
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        //if someone was removed then update the current Users array and emit who left  
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});