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
