import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I am viewing {string}', (element: string) => {
  cy.contains(element, { timeout: 3000 }).scrollIntoView();
});
