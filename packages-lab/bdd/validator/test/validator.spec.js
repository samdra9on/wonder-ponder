const chai = require('chai');
const { expect } = chai;
const factoryWithConfiguration = require('../lib/factory');

describe('A validation', function() {
    let validator;
    let configuration;

    context('using the default validation rules:', function() {
        beforeEach(function() {
            configuration = function(...args) {
                configuration.callCount += 1;
                configuration.args = args;
                return [
                    { type: 'nonPositive' },
                    { type: 'nonDivisible', options: { divisor: 3, error: 'error.three' } },
                    { type: 'nonDivisible', options: { divisor: 5, error: 'error.five' } },
                ];
            };
            configuration.callCount = 0;
            const newValidator = factoryWithConfiguration(configuration);
            validator = newValidator('default');
        });

        it('will access the configuration to get the validation rules', function() {
            expect(configuration.callCount).to.be.equal(1);
            expect(configuration.args).to.be.deep.equal(['default']);
        });

        it('for valid numbers, will return no errors', function() {
            expect(validator(7)).to.be.empty;
        });

        context('for not strictly positive numbers:', function() {
            it('like 0, will include error.nonpositive', function() {
                expect(validator(0)).to.include('error.nonpositive');
            });
            it('like -2, will include error.nonpositive', function() {
                expect(validator(-2)).to.include('error.nonpositive');
            });
        });

        context('for numbers divisible by 3:', function() {
            it('like 3, will include error.three', function() {
                expect(validator(3)).to.include('error.three');
            });
            it('like 15, will include error.three', function() {
                expect(validator(15)).to.include('error.three');
            });
        });

        context('for numbers divisible by 5:', function() {
            it('like 5, will include error.five', function() {
                expect(validator(5)).to.include('error.five');
            });
            it('like 15, will include error.fove', function() {
                expect(validator(15)).to.include('error.five');
            });
        });
    });

    context('using the alternative validation rules:', function() {
        beforeEach(function() {
            configuration = function(...args) {
                configuration.callCount += 1;
                configuration.args = args;
                return [
                    { type: 'nonPositive' },
                    { type: 'nonDivisible', options: { divisor: 11, error: 'error.eleven' } },
                ];
            };
            configuration.callCount = 0;
            const newValidator = factoryWithConfiguration(configuration);
            validator = newValidator('alternative');
        });

        it('will access the configuration to get the validation rules', function() {
            expect(configuration.callCount).to.be.equal(1);
            expect(configuration.args).to.be.deep.equal(['alternative']);
        });

        it('for valid numbers, will return no errors', function() {
            expect(validator(7)).to.be.empty;
        });

        context('for not strictly positive numbers:', function() {
            it('like 0, will include error.nonpositive', function() {
                expect(validator(0)).to.include('error.nonpositive');
            });
            it('like -2, will include error.nonpositive', function() {
                expect(validator(-2)).to.include('error.nonpositive');
            });
        });

        context('for numbers divisible by 11:', function() {
            it('like 11, will include error.eleven', function() {
                expect(validator(11)).to.include('error.eleven');
            });
            it('like 22, will include error.eleven', function() {
                expect(validator(22)).to.include('error.eleven');
            });
        });
    });
});
