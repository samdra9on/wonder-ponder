const validator = require('../lib/validator');
const { expect } = require('chai');

function expectedToIncludeErrorWhenInvalid(number, error) {
    it(`like ${number}`, function() {
        expect(validator(number)).to.include(error);
    });
}
describe('A Validator', function() {
    it('will return no errors for valid numbers', function() {
        expect(validator(7)).to.be.empty;
    });

    describe('will include error.nonpositive for not strictly positive numbers:', function() {
        expectedToIncludeErrorWhenInvalid(0, 'error.nonpositive');
        expectedToIncludeErrorWhenInvalid(-2, 'error.nonpositive');
    });

    describe('will include error.three for divisible by 3 numbers:', function() {
        expectedToIncludeErrorWhenInvalid(3, 'error.three');
        expectedToIncludeErrorWhenInvalid(15, 'error.three');
    });

    describe('will return error.five for divisible by 5 numbers:', function() {
        expectedToIncludeErrorWhenInvalid(5, 'error.five');
        expectedToIncludeErrorWhenInvalid(15, 'error.five');
    });
});
