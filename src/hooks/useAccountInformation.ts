import { useQuery } from '@tanstack/react-query';
import AccountRepositoryFactory from '../lib/account/AccountRepositoryFactory';
import AccountWithBalance from '../lib/entities/AccountWithBalance';
import QueryKeys from './QueryKeys';

const useAccountInformation = (
  initialData: AccountWithBalance,
  accountId: string
) =>
  useQuery(
    [QueryKeys.AccountInfo],
    async () => {
      console.log('refetching transactions');

      const accountRepo = new AccountRepositoryFactory().getAccountRepo();
      const accountInfo = await accountRepo.retrieveAccountWithBalance(
        accountId
      );

      return accountInfo;
    },
    {
      initialData,
    }
  );

export default useAccountInformation;
