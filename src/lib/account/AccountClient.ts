import axios, { AxiosRequestConfig } from 'axios';
import IAccountClient, { AccountInformationResponse } from './IAccountClient';

export interface AccountClientConfig {
  baseUrl: string;
  balanceEndpoint: string;
  accountEndpoint: string;
  authToken: string;
}

export default class AccountClient implements IAccountClient {
  private config: AccountClientConfig;

  constructor(config: AccountClientConfig) {
    this.config = config;
  }

  async getAccountInformation(
    accountId: string
  ): Promise<AccountInformationResponse> {
    const balanceApiEndpoint = this.config.balanceEndpoint.replace(
      '{accountId}',
      accountId
    );

    const accountResponse = await this.makeRequest(this.config.accountEndpoint);
    const balanceResponse = await this.makeRequest(balanceApiEndpoint);

    const accountFromReponse = accountResponse.data.accounts.find(
      (x: any) => x.accountUid === accountId
    );
    return {
      id: accountId,
      defaultCategoryId: accountFromReponse?.defaultCategory,
      name: accountFromReponse?.name,
      effectiveBalanceCurrency: balanceResponse.data.effectiveBalance.currency,
      effectiveBalanceMinorUnits:
        balanceResponse.data.effectiveBalance.minorUnits,
    } as AccountInformationResponse;
  }

  private async makeRequest(endpoint: string) {
    const handle_axios_error = function (err: any) {
      if (err.response) {
        console.log(err.response);
      }
      throw new Error(err);
    };

    axios.interceptors.response.use((r) => r, handle_axios_error);

    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.config.authToken}`,
      },
    };

    const response = await axios.get(
      `${this.config.baseUrl}${endpoint}`,
      axiosConfig
    );

    return response;
  }
}
