export interface StarlingTransaction {
  direction: 'IN' | 'OUT';
  settledAmount: {
    currency: string;
    minorUnits: number;
  };
  transactionTime: string;
  counterParty: string;
  reference: string;
}
export interface TransactionsResponse {
  transactions: StarlingTransaction[];
}

export default interface ITransactionsClient {
  getTransactions(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<TransactionsResponse>;
}
