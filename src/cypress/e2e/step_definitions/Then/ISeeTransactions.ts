import { DataTable, Then } from '@badeball/cypress-cucumber-preprocessor';

Then(
  'I see {int} transactions from the selected week',
  (transactionLength: number, table: DataTable) => {
    cy.get('[data-testid="transaction"]').should(
      'have.length',
      transactionLength
    );

    table.hashes().forEach((transaction) => {
      console.log(transaction);
      cy.contains(transaction.TransactionParty);
      cy.contains(transaction.Amount);
      cy.contains(transaction.RoundUp);
    });
  }
);
