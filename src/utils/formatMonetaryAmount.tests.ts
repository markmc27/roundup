import MonetaryAmount from '../lib/entities/MonetaryAmount';
import formatMonetaryAmount from './formatMonetaryAmountToString';

describe('formatMonetaryAmount', () => {
  test.each([
    [100, 'GBP', '£1.00'],
    [414, 'GBP', '£4.14'],
    [12, 'GBP', '£0.12'],
  ])(
    'given %p should return formatted string of %p',
    (amount: number, currency: string, expected: string) => {
      const formattedAmount = formatMonetaryAmount(amount, currency);

      expect(formattedAmount).toBe(expected);
    }
  );
});
