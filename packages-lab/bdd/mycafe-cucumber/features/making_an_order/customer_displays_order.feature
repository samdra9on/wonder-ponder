Feature: Customer displays order

    Part of the "Making an Order" epic

    As a Customer
    I want to display the order
    in order to review the contents of my order and its price easily

    Scenario: Order is empty
        Given that the order contains:
            | beverage | quantity |
        When the customer displays the order
        Then the following order items are shown:
            | beverage | quantity |
        And "0" will be shown as total price
        And there will be possible to:
            | action      | for item |
            | append item |          |


    Scenario: Non empty order
        Given that the order contains:
            | beverage  | quantity |
            | Espresso  | 1        |
            | Mocaccino | 2        |
        When the customer displays the order
        Then the following order items are shown:
            | beverage  | quantity |
            | Espresso  | 1        |
            | Mocaccino | 2        |
        And "6.10" will be shown as total price
        And there will be possible to:
            | action             | for item |
            | place order        |          |
            | append item        |          |
            | edit item quantity | 1        |
            | remove item        | 1        |
            | edit item quantity | 2        |
            | remove item        | 2        |