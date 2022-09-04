Feature: View account information
    
    In order to make an informed decision about my weekly savings amount
    As a customer
    I want to review my transactions, savings goals, and proposed round-up for given week

    @focus
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