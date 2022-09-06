import { DateTime } from 'luxon';
import MonetaryAmount from '../entities/MonetaryAmount';
import Transaction from '../entities/Transaction';
import ITransactionsClient from './ITransactionsClient';
import ITransactionsRepository from './ITransactionsRepository';

export default class TransactionsRepository implements ITransactionsRepository {
  private client: ITransactionsClient;

  constructor(client: ITransactionsClient) {
    this.client = client;
  }

  async retrieveTransactionsBetween(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<Transaction[]> {
    const clientResponse = await this.client.getTransactions(
      accountId,
      startDate,
      endDate
    );

    return clientResponse.transactions
      .filter((transaction) => {
        return (
          DateTime.fromISO(transaction.transactionTime) <=
            DateTime.fromISO(endDate) &&
          DateTime.fromISO(transaction.transactionTime) >=
            DateTime.fromISO(startDate)
        );
      })
      .filter((transaction) => transaction.direction === 'OUT')
      .map((transaction) => {
        return new Transaction({
          direction: transaction.direction,
          amount: new MonetaryAmount({
            currency: transaction.settledAmount.currency,
            minorUnits: transaction.settledAmount.minorUnits,
          }),
          transactionDate: transaction.transactionTime,
          counterParty: transaction.counterParty,
          reference: transaction.reference,
        });
      });
  }
}
