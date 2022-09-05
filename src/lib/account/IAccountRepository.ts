import AccountWithBalance from '../entities/AccountWithBalance';

export default interface IAccountRepository {
  retrieveAccountWithBalance(accountId: string): Promise<AccountWithBalance>;
}
