const assert = require('assert');
const { Before, Given, When, Then } = require('cucumber');
const Calculator = require('../../lib/calculator');

let calculator;
Given('the numbers {int} and {int}', (x, y) => {
    calculator = new Calculator(x, y);
});
When('they are added together', () => {
    calculator.add();
});
Then('should the result be {int}', expected => {
    assert.equal(calculator.getResult(), expected);
});
