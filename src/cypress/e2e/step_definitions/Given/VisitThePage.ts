import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given(`I visit the site`, () => {
    cy.visit('localhost:3000');
});