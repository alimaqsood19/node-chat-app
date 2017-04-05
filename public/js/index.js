var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li)
});

// socket.emit('createMessage', {
//     from: 'George',
//     text: 'Hello Boob'
// }, function(data) { //Event Acknowledgements, allows request listener to send something back to the request emitter
//     console.log('Got it', data);
// });
//Callbacks value is implicitly returned once its called, the result is just a string which is string
//the 'data' argument 

$('#message-form').on('submit', function(event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message').val()
    }, function() {

    });
});
