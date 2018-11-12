// Dynamically Generating Tests
const assert = require('assert');

function add(...args) {
    return args.reduce((prev, curr) => prev + curr, 0);
}

describe('add()', () => {
    const tests = [
        {
            args: [1, 2],
            expected: 3,
        },
        {
            args: [1, 2, 3],
            expected: 6,
        },
        {
            args: [1, 2, 3, 4],
            expected: 10,
        },
    ];

    tests.forEach(test => {
        it(`correctly adds ${test.args.length} args`, () => {
            const res = add(...test.args);
            assert.equal(res, test.expected);
        });
    });
});
