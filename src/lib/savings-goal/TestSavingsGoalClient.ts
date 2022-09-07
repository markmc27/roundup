/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
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
      resolve({
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
      resolve({
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
    TestAccountClient.balance -= amountMinorUnits;
    TestSavingsGoalClient.savingsTotal += amountMinorUnits;

    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            transferUid: transferId,
            success: true,
            errors: [],
          } as AddMoneyToSavingsGoalResponse),
        1000
      );
    });
  }
}
