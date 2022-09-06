import TestAccountClient from '../account/TestAccountClient';
import ISavingsGoalClient, {
  AddMoneyToSavingsGoalResponse,
  CreateSavingsGoalResponse,
  SavingsGoalResponse,
} from './ISavingsGoalClient';

export default class TestSavingsGoalClient implements ISavingsGoalClient {
  private static savingsTotal: number = 123;

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
    console.log('getSavingsGoals');

    return new Promise((resolve) => {
      return resolve({
        savingsGoals: [
          {
            id: 'ssssssss-ssss-4sss-ssss-ssssssssssss',
            name: 'Future adventures',
            totalSavedAmount: TestSavingsGoalClient.savingsTotal,
            totalSavedCurrency: 'GBP',
          },
          {
            id: '456',
            name: 'Test Savings Goal 2',
            totalSavedAmount: TestSavingsGoalClient.savingsTotal,
            totalSavedCurrency: 'GBP',
          },
        ],
      } as SavingsGoalResponse);
    });
  }

  addMoneyToSavingsGoal(
    accountId: string,
    savingGoalId: string,
    transferId: string,
    amountMinorUnits: number,
    currency: string
  ): Promise<AddMoneyToSavingsGoalResponse> {
    console.log(
      'previous',
      TestAccountClient.balance,
      TestSavingsGoalClient.savingsTotal
    );

    TestAccountClient.balance -= amountMinorUnits;
    TestSavingsGoalClient.savingsTotal += amountMinorUnits;

    console.log(
      'now',
      TestAccountClient.balance,
      TestSavingsGoalClient.savingsTotal
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          transferUid: transferId,
          success: true,
          errors: [],
        } as AddMoneyToSavingsGoalResponse);
      }, 1000);
    });
  }
}
