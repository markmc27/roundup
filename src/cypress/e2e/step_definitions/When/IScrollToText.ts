import { When } from '@badeball/cypress-cucumber-preprocessor';

When(`I scroll to {string}`, (element: string) => {
  cy.contains(element).scrollIntoView();
});
