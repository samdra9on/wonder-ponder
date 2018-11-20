module.exports = function validatorWith(validationRules) {
    return function validator(n) {
        return validationRules.reduce((result, rule) => {
            rule(n, result);
            return result;
        }, []);
    };
};
