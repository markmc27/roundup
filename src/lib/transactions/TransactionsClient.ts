import axios, { AxiosRequestConfig } from 'axios';
import handleAxiosError from '../../utils/handleAxiosError';
import ITransactionsClient, {
  TransactionsResponse,
} from './ITransactionsClient';

export interface TransactionsClientConfig {
  baseUrl: string;
  transactionsEndpoint: string;
  authToken: string;
}

export default class TransactionsClient implements ITransactionsClient {
  private config: TransactionsClientConfig;

  constructor(config: TransactionsClientConfig) {
    this.config = config;
  }
  async getTransactions(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<TransactionsResponse> {
    axios.interceptors.response.use((r) => r, handleAxiosError);

    const axiosConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${this.config.authToken}`,
      },
      params: {
        minTransactionTimestamp: startDate,
        maxTransactionTimestamp: endDate,
      },
    };

    const endpoint = `${this.config.transactionsEndpoint.replace(
      '{accountId}',
      accountId
    )}`;
    const response = await axios.get(
      `${this.config.baseUrl}${endpoint}`,
      axiosConfig
    );

    console.log('TRANSACTIONS', response.data);

    const transactions = response.data.feedItems.map((feedItem: any) => ({
      direction: feedItem.direction,
      settledAmount: {
        currency: feedItem.amount.currency,
        minorUnits: feedItem.amount.minorUnits,
      },
      transactionTime: feedItem.transactionTime,
      counterParty: feedItem.counterParty,
    }));

    return {
      transactions,
    } as TransactionsResponse;
  }
}
