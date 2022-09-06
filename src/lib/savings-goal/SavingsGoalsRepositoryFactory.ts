import ISavingsGoalClient from './ISavingsGoalClient';
import ISavingsGoalRepository from './ISavingsGoalRepository';
import SavingsGoalClient from './SavingsGoalClient';
import SavingsGoalRepository from './SavingsGoalRepository';
import TestSavingsGoalClient from './TestSavingsGoalClient';

export default class SavingsGoalRepositoryFactory {
  useTestClient = process.env.NEXT_PUBLIC_TEST_MODE === 'on';

  getSavingsGoalRepo(): ISavingsGoalRepository {
    const client: ISavingsGoalClient = this.useTestClient
      ? new TestSavingsGoalClient()
      : new SavingsGoalClient({
          authToken: process.env.NEXT_PUBLIC_STARLING_TOKEN as string,
          savingsGoalsEndpoint: process.env
            .NEXT_PUBLIC_STARLING_SAVING_GOALS_ENDPOINT as string,
          addMoneyToSavingsGoalEndpoint: process.env
            .NEXT_PUBLIC_STARLING_TRANSFER_TO_SAVING_GOAL_ENDPOINT as string,
          baseUrl: process.env.NEXT_PUBLIC_STARLING_BASE_URL as string,
        });

    return new SavingsGoalRepository(client);
  }
}
