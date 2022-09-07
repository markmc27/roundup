import SavingsGoal from '../entities/SavingsGoal';

export default interface ISavingsGoalRepository {
  retrieveSavingsGoals(accountId: string): Promise<SavingsGoal[]>;
  transferToSavingsGoals(
    accountId: string,
    savingGoalId: string,
    amountMinorUnits: number,
    currency: string
  ): Promise<boolean>;
}
