import ISavingsGoalClient from './ISavingsGoalClient';
import ISavingsGoalRepository from './ISavingsGoalRepository';
import SavingsGoalClient from './SavingsGoalClient';
import SavingsGoalRepository from './SavingsGoalRepository';
import TestSavingsGoalClient from './TestSavingsGoalClient';

export default class SavingsGoalRepositoryFactory {
  useTestClient = process.env.TEST_MODE === 'on';

  getSavingsGoalRepo(): ISavingsGoalRepository {
    const client: ISavingsGoalClient = this.useTestClient
      ? new TestSavingsGoalClient()
      : new SavingsGoalClient({
          authToken: process.env.STARLING_TOKEN as string,
          savingsGoalsEndpoint: process.env
            .STARLING_SAVING_GOALS_ENDPOINT as string,
          baseUrl: process.env.STARLING_BASE_URL as string,
        });

    return new SavingsGoalRepository(client);
  }
}
