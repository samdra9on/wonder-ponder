const _ = require('lodash');
const { Given, When, Then } = require('cucumber');
const chai = require('chai');
const orders = require('../support/examples/orders');
const { expect } = chai;
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

When(/^the customer displays the order$/, function() {
    this.result = this.orderSystem.display(this.order.id);
});

Then(/^"([^"]*)" will be shown as total price$/, function(expectedTotoalPrice) {
    return expect(this.result)
        .to.eventually.have.property('totalPrice')
        .that.is.equal(Number(expectedTotoalPrice));
});

Given('that the order contains:', function(orderItemExamples) {
    this.order = this.orderStorage.alreadyContains(orders.withItems(orderItemExamples));
    this.messages = this.messageStorage.alreadyContains({
        id: this.order.id,
        data: [],
    });
    this.messageStorage.updateWillNotFail();
});

Then('the following order items are shown:', function(orderItemExamples) {
    return expect(this.result)
        .to.eventually.have.property('items')
        .that.is.deep.equal(orders.items(orderItemExamples));
});

Then('there will be possible to:', function(actionExamples) {
    const expectedActions = orders.actionsForOrderFrom(this.order, actionExamples);
    return expect(this.result)
        .to.eventually.have.property('actions')
        .that.have.length(expectedActions.length)
        .and.that.deep.include.members(expectedActions);
});
