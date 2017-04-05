var expect = require('expect');
var {generateMessage} = require('./message.js');

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