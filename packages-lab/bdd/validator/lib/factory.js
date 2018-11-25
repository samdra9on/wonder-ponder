const validatorWith = require('./validator');
const nonPositiveValidationRule = require('./validator/rules/nonPositive');
const nonDivisibleValidationRule = require('./validator/rules/nonDivisible');

module.exports = function factory(findConfiguration) {
    return function newValidator(configurationName) {
        const configuration = findConfiguration(configurationName);
        const rules = configuration.map(({ type, options }) => {
            if (type === 'nonPositive') {
                return nonPositiveValidationRule;
            } else if (type === 'nonDivisible') {
                return nonDivisibleValidationRule(options.divisor, options.error);
            }
            return null;
        });
        return validatorWith(rules);
    };
};
