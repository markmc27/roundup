import { And, Then } from "@badeball/cypress-cucumber-preprocessor";

Then("I see my account name {string}", (accountName: string) => {
    cy.contains(accountName);
});

And("I see my account name {string}", (accountName: string) => {
    cy.contains(accountName);
});