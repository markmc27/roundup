import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then('I see Starling in the title', () => {
    cy.title().should('include', 'Starling');
})