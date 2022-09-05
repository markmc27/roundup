import AccountWithBalance from '../entities/AccountWithBalance';

export interface AccountInformationResponse {
  id: string;
  defaultCategoryId: string;
  name: string;
  effectiveBalanceCurrency: string;
  effectiveBalanceMinorUnits: number;
}

export default interface IAccountClient {
  getAccountInformation(accountId: string): Promise<AccountInformationResponse>;
}
