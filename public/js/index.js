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

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>')

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a); //adds the anchor right after the text we just set

    $('#messages').append(li);
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

$('#send-location').on('click', function() {
    if (!navigator.geolocation) {
        $('#geolocation').css("display","block")
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err) {
        $('#geolocation').css('display', 'block');
        $('#geolocation').text('Unable to fetch location');
        console.log(err);
    })
});
