const nonPositiveValidationRule = require('./validator/rules/nonPositive');
const nonDivisibleValidationRule = require('./validator/rules/nonDivisible');

const validationRules = [
    nonPositiveValidationRule,
    nonDivisibleValidationRule(3, 'error.three'),
    nonDivisibleValidationRule(5, 'error.five'),
];
module.exports = function validator(n) {
    return validationRules.reduce((result, rule) => {
        rule(n, result);
        return result;
    }, []);
};
