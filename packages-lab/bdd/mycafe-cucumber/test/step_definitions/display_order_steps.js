const _ = require('lodash');
const { Given, When, Then } = require('cucumber');
const chai = require('chai');
const orders = require('../support/examples/orders');
const { expect } = chai;
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

Given('that the order is empty', function() {
    this.order = this.orderStorage.alreadyContains(orders.empty());
    this.messages = this.messageStorage.alreadyContains({
        id: this.order.id,
        data: [],
    });
    this.messageStorage.updateWillNotFail();
});

When(/^the customer displays the order$/, function() {
    this.result = this.orderSystem.display(this.order.id);
});

Then(/^no order items will be shown$/, function() {
    return expect(this.result).to.eventually.have.property('items').that.is.empty;
});

Then(/^"([^"]*)" will be shown as total price$/, function(expectedTotoalPrice) {
    return expect(this.result)
        .to.eventually.have.property('totalPrice')
        .that.is.equal(Number(expectedTotoalPrice));
});

Then(/^there will only be possible to add a beverage$/, function() {
    return expect(this.result)
        .to.eventually.have.property('actions')
        .that.is.deep.equal([orders.actionsFor(this.order).appendItem()]);
});

Given('that the order contains {string} {string}', function(strQuantity, name) {
    const quantity = Number(strQuantity);
    this.orderItems = _.concat(this.orderItems || [], {
        beverage: _.toLower(name),
        quantity,
    });
    this.order = this.orderStorage.alreadyContains(orders.withItems(this.orderItems));

    this.messages = this.messageStorage.alreadyContains({
        id: this.order.id,
        data: [],
    });
    this.messageStorage.updateWillNotFail();
});

Then('the order will show {string} {string}', function(strQuantity, name) {
    const quantity = Number(strQuantity);
    return expect(this.result)
        .to.eventually.have.property('items')
        .that.is.deep.include(
            ...orders.withItems([
                {
                    beverage: _.toLower(name),
                    quantity,
                },
            ]).data,
        );
});

Then('there will be possible to {string}', function(legibleAction) {
    if (legibleAction === 'place order') {
        return expect(this.result)
            .to.eventually.have.property('actions')
            .that.is.deep.include(orders.actionsFor(this.order).place());
    } else if (legibleAction === 'add beverage') {
        return expect(this.result)
            .to.eventually.have.property('actions')
            .that.is.deep.include(orders.actionsFor(this.order).appendItem());
    }
});

Then('there will be possible to {string} for item {string}', function(legibleAction, strIndex) {
    const index = Number(strIndex) - 1;
    if (legibleAction === 'edit item quantity') {
        return expect(this.result)
            .to.eventually.have.property('actions')
            .that.is.deep.include(orders.actionsFor(this.order).editItemQuantity(index));
    }
});

Then('there will be possible to {string} from item {string}', function(legibleAction, strIndex) {
    const index = Number(strIndex) - 1;
    if (legibleAction === 'remove item') {
        return expect(this.result)
            .to.eventually.have.property('actions')
            .that.is.deep.include(orders.actionsFor(this.order).removeItem(index));
    }
});
