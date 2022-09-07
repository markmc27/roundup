import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see my savings goal balance of {string}', (total: string) => {
  cy.wait('@transferToSavingsGoal');
  cy.wait('@accountInformation');
  cy.wait('@savingsGoals');
  cy.get('[data-testid="saved-total"]').should('contain', total);
});
