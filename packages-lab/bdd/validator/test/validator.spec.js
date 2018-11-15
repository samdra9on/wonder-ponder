const validator = require('../lib/validator');
const { expect } = require('chai');

describe('A Validator', function() {
    it('will return no errors for valid numbers', function() {
        expect(validator(3)).to.be.empty;
    });

    describe('will return error.nonpositive for not strictly positive numbers', function() {
        it('like 0', function() {
            expect(validator(0)).be.deep.equal(['error.nonpositive']);
        });

        it('like -2', function() {
            expect(validator(-2)).be.deep.equal(['error.nonpositive']);
        });
    });
});
