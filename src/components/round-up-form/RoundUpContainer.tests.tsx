import { render } from '@testing-library/react';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import Transaction from '../../lib/entities/Transaction';
import RoundUpContainer from './RoundUpContainer';

describe('Round-up form', () => {
  it('should contain account name', () => {
    const accountName = 'Personal';
    const transactions: Transaction[] = [];
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <RoundUpContainer
        accountName={accountName}
        accountBalance={accountBalance}
        transactions={transactions}
      />
    );

    expect(getByText(accountName)).toBeVisible();
  });

  it('should contain transactions', () => {
    const accountName = 'Personal';
    const transactions = [
      new Transaction({
        counterParty: 'Mickey Mouse',
        amount: new MonetaryAmount({
          minorUnits: 100,
          currency: 'GBP',
        }),
      }),
    ];
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <RoundUpContainer
        accountName={accountName}
        accountBalance={accountBalance}
        transactions={transactions}
      />
    );

    expect(getByText('Mickey Mouse')).toBeVisible();
    expect(getByText('£1.00')).toBeVisible();
  });

  it('should handle an empty transaction list', () => {
    const accountName = 'Personal';
    const transactions: Transaction[] = [];
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <RoundUpContainer
        accountName={accountName}
        accountBalance={accountBalance}
        transactions={transactions}
      />
    );

    expect(getByText(accountName)).toBeVisible();
  });

  it('should show account balance', () => {
    const accountName = 'Personal';
    const transactions: Transaction[] = [];
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <RoundUpContainer
        accountName={accountName}
        accountBalance={accountBalance}
        transactions={transactions}
      />
    );

    expect(getByText('Balance: £10.00')).toBeVisible();
  });
});
