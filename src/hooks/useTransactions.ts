import { useQuery } from '@tanstack/react-query';
import QueryKeys from './QueryKeys';
import Transaction from '../lib/entities/Transaction';
import TransactionsRepositoryFactory from '../lib/transactions/TransactionsRepositoryFactory';

const useTransactions = (
  initialData: Transaction[],
  accountId: string,
  startDate: string,
  endDate: string
) =>
  useQuery(
    [QueryKeys.Transactions],
    async () => {
      console.log('refetching transactions');
      const transactionsRepo =
        new TransactionsRepositoryFactory().getTransactionsRepo();

      const transactions = await transactionsRepo.retrieveTransactionsBetween(
        accountId,
        startDate,
        endDate
      );

      return transactions;
    },
    {
      initialData,
    }
  );

export default useTransactions;
