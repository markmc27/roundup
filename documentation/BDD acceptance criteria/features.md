Feature: See my account information
    In order to make an informed decision about my weekly savings amount
    As a customer
    I want to review my transactions, savings goals, and proposed round-up for given week

    Scenario: User sees account information
    Given I visit the site
    Then I see my account name "Personal"
    And I see "Your Balance"
    And I see "Round-up start date" 
    And I see "Round-up end date"
    And I see "Transactions" 
    And I see "Savings goals"
    And I see "Round-up amount" 
    And I see "Transfer to savings goal"

    Scenario: User reviews balance
    Given I visit the site
    When I scroll to "Your balance"
    Then I see my balance of "£1000.00"

    Scenario: Week defaults to most recent 7 days
    Given I am viewing round-up date
    Then the end date is set to today
    And the start date is set to 7 days earlier than today at midnight

    Scenario: User reviews transactions
    Given I am viewing "Transactions"
    Then I see 4 transactions from the selected week
    |TransactionParty |Amount  |Round-up |
    |Mickey Mouse     |£35.64  |£0.36    |
    |Faster payment   |£100.00 |£0.00    |
    |Tesco            |£12.29  |£0.71    |
    |Shell            |£291.03 |£0.97    |

    Scenario: User has no savings goals
    Given I am viewing "Savings goals"
    And I currently have 0 savings goals
    Then I can create a new saving goal with a name "future adventures"

    Scenario: User has a savings goal
    Given I am viewing savings goals
    Then I see "future adventures" savings goal

    Scenario: User has multiple savings goals
    Given I am viewing savings goals
    And I currently have 2 savings goals
    Then I can choose any of my goals
    |GoalName |
    |Future Adventures |
    |Rainy Days        |
    And Future Adventures is chosen by default

    Scenario: User reviews round-up total
    Given I am viewing "Round-up amount"
    Then I see a total round-up amount of £2.04 

Feature: User changes week end date
    In order to intermittently send my weekly round-ups to the saving goal
    As a customer
    I want to be able to change the week's end date

    Scenario: User selects a different end date
    Given I am viewing "Round-up end date"
    When I choose an end date of 2022-08-21
    Then the start date updates to 2022-08-14 00:00.00

    Scenario: Transactions update after date change
    Given I am viewing "Transactions" 
    When I update the end date to 2022-08-21
    Then I see 3 transactions from the selected week
    |TransactionParty |Amount  |Round-up |
    |Donald Duck      |£51.25  |£0.75    |
    |McDonald's       |£13.67  |£0.33    |
    |Faster payment   |£150.00 |£0.00    |
    |Shell            |£100.01 |£0.99    |
    And I see a total round-up amount of £1.87

    Scenario: User selects end date in the future
    Given I am viewing "Round-up end date"
    When I select an end date in the future
    Then I see "The end date cannot be in the future"
    And I see 0 transactions from the selected week
    And I cannot move the round-up to a savings goal

Feature: Transfer round-up to savings goal
    In order to reach my savings goal target amount
    As a customer
    I want to transfer my weekly round-up to my savings goal

    Scenario: User transfers to their only savings goal
    Given I see my balance of "£1000.00"
    When I choose an end date of 2022-08-21
    And I choose the "future adventures" savings goal 
    And I see my "future adventures" savings goal balance of "£0.00"
    When I action the transfer 
    Then the round-up amount of £1.87 is taken from my balance
    And I see my balance of "£998.13"
    And I my "future adventures" savings goal balance of "£1.87"

    Scenario: Not enough funds in account to transfer
    Given I see my balance of "£1.00"
    And I see a total round-up amount of £1.87
    Then I cannot action the transfer
    And I see "Not enough funds to make the transfer." 