import ITransactionsClient from './ITransactionsClient';
import ITransactionsRepository from './ITransactionsRepository';
import TestTransactionsClient from './TestTransactionsClient';
import TransactionsRepository from './TransactionRepository';
import TransactionsClient from './TransactionsClient';

export default class TransactionsRepositoryFactory {
  useTestClient = process.env.TEST_MODE === 'on';

  getTransactionsRepo(): ITransactionsRepository {
    const client: ITransactionsClient = this.useTestClient
      ? new TestTransactionsClient()
      : new TransactionsClient({
          authToken: process.env.STARLING_TOKEN as string,
          transactionsEndpoint: process.env
            .STARLING_TRANSACTIONS_ENDPOINT as string,
          baseUrl: process.env.STARLING_BASE_URL as string,
        });

    return new TransactionsRepository(client);
  }
}
