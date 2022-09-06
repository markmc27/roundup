import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see a total round-up amount of {string}', (amount: string) => {
  cy.get('[data-testid="round-up-amount"]').should('contain', amount);
});
