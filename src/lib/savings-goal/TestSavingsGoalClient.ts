import ISavingsGoalClient, {
  CreateSavingsGoalResponse,
  SavingsGoalResponse,
} from './ISavingsGoalClient';

export default class TestSavingsGoalClient implements ISavingsGoalClient {
  createSavingsGoal(
    accountId: string,
    name: string,
    currency: string
  ): Promise<CreateSavingsGoalResponse> {
    return new Promise((resolve) => {
      return resolve({
        savingsGoalUid: 'ssssssss-ssss-4sss-ssss-ssssssssssss',
        success: true,
        errors: [],
      } as CreateSavingsGoalResponse);
    });
  }

  public async getSavingsGoals(
    accountId: string
  ): Promise<SavingsGoalResponse> {
    return new Promise((resolve) => {
      return resolve({
        savingsGoals: [
          {
            id: 'ssssssss-ssss-4sss-ssss-ssssssssssss',
            name: 'Future adventures',
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
