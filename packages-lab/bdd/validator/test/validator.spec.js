const validator = require('../lib/validator');
const { expect } = require('chai');

function expectedToIncludeErrorWhenInvalid(example) {
    const { number, error } = example;
    it(`like ${number}`, function() {
        expect(validator(number)).to.include(error);
    });
}
describe('A Validator', function() {
    it('will return no errors for valid numbers', function() {
        expect(validator(7)).to.be.empty;
    });

    describe('will include error.nonpositive for not strictly positive numbers:', function() {
        [
            { number: 0, error: 'error.nonpositive' },
            { number: -2, error: 'error.nonpositive' },
        ].forEach(expectedToIncludeErrorWhenInvalid);
    });

    describe('will include error.three for divisible by 3 numbers:', function() {
        [{ number: 3, error: 'error.three' }, { number: 15, error: 'error.three' }].forEach(
            expectedToIncludeErrorWhenInvalid,
        );
    });

    describe('will return error.five for divisible by 5 numbers:', function() {
        [{ number: 5, error: 'error.five' }, { number: 15, error: 'error.five' }].forEach(
            expectedToIncludeErrorWhenInvalid,
        );
    });
});
