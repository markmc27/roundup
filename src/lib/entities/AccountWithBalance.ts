import BaseEntity from './BaseEntity';
import MonetaryAmount from './MonetaryAmount';

export default class AccountWithBalance extends BaseEntity {
  currentBalance!: MonetaryAmount;

  name!: string;

  defaultCategoryId!: string;

  constructor(init: Partial<AccountWithBalance>) {
    super(init);
    Object.assign(this, init);
  }
}
