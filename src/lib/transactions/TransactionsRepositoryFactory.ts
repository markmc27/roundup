import ITransactionsClient from './ITransactionsClient';
import ITransactionsRepository from './ITransactionsRepository';
import TestTransactionsClient from './TestTransactionsClient';
import TransactionsRepository from './TransactionRepository';
import TransactionsClient from './TransactionsClient';

export default class TransactionsRepositoryFactory {
  useTestClient = process.env.NEXT_PUBLIC_TEST_MODE === 'on';

  getTransactionsRepo(): ITransactionsRepository {
    const client: ITransactionsClient = this.useTestClient
      ? new TestTransactionsClient()
      : new TransactionsClient({
          authToken: process.env.NEXT_PUBLIC_STARLING_TOKEN as string,
          transactionsEndpoint: process.env
            .NEXT_PUBLIC_STARLING_TRANSACTIONS_ENDPOINT as string,
          baseUrl: process.env.NEXT_PUBLIC_STARLING_BASE_URL as string,
        });

    return new TransactionsRepository(client);
  }
}
