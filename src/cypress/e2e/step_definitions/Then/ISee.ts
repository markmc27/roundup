import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see {string}', (expected: string) => {
  cy.contains(expected, { timeout: 3000 });
});
