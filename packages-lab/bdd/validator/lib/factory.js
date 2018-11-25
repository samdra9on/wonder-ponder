const validatorWith = require('./validator');
const nonPositiveValidationRule = require('./validator/rules/nonPositive');
const nonDivisibleValidationRule = require('./validator/rules/nonDivisible');

module.exports = function factory(findConfiguration) {
    findConfiguration('default');
    return function newValidator() {
        return validatorWith([
            nonPositiveValidationRule,
            nonDivisibleValidationRule(3, 'error.three'),
            nonDivisibleValidationRule(5, 'error.five'),
        ]);
    };
};
