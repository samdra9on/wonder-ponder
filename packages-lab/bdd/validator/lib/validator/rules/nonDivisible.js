module.exports = function makeNonDivisibleValidationRule(divisor, error) {
    return function nonDivisibleValidationRule(n, result) {
        if (n % divisor === 0) {
            result.push(error);
        }
    };
};
