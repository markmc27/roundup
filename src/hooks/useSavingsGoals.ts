import { useQuery } from '@tanstack/react-query';
import QueryKeys from './QueryKeys';
import SavingsGoalRepositoryFactory from '../lib/savings-goal/SavingsGoalsRepositoryFactory';
import SavingsGoal from '../lib/entities/SavingsGoal';

const useSavingsGoals = (initialData: SavingsGoal[], accountId: string) =>
  useQuery(
    [QueryKeys.SavingsGoals],
    async () => {
      const savingsGoalsRepo =
        new SavingsGoalRepositoryFactory().getSavingsGoalRepo();

      const savingsGoals = await savingsGoalsRepo.retrieveSavingsGoals(
        accountId
      );

      return savingsGoals;
    },
    {
      initialData,
    }
  );

export default useSavingsGoals;
