const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var nonString = 1234
        var message = isRealString(nonString)

        expect(message).toBeA('boolean')
        expect(message).toBe(false)
    });

    it('should reject string with only spaces', () => {
        var spaces = '      '
        var message = isRealString(spaces)

        expect(message).toBeA('boolean');
        expect(message).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var validString = '  Hello There  '
        var message = isRealString(validString)

        expect(message).toBeA('boolean');
        expect(message).toBe(true)
    });
});