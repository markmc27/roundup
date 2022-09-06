import { render } from '@testing-library/react';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import AccountInformation from './AccountInformation';

describe('Account information', () => {
  it('should contain account name', () => {
    const accountName = 'Personal';
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <AccountInformation
        accountName={accountName}
        accountBalance={accountBalance}
      />
    );

    expect(getByText(accountName)).toBeVisible();
  });

  it('should show account balance', () => {
    const accountName = 'Personal';
    const accountBalance = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <AccountInformation
        accountName={accountName}
        accountBalance={accountBalance}
      />
    );

    expect(getByText('£10.00')).toBeVisible();
  });
});
