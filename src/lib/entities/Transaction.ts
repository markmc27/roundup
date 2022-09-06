import BaseEntity from './BaseEntity';
import MonetaryAmount from './MonetaryAmount';

export default class Transaction extends BaseEntity {
  counterParty!: string;

  amount!: MonetaryAmount;

  direction!: 'IN' | 'OUT';

  transactionDate!: string;

  reference!: string;

  constructor(init: Partial<Transaction>) {
    super(init);
    Object.assign(this, init);
  }
}
