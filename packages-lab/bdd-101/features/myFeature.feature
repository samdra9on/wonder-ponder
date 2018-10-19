Feature: Example feature
As a user of cucumber.js
I want to have documentation on cucumber
So that I can concentrate on building awesome appications

Scenario: Reading documentation
    Given I am on the "http://gitbut.com/cucumber/cucumber-js" github page
    When I click on the "README.md" file link
    Then I should see "Usage"