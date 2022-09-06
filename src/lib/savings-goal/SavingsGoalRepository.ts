import MonetaryAmount from '../entities/MonetaryAmount';
import SavingsGoal from '../entities/SavingsGoal';
import ISavingsGoalClient from './ISavingsGoalClient';
import ISavingsGoalRepository from './ISavingsGoalRepository';

export default class SavingsGoalRepository implements ISavingsGoalRepository {
  private client: ISavingsGoalClient;

  constructor(client: ISavingsGoalClient) {
    this.client = client;
  }

  public async retrieveSavingsGoals(accountId: string): Promise<SavingsGoal[]> {
    const clientResponse = await this.client.getSavingsGoals(accountId);

    return clientResponse.savingsGoals.map((savingsGoal) => {
      return new SavingsGoal({
        id: savingsGoal.id,
        name: savingsGoal.name,
        totalSaved: new MonetaryAmount({
          currency: savingsGoal.totalSavedCurrency,
          minorUnits: savingsGoal.totalSavedAmount,
        }),
      });
    });
  }
}
