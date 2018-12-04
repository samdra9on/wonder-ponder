const newStorage = require('./storageDouble');
const orderSystemWith = require('../../lib/orders');

module.exports = function() {
    this.orderStorage = newStorage();
    this.messageStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao(), this.messageStorage.dao());
};
