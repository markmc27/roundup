Feature: View account information
    
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
        And I see "Savings goal"
        And I see "Round-up amount" 
        And I see "Transfer to savings goal"

    Scenario: User reviews balance
        Given I visit the site
        When I scroll to "Your balance"
        Then I see my balance of "£1,000.00"

    Scenario: Week defaults to most recent 7 days
        Given I visit the site
        And I am viewing "Round-up start date"
        Then the "end" date is set to "today"
        And the "start" date is set to "7 days earlier than today"

    Scenario: User reviews transactions
        Given I visit the site
        When I scroll to "Transactions"
        Then I see 4 transactions from the selected week
        |TransactionParty |Amount  |RoundUp  |
        |Mickey Mouse     |£35.64  |£0.36    |
        |Faster payment   |£100.00 |£0.00    |
        |Tesco            |£12.29  |£0.71    |
        |Shell            |£291.03 |£0.97    |

    Scenario: User has a savings goal
        Given I visit the site 
        And I am viewing "Savings goal"
        Then I see "Future adventures" savings goal

    Scenario: User reviews round-up total
        Given I visit the site 
        And I am viewing "Round-up amount"
        Then I see a total round-up amount of "£2.04" 