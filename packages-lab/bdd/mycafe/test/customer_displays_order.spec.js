const _ = require('lodash');
const chai = require('chai');
const newStorage = require('./support/storageDouble');
const orders = require('./support/examples/orders');
const orderSystemWith = require('../lib/orders');

const { expect } = chai;
chai.use(require('chai-as-promised'));

describe('Customer displays order', function() {
    beforeEach(function() {
        this.newStorage = newStorage();
        this.orderSystem = orderSystemWith(this.newStorage.dao());
    });
    context('Given that the order is empty', function() {
        beforeEach(function() {
            this.order = this.newStorage.alreadyContains(orders.empty());
            this.orderActions = orders.actionsFor(this.order);
            this.result = this.orderSystem.display(this.order.id);
        });
        it('will show no order items', function() {
            return expect(this.result).to.eventually.have.property('items').that.is.empty;
        });
        it('will show 0 as the total price', function() {
            return expect(this.result)
                .to.eventually.have.property('totalPrice')
                .that.is.equal(0);
        });
        it('will only be possible to add a beverage', function() {
            return expect(this.result)
                .to.eventually.have.property('actions')
                .that.is.deep.equal([this.orderActions.appendItem()]);
        });
    });

    function scenarioOrderContainsBeverages(testExample) {
        context(`Given that the order contains beverages ${testExample.title}`, function() {
            beforeEach(function() {
                this.order = this.newStorage.alreadyContains(orders.withItems(testExample.items));
                this.orderActions = orders.actionsFor(this.order);
                this.result = this.orderSystem.display(this.order.id);
            });
            it('will show one item per beverage', function() {
                return expect(this.result)
                    .to.eventually.have.property('items')
                    .that.is.deep.equal(this.order.data);
            });
            it('will show the sum of the unit prices as total price', function() {
                return expect(this.result)
                    .to.eventually.have.property('totalPrice')
                    .that.is.equal(testExample.expectedTotalPrice);
            });
            it('will be possible to place the order', function() {
                return expect(this.result)
                    .to.eventually.have.property('actions')
                    .that.deep.include(this.orderActions.place());
            });
            it('will be possible to add a beverage', function() {
                return expect(this.result)
                    .to.eventually.have.property('actions')
                    .that.deep.include(this.orderActions.appendItem());
            });

            _.map(testExample.items, (item, index) => {
                it('will be possible to remove a beverage', function() {
                    return expect(this.result)
                        .to.eventually.have.property('actions')
                        .that.deep.include(this.orderActions.removeItem(index));
                });

                it('will be possible to change the quantity of a beverage', function() {
                    return expect(this.result)
                        .to.eventually.have.property('actions')
                        .that.deep.include(this.orderActions.editItemQuantity(index));
                });
            });
        });
    }

    [
        {
            title: '1 Expresso and 2 Mocaccino',
            items: [{ beverage: 'espresso', quantity: 1 }, { beverage: 'mocaccino', quantity: 2 }],
            expectedTotalPrice: 6.1,
        },
        {
            title: '1 Mocaccino, 2 espressos, and 1 cappuccino',
            items: [
                {
                    beverage: 'mocaccino',
                    quantity: 1,
                },
                {
                    beverage: 'espresso',
                    quantity: 2,
                },
                {
                    beverage: 'cappuccino',
                    quantity: 1,
                },
            ],
            expectedTotalPrice: 7.3,
        },
    ].forEach(scenarioOrderContainsBeverages);

    context('Given that the order has pending messages', function() {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
});
