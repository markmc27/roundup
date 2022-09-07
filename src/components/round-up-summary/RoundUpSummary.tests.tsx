import { render } from '@testing-library/react';
import MonetaryAmount from '../../lib/entities/MonetaryAmount';
import SavingsGoal from '../../lib/entities/SavingsGoal';
import RoundUpSummary from './RoundUpSummary';

describe('Round-up form', () => {
  it('should show round up start and end date', () => {
    const totalSaved = new MonetaryAmount({
      currency: 'GBP',
      minorUnits: 1000,
    });

    const { getByText } = render(
      <RoundUpSummary
        savingsGoal={new SavingsGoal({ totalSaved })}
        roundUpAmountMinorUnits={0}
        accountCurrency="GBP"
        onTransferToSavingsGoal={() => {}}
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
        isLoading={false}
      />
    );

    expect(getByText('2020-01-01')).toBeVisible();
    expect(getByText('2021-01-01')).toBeVisible();
  });

  it('should call onTransferToSavingsGoal when round up button is clicked', () => {
    const onTransferToSavingsGoal = jest.fn();

    const { getByTestId } = render(
      <RoundUpSummary
        defaultEndDate="2021-01-01"
        defaultStartDate="2020-01-01"
        onTransferToSavingsGoal={onTransferToSavingsGoal}
        savingsGoal={
          new SavingsGoal({
            totalSaved: new MonetaryAmount({
              currency: 'GBP',
              minorUnits: 1000,
            }),
          })
        }
        roundUpAmountMinorUnits={0}
        accountCurrency="GBP"
        isLoading={false}
      />
    );

    const roundUpButton = getByTestId('round-up-button');
    roundUpButton.click();

    expect(onTransferToSavingsGoal).toHaveBeenCalled();
  });
});
