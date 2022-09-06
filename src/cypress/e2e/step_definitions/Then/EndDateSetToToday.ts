import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { DateTime } from 'luxon';

const dateTypeMap: { [key: string]: string } = {
  end: 'end-date',
  start: 'start-date',
};

const dateMap: { [key: string]: string } = {
  today: DateTime.local().toISODate(),
  '7 days earlier than today': DateTime.local().minus({ days: 7 }).toISODate(),
};

Then(
  'the {string} date is set to {string}',
  (dateType: string, date: string) => {
    cy.get(`[data-testid="${dateTypeMap[dateType]}"]`).should(
      'have.text',
      dateMap[date]
    );
  }
);
