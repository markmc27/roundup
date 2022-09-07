import AccountClient from './AccountClient';
import AccountRepository from './AccountRepository';
import IAccountClient from './IAccountClient';
import IAccountRepository from './IAccountRepository';
import TestAccountClient from './TestAccountClient';

export default class AccountRepositoryFactory {
  useTestClient = process.env.TEST_MODE === 'on';

  getAccountRepo(): IAccountRepository {
    const client: IAccountClient = this.useTestClient
      ? new TestAccountClient()
      : new AccountClient({
          authToken: process.env.STARLING_TOKEN as string,
          balanceEndpoint: process.env.STARLING_BALANCE_ENDPOINT as string,
          accountEndpoint: process.env.STARLING_ACCOUNTS_ENDPOINT as string,
          baseUrl: process.env.STARLING_BASE_URL as string,
        });

    return new AccountRepository(client);
  }
}
