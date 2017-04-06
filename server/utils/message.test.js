var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => { 
    it('should generate correct message object', () => {
        var from = 'Boob';
        var text = 'Some messsage';
        var message = generateMessage(from, text); //returns an object from the function 

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            text: text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct message object', () => {
        var from = 'User';
        var latitude = 43.598955;
        var longitude = -79.6636153;
        var url = (`https://www.google.com/maps?q=${latitude},${longitude}`);
        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message.url).toEqual(url);
        expect(message).toInclude({
            from: from,
            url: url
        });
    });
});