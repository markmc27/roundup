/* eslint-disable class-methods-use-this */
import { DateTime } from 'luxon';
import ITransactionsClient, {
  TransactionsResponse,
} from './ITransactionsClient';

export default class TestTransactionsClient implements ITransactionsClient {
  getTransactions(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<TransactionsResponse> {
    const endDateTime = DateTime.fromISO(endDate);

    return Promise.resolve({
      transactions: [
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 3564,
          },
          transactionTime: endDateTime.minus({ days: 1 }).toISO(),
          counterParty: 'Mickey Mouse',
          reference: "Minnie's birthday",
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 10000,
          },
          transactionTime: endDateTime.minus({ days: 2 }).toISO(),
          counterParty: 'Faster payment',
          reference: 'Monthly savings',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 1229,
          },
          transactionTime: endDateTime.minus({ days: 3 }).toISO(),
          counterParty: 'Tesco',
          reference: 'Liverpool branch',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 29103,
          },
          transactionTime: endDateTime.minus({ days: 4 }).toISO(),
          counterParty: 'Shell',
          reference: 'Liverpool branch',
        },
        {
          direction: 'IN',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 4500,
          },
          transactionTime: endDateTime.minus({ days: 4 }).toISO(),
          counterParty: 'John Smith',
          reference: 'Birthday drinks',
        },
      ],
    });
  }
}
