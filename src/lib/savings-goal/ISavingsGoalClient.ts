export interface SavingsGoalResponse {
  savingsGoals: {
    id: string;
    name: string;
    totalSavedAmount: number;
    totalSavedCurrency: string;
  }[];
}

export interface CreateSavingsGoalResponse {
  savingsGoalUid: string;
  success: boolean;
  errors: string[];
}

export interface AddMoneyToSavingsGoalResponse {
  transferUid: string;
  success: boolean;
  errors: string[];
}

export default interface ISavingsGoalClient {
  getSavingsGoals(accountId: string): Promise<SavingsGoalResponse>;
  createSavingsGoal(
    accountId: string,
    name: string,
    currency: string
  ): Promise<CreateSavingsGoalResponse>;
  addMoneyToSavingsGoal(
    accountId: string,
    savingGoalId: string,
    transferId: string,
    amountMinorUnits: number,
    currency: string
  ): Promise<AddMoneyToSavingsGoalResponse>;
}
