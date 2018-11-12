const Browser = require('zombie');

const World = function(callback) {
    this.browser = new Browser();
    this.visit = function(url, callback) {
        this.browser.visit(url, callback);
    };
    callback(this);
};
exports.World = World;
