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


    Scenario: Non empty order
        Given that the order contains "1" "Espresso"
        And that the order contains "2" "Mocaccino"
        When the customer displays the order
        Then the order will show "1" "Espresso"
        And the order will show "2" "Mocaccino"
        And "6.10" will be shown as total price
        And there will be possible to "place order"
        And there will be possible to "add beverage"
        And there will be possible to "edit item quantity" for item "1"
        And there will be possible to "remove item" from item "1"
        And there will be possible to "edit item quantity" for item "2"
        And there will be possible to "remove item" from item "2"