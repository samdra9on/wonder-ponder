const { setWorldConstructor } = require('cucumber');
const newStorage = require('./storageDouble');
const orderSystemWith = require('../../lib/orders');

function CustomWorld() {
    this.orderStorage = newStorage();
    this.messageStorage = newStorage();
    this.orderSystem = orderSystemWith(this.orderStorage.dao(), this.messageStorage.dao());
}

setWorldConstructor(CustomWorld);
