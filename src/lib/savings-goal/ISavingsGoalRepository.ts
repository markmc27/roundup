import SavingsGoal from '../entities/SavingsGoal';

export default interface ISavingsGoalRepository {
  retrieveSavingsGoals(accountId: string): Promise<SavingsGoal[]>;
}
