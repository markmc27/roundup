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
            minorUnits: 100,
          },
          transactionTime: endDateTime.minus({ days: 1 }).toISO(),
          counterParty: 'Mickey Mouse',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 500,
          },
          transactionTime: endDateTime.minus({ days: 2 }).toISO(),
          counterParty: 'counterparty',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 500,
          },
          transactionTime: endDateTime.minus({ days: 3 }).toISO(),
          counterParty: 'counterparty',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 3628,
          },
          transactionTime: endDateTime.minus({ days: 4 }).toISO(),
          counterParty: 'counterparty',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 6520,
          },
          transactionTime: endDateTime.minus({ days: 5 }).toISO(),
          counterParty: 'counterparty',
        },
        {
          direction: 'OUT',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 2350,
          },
          transactionTime: endDateTime.minus({ days: 6 }).toISO(),
          counterParty: 'counterparty',
        },
        {
          direction: 'IN',
          settledAmount: {
            currency: 'GBP',
            minorUnits: 4500,
          },
          transactionTime: endDateTime.minus({ days: 4 }).toISO(),
          counterParty: 'counterparty',
        },
      ],
    });
  }
}
