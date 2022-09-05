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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
      />
    );

    expect(getByText('Your Balance: £10.00')).toBeVisible();
  });

  it('should show round up start and end date', () => {
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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
      />
    );

    expect(getByText('Round-up start date 2020-01-01')).toBeVisible();
    expect(getByText('Round-up end date 2021-01-01')).toBeVisible();
  });

  it('should show correct round up amount', () => {
    const accountName = 'Personal';
    const transactions: Transaction[] = [
      new Transaction({
        counterParty: 'Mickey Mouse',
        amount: new MonetaryAmount({
          minorUnits: 198,
          currency: 'GBP',
        }),
      }),
      new Transaction({
        counterParty: 'Mickey Mouse',
        amount: new MonetaryAmount({
          minorUnits: 597,
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
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
      />
    );

    expect(getByText('Round-up amount £0.05')).toBeVisible();
  });
});
