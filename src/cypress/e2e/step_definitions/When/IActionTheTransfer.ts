import { When } from '@badeball/cypress-cucumber-preprocessor';

When(`I action the transfer`, () => {
  cy.intercept('PUT', '/api/transferToSavingsGoal').as('transferToSavingsGoal');
  cy.intercept('GET', '/api/accountInformation').as('accountInformation');
  cy.intercept('GET', '/api/savingsGoals').as('savingsGoals');
  cy.get('[data-testid="round-up-button"]').click();
});
