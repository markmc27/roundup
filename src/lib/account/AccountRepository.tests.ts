import AccountWithBalance from '../entities/AccountWithBalance';
import MonetaryAmount from '../entities/MonetaryAmount';
import AccountRepository from './AccountRepository';
import TestAccountClient from './TestAccountClient';

describe('Account Repository Tests', () => {
  test.each([
    [
      'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa',
      new MonetaryAmount({
        currency: 'GBP',
        minorUnits: 1000,
      }),
      '00000000-0000-0000-0000-000000000000',
    ],
    [
      'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb',
      new MonetaryAmount({
        currency: 'GBP',
        minorUnits: 2000,
      }),
      '11111111-1111-1111-1111-111111111111',
    ],
  ])(
    'given %s should return correct account info',
    async (
      accountId: string,
      balance: MonetaryAmount,
      defaultCategoryId: string
    ) => {
      const accountInformation = await new AccountRepository(
        new TestAccountClient()
      ).retrieveAccountWithBalance(accountId);

      expect(accountInformation).toBeInstanceOf(AccountWithBalance);
      expect(accountInformation.id).toBe(accountId);
      expect(accountInformation.defaultCategoryId).toBe(defaultCategoryId);
      expect(accountInformation.currentBalance).toBeInstanceOf(MonetaryAmount);
      expect(accountInformation.currentBalance.currency).toBe(balance.currency);
      expect(accountInformation.currentBalance.minorUnits).toBe(
        balance.minorUnits
      );
    }
  );

  //ignoring the test case where an account the repository doesn't find the account info for this exercise
});
