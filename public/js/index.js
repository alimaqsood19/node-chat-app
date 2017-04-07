var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    }); //Mustache method that renders the template on clientside

    $('#messages').append(html); //outputs the injected value

    // //can call moment method since its loaded in index.html 
    // console.log('newMessage', message);
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text} `);
    // $('#messages').append(li)
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html(); //grabs inner html of that selector
    var html = Mustache.render(template, { //All the data that you want rendered 
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);


    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My Current Location</a>')

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a); //adds the anchor right after the text we just set

    // $('#messages').append(li);
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

    var messageTextbox = $('[name=message');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() { //Event Acknowledgement, the return is just an empty string to clear the message box 
        messageTextbox.val('')
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (err) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
    console.log(err);
  });
});
