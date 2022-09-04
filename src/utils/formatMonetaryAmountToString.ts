import MonetaryAmount from "../lib/entities/MonetaryAmount";

const formatMonetaryAmount = (monetaryAmount: MonetaryAmount): string => {
    var formatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: monetaryAmount.currency,
    });

    return formatter.format(monetaryAmount.minorUnits / 100)
};

export default formatMonetaryAmount;