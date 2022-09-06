import axios, { AxiosRequestConfig } from 'axios';
import handleAxiosError from '../../utils/handleAxiosError';
import ISavingsGoalClient, {
  CreateSavingsGoalResponse,
  SavingsGoalResponse,
} from './ISavingsGoalClient';

export interface SavingsGoalClientConfig {
  baseUrl: string;
  savingsGoalsEndpoint: string;
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

  private generateEndpoint(accountId: string): string {
    return this.config.savingsGoalsEndpoint.replace('{accountId}', accountId);
  }

  async createSavingsGoal(
    accountId: string,
    name: string,
    currency: string
  ): Promise<CreateSavingsGoalResponse> {
    axios.interceptors.response.use((r) => r, handleAxiosError);

    const response = await axios.put(
      `${this.config.baseUrl}${this.generateEndpoint(accountId)}`,
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
      `${this.config.baseUrl}${this.generateEndpoint(accountId)}`,
      this.axiosConfig()
    );

    const savingsGoals = response.data.savingsGoalList.map(
      (savingsGoal: any) => {
        return {
          id: savingsGoal.savingsGoalUid,
          name: savingsGoal.name,
          totalSavedAmount: savingsGoal.totalSaved.minorUnits,
          totalSavedCurrency: savingsGoal.totalSaved.currency,
        };
      }
    );

    return {
      savingsGoals,
    } as SavingsGoalResponse;
  }
}
