import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given(`I visit the starling page`, () => {
    cy.visit('https://starlingbank.com');
});