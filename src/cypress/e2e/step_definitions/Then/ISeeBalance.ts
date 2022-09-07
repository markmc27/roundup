import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see my balance of {string}', (balance: string) => {
  cy.contains(balance, { timeout: 3000 });
});
