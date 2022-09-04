import { render } from '@testing-library/react';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import Transaction from '../../lib/entities/Transaction';
import TransactionList from './TransactionList';

describe('Transaction list', () => {
  it('should list the expected number of transactions', () => {
    const transactions = [
      new Transaction({
        counterParty: 'Mickey Mouse',
        amount: new MonetaryAmount({
          minorUnits: 100,
          currency: 'GBP',
        }),
      }),
    ];
    const { getByText } = render(
      <TransactionList transactions={transactions} />
    );

    transactions.forEach((transaction) => {
      expect(getByText(transaction.counterParty)).toBeVisible();
    });
  });

  it('should format transaction amounts', () => {
    const transactions = [
      new Transaction({
        counterParty: 'Mickey Mouse',
        amount: new MonetaryAmount({
          minorUnits: 100,
          currency: 'GBP',
        }),
      }),
    ];

    const { getByText } = render(
      <TransactionList transactions={transactions} />
    );

    expect(getByText('£1.00')).toBeVisible();
  });
});
