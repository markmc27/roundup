import AccountWithBalance from '../entities/AccountWithBalance';
import MonetaryAmount from '../entities/MonetaryAmount';
import IAccountClient from './IAccountClient';
import IAccountRepository from './IAccountRepository';

export default class AccountRepository implements IAccountRepository {
  private client: IAccountClient;

  constructor(client: IAccountClient) {
    this.client = client;
  }

  async retrieveAccountWithBalance(
    accountId: string
  ): Promise<AccountWithBalance> {
    const clientResponse = await this.client.getAccountInformation(accountId);

    return new AccountWithBalance({
      id: accountId,
      name: clientResponse.name,
      defaultCategoryId: clientResponse.defaultCategoryId,
      currentBalance: new MonetaryAmount({
        currency: clientResponse.effectiveBalanceCurrency,
        minorUnits: clientResponse.effectiveBalanceMinorUnits,
      }),
    });
  }
}
