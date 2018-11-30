const chai = require('chai');
const sinon = require('sinon');
const orderSystemWith = require('../lib/orders');

const { expect } = chai;

describe('Customer displays order', function() {
    beforeEach(function() {
        this.orderDAO = {
            byId: sinon.stub(),
        };
        this.orderSystem = orderSystemWith(this.orderDAO);
    });
    context('Given that the order is empty', function() {
        let orderId;
        beforeEach(function() {
            orderId = 'some empty order id';
            this.orderDAO.byId.withArgs(orderId).callsArgWithAsync(1, null, []);
            this.result = this.orderSystem.display(orderId);
        });
        it('will show no order items', function() {
            this.result.then(result => {
                expect(result).to.have.property('items').that.is.empty;
            });
        });
        it('will show 0 as the total price', function() {
            this.result.then(result => {
                expect(result)
                    .to.have.property('totalPrice')
                    .that.is.equal(0);
            });
        });
        it('will only be possible to add a beverage', function() {
            this.result.then(result => {
                expect(result)
                    .to.have.property('actions')
                    .that.is.deep.equal([
                        {
                            action: 'append-beverage',
                            target: orderId,
                            parameters: {
                                beverageRef: null,
                                quantity: 0,
                            },
                        },
                    ]);
            });
        });
    });

    context('Given that the order contains beverages', function() {
        it('will show one item per beverage');
        it('will show the sum of the unit prices as total price');
        it('will be possible to place the order');
        it('will be possible to add a beverage');
        it('will be possible to remove a beverage');
        it('will be possible to change the quantity of a beverage');
    });

    context('Given that the order has pending messages', function() {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
});
