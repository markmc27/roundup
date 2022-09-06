export interface TransactionsResponse {
  transactions: {
    direction: 'IN' | 'OUT';
    settledAmount: {
      currency: string;
      minorUnits: number;
    };
    transactionTime: string;
    counterParty: string;
    reference: string;
  }[];
}

export default interface ITransactionsClient {
  getTransactions(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<TransactionsResponse>;
}
