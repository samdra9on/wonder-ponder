Feature: Customer displays order

    Part of the "Making an Order" epic

    As a Customer
    I want to display the order
    in order to review the contents of my order and its price easily

    Scenario: Order is empty
        Given that the order is empty
        When the customer displays the order
        Then no order items will be shown
        And "0" will be shown as total price
        And there will only be possible to add a beverage