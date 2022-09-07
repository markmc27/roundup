import { Guid } from 'guid-typescript';
import MonetaryAmount from '../entities/MonetaryAmount';
import SavingsGoal from '../entities/SavingsGoal';
import ISavingsGoalClient from './ISavingsGoalClient';
import ISavingsGoalRepository from './ISavingsGoalRepository';

export default class SavingsGoalRepository implements ISavingsGoalRepository {
  private client: ISavingsGoalClient;

  constructor(client: ISavingsGoalClient) {
    this.client = client;
  }

  async transferToSavingsGoals(
    accountId: string,
    savingGoalId: string,
    amountMinorUnits: number,
    currency: string
  ): Promise<boolean> {
    const transferId = Guid.create().toString();
    const clientResponse = await this.client.addMoneyToSavingsGoal(
      accountId,
      savingGoalId,
      transferId,
      amountMinorUnits,
      currency
    );

    if (!clientResponse.success) {
      console.error(clientResponse.errors);
    }

    return clientResponse.success;
  }

  public async retrieveSavingsGoals(accountId: string): Promise<SavingsGoal[]> {
    const clientResponse = await this.client.getSavingsGoals(accountId);

    return clientResponse.savingsGoals.map(
      (savingsGoal) =>
        new SavingsGoal({
          id: savingsGoal.id,
          name: savingsGoal.name,
          totalSaved: new MonetaryAmount({
            currency: savingsGoal.totalSavedCurrency,
            minorUnits: savingsGoal.totalSavedAmount,
          }),
        })
    );
  }
}
