import MonetaryAmount from '../lib/entities/MonetaryAmount';
import formatMonetaryAmount from './formatMonetaryAmountToString';

describe('formatMonetaryAmount', () => {
  test.each([
    [
      new MonetaryAmount({
        currency: 'GBP',
        minorUnits: 100,
      }),
      '£1.00',
    ],
    [
      new MonetaryAmount({
        currency: 'GBP',
        minorUnits: 414,
      }),
      '£4.14',
    ],
    [
      new MonetaryAmount({
        currency: 'GBP',
        minorUnits: 12,
      }),
      '£0.12',
    ],
  ])(
    'given %p should return formatted string of %p',
    (monetaryAmount: MonetaryAmount, expected) => {
      const formattedAmount = formatMonetaryAmount(monetaryAmount);

      expect(formattedAmount).toBe(expected);
    }
  );
});
