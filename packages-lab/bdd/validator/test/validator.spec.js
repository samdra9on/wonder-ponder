const validator = require('../lib/validator');
const { expect } = require('chai');

describe('A Validator', () => {
    it('will return no errors for valid numbers', () => {
        expect(validator(3)).to.be.empty; // eslint-disable-line no-unused-expressions
    });

    describe('will return error.nonpositive for not strictly positive numbers', () => {
        it('like 0', () => {
            expect(validator(0)).be.deep.equal(['error.nonpositive']);
        });

        it('like -2', () => {
            expect(validator(-2)).be.deep.equal(['error.nonpositive']);
        });
    });
});
