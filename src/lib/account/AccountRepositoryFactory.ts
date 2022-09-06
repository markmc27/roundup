import AccountClient from './AccountClient';
import AccountRepository from './AccountRepository';
import IAccountClient from './IAccountClient';
import IAccountRepository from './IAccountRepository';
import TestAccountClient from './TestAccountClient';

export default class AccountRepositoryFactory {
  useTestClient = process.env.NEXT_PUBLIC_TEST_MODE === 'on';

  getAccountRepo(): IAccountRepository {
    const client: IAccountClient = this.useTestClient
      ? new TestAccountClient()
      : new AccountClient({
          authToken: process.env.NEXT_PUBLIC_STARLING_TOKEN as string,
          balanceEndpoint: process.env
            .NEXT_PUBLIC_STARLING_BALANCE_ENDPOINT as string,
          accountEndpoint: process.env
            .NEXT_PUBLIC_STARLING_ACCOUNTS_ENDPOINT as string,
          baseUrl: process.env.NEXT_PUBLIC_STARLING_BASE_URL as string,
        });

    return new AccountRepository(client);
  }
}
