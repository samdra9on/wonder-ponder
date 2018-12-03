const chai = require('chai');
const newStorage = require('./support/storageDouble');
const beverages = require('./support/examples/beverages');
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

    context('Given that the order contains beverages', function() {
        beforeEach(function() {
            this.order = this.newStorage.alreadyContains(
                orders.withItems([
                    { beverage: 'expresso', quantity: 1 },
                    { beverage: 'mocaccino', quantity: 2 },
                ]),
            );
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
                .that.is.equal(6.1);
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
        it('will be possible to remove a beverage', function() {
            return expect(this.result)
                .to.eventually.have.property('actions')
                .that.deep.include(this.orderActions.removeItem(0))
                .and.that.deep.include(this.orderActions.removeItem(1));
        });
        it('will be possible to change the quantity of a beverage', function() {
            return expect(this.result)
                .to.eventually.have.property('actions')
                .that.deep.include(this.orderActions.editItemQuantity(0))
                .and.that.deep.include(this.orderActions.editItemQuantity(1));
        });
    });

    context('Given that the order has pending messages', function() {
        it('will show the pending messages');
        it('there will be no more pending messages');
    });
});
