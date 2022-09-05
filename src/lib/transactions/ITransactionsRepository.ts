import Transaction from '../entities/Transaction';

export default interface ITransactionsRepository {
  retrieveTransactionsBetween(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<Transaction[]>;
}
