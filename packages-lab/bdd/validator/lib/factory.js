const validatorWith = require('./validator');
const nonPositiveValidationRule = require('./validator/rules/nonPositive');
const nonDivisibleValidationRule = require('./validator/rules/nonDivisible');

const ruleFactoryMap = {
    nonPositive() {
        return nonPositiveValidationRule;
    },
    nonDivisible(options) {
        return nonDivisibleValidationRule(options.divisor, options.error);
    },
};
function toValidationRule(ruleDescription) {
    return ruleFactoryMap[ruleDescription.type](ruleDescription.options);
}
module.exports = function factory(findConfiguration) {
    return function newValidator(ruleSetName) {
        return validatorWith(findConfiguration(ruleSetName).map(toValidationRule));
    };
};
