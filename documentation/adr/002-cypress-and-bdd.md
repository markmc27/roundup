# 1. Next JS

Date: 4 Sep 2022

## Status

Proposed

## Context

To automate testing of the BDD acceptance criteria, we need a tool that supports the test automation.


## Decision
 
We can utilise cypress and the cucumber preprocessor plugin to support gherkin syntax in the feature files. This will allow us to automate the testing of the BDD features and scenarios. 


## Consequences

Dependency upon Cypress and the @badeball/cypress-cucumber-preprocessor packages. Both are well supported and popular packages. 



