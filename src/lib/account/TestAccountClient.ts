import IAccountClient, { AccountInformationResponse } from './IAccountClient';

export default class TestAccountClient implements IAccountClient {
  getAccountInformation(
    accountId: string
  ): Promise<AccountInformationResponse> {
    return new Promise((resolve) => {
      switch (accountId) {
        case 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa':
          resolve({
            id: accountId,
            name: 'Personal',
            effectiveBalanceCurrency: 'GBP',
            effectiveBalanceMinorUnits: 1000,
            defaultCategoryId: '00000000-0000-0000-0000-000000000000',
          } as AccountInformationResponse);
          break;
        case 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb':
          resolve({
            id: accountId,
            name: 'Personal',
            effectiveBalanceCurrency: 'GBP',
            effectiveBalanceMinorUnits: 2000,
            defaultCategoryId: '11111111-1111-1111-1111-111111111111',
          } as AccountInformationResponse);
          break;
      }
    });
  }
}
