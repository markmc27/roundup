import MonetaryAmount from '../lib/entities/MonetaryAmount';

const formatMonetaryAmount = (amount: number, currency: string): string => {
  var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency,
  });

  return formatter.format(amount / 100);
};

export default formatMonetaryAmount;
