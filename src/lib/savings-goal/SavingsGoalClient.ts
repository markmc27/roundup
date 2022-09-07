import axios, { AxiosRequestConfig } from 'axios';
import handleAxiosError from '../../utils/handleAxiosError';
import ISavingsGoalClient, {
  AddMoneyToSavingsGoalResponse,
  CreateSavingsGoalResponse,
  SavingsGoalResponse,
} from './ISavingsGoalClient';

export interface SavingsGoalClientConfig {
  baseUrl: string;
  savingsGoalsEndpoint: string;
  addMoneyToSavingsGoalEndpoint: string;
  authToken: string;
}

export default class SavingsGoalClient implements ISavingsGoalClient {
  private config: SavingsGoalClientConfig;

  constructor(config: SavingsGoalClientConfig) {
    this.config = config;
  }

  private axiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.config.authToken}`,
      },
    };
  }

  private generateBaseEndpoint(accountId: string): string {
    return this.config.savingsGoalsEndpoint.replace('{accountId}', accountId);
  }

  async createSavingsGoal(
    accountId: string,
    name: string,
    currency: string
  ): Promise<CreateSavingsGoalResponse> {
    axios.interceptors.response.use((r) => r, handleAxiosError);

    const response = await axios.put(
      `${this.config.baseUrl}${this.generateBaseEndpoint(accountId)}`,
      {
        name,
        currency,
      },
      this.axiosConfig()
    );

    return {
      savingsGoalUid: response.data.savingsGoalUid,
      success: response.data.success,
      errors: response.data.errors,
    } as CreateSavingsGoalResponse;
  }

  async getSavingsGoals(accountId: string): Promise<SavingsGoalResponse> {
    axios.interceptors.response.use((r) => r, handleAxiosError);

    const response = await axios.get(
      `${this.config.baseUrl}${this.generateBaseEndpoint(accountId)}`,
      this.axiosConfig()
    );

    const savingsGoals = response.data.savingsGoalList.map(
      (savingsGoal: any) => ({
        id: savingsGoal.savingsGoalUid,
        name: savingsGoal.name,
        totalSavedAmount: savingsGoal.totalSaved.minorUnits,
        totalSavedCurrency: savingsGoal.totalSaved.currency,
      })
    );

    return {
      savingsGoals,
    } as SavingsGoalResponse;
  }

  async addMoneyToSavingsGoal(
    accountId: string,
    savingGoalId: string,
    transferId: string,
    amountMinorUnits: number,
    currency: string
  ): Promise<AddMoneyToSavingsGoalResponse> {
    axios.interceptors.response.use((r) => r, handleAxiosError);

    const endpoint = this.config.addMoneyToSavingsGoalEndpoint
      .replace('{accountId}', accountId)
      .replace('{savingGoalId}', savingGoalId)
      .replace('{transferId}', transferId);

    const response = await axios.put(
      `${this.config.baseUrl}${endpoint}`,
      {
        amount: {
          currency,
          minorUnits: amountMinorUnits,
        },
      },
      this.axiosConfig()
    );

    return {
      success: response.data.success,
      errors: response.data.errors,
      transferUid: response.data.transferUid,
    } as AddMoneyToSavingsGoalResponse;
  }
}
