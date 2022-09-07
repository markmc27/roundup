Feature: Transfer round-up to savings goal
    In order to reach my savings goal target amount
    As a customer
    I want to transfer my weekly round-up to my savings goal

    Scenario: User transfers to their only savings goal
    Given I visit the site 
    When I action the transfer 
    Then I see my balance of "£997.96"
    And I see my savings goal balance of "£3.27"