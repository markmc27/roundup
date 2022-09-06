Feature: Transfer round-up to savings goal
    In order to reach my savings goal target amount
    As a customer
    I want to transfer my weekly round-up to my savings goal

    @focus
    Scenario: User transfers to their only savings goal
    Given I visit the site 
    When I action the transfer 
    Then the round-up amount of "£2.04" is taken from my balance
    And I see my balance of "£997.96"
    And I my "future adventures" savings goal balance of "£2.27"