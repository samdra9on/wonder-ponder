const { Given, When, Then } = require('cucumber');
const { World } = require('../support/world');

new World(world => {
    Given('I am on the {string} github page', (url, callback) => {
        world.visit(url, callback);
    });

    When('I click on the {string} file link', (url, callback) => {
        world.browser.clickLink(url, callback);
    });

    Then('I should see {string}', string => {
        let regExp;
        regExp = new RegExp(string, 'gi');
        if (!world.browser.html().match(regExp)) {
            callback.fail(new Error(`Expected to see ${arg1}`));
        } else {
            callback();
        }
    });
});
