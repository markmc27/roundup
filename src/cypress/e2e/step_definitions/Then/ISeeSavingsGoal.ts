import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see {string} savings goal', (goalName: string) => {
  cy.get('[data-testid="savings-goal"]').should('contain', goalName);
});
