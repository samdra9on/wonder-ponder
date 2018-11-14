module.exports = function validator(n) {
    if (n <= 0) {
        return ['error.nonpositive'];
    }
    return [];
};
