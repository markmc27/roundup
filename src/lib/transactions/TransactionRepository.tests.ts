import { DateTime } from 'luxon';
import TransactionsRepository from './TransactionRepository';
import TestTransactionsClient from './TestTransactionsClient';

describe('Transaction Repository', () => {
  test.each([
    [DateTime.now().minus({ weeks: 1 }), DateTime.now()],
    [DateTime.now().minus({ weeks: 2 }), DateTime.now().minus({ days: 3 })],
  ])(
    'given start date %s and end date %s should only return transactions between those dates',
    async (startDate: DateTime, endDate: DateTime) => {
      const transactionsRepo = new TransactionsRepository(
        new TestTransactionsClient()
      );

      const transactions = await transactionsRepo.retrieveTransactionsBetween(
        'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
        startDate.toISO(),
        endDate.toISO()
      );

      transactions.forEach((transaction) => {
        expect(
          DateTime.fromISO(transaction.transactionDate) <= endDate
        ).toBeTruthy();
        expect(
          DateTime.fromISO(transaction.transactionDate) >= startDate
        ).toBeTruthy();
      });
    }
  );

  it('should only return OUT transactions', async () => {
    const startDate = DateTime.now().minus({ weeks: 2 });
    const endDate = DateTime.now();

    const transactionsRepo = new TransactionsRepository(
      new TestTransactionsClient()
    );

    const transactions = await transactionsRepo.retrieveTransactionsBetween(
      'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
      startDate.toISO(),
      endDate.toISO()
    );

    transactions.forEach((transaction) => {
      expect(transaction.direction).toBe('OUT');
    });
  });

  it('should only return populated transaction information', async () => {
    const startDate = DateTime.now().minus({ weeks: 2 });
    const endDate = DateTime.now();

    const transactionsRepo = new TransactionsRepository(
      new TestTransactionsClient()
    );

    const transactions = await transactionsRepo.retrieveTransactionsBetween(
      'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
      startDate.toISO(),
      endDate.toISO()
    );

    transactions.forEach((transaction) => {
      expect(transaction.amount.minorUnits).toBeTruthy();
      expect(transaction.amount.currency).toBeTruthy();
      expect(transaction.counterParty).toBeTruthy();
      expect(transaction.reference).toBeTruthy();
    });
  });
});
