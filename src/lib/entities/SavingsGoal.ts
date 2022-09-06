import BaseEntity from './BaseEntity';
import MonetaryAmount from './MonetaryAmount';

export default class SavingsGoal extends BaseEntity {
  name!: string;

  totalSaved!: MonetaryAmount;

  constructor(init: Partial<SavingsGoal>) {
    super(init);
    Object.assign(this, init);
  }
}
