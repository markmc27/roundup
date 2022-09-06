import ISavingsGoalClient, { SavingsGoalResponse } from './ISavingsGoalClient';

export default class TestSavingsGoalClient implements ISavingsGoalClient {
  public async getSavingsGoals(
    accountId: string
  ): Promise<SavingsGoalResponse> {
    return new Promise((resolve) => {
      return resolve({
        savingsGoals: [
          {
            id: '123',
            name: 'Test Savings Goal',
            totalSavedAmount: 123,
            totalSavedCurrency: 'GBP',
          },
          {
            id: '456',
            name: 'Test Savings Goal 2',
            totalSavedAmount: 456,
            totalSavedCurrency: 'GBP',
          },
        ],
      } as SavingsGoalResponse);
    });
  }
}
