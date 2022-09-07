import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from './QueryKeys';
import Transaction from '../lib/entities/Transaction';
import ApiRoutes from '../utils/ApiRoutes';

const useTransactions = (
  initialData: Transaction[],
  startDate: string,
  endDate: string
) =>
  useQuery(
    [QueryKeys.Transactions],
    async () => {
      const response = await axios.get(
        `${ApiRoutes.Transactions}?startDate=${startDate}&endDate=${endDate}`
      );

      return response.data as Transaction[];
    },
    {
      initialData,
    }
  );

export default useTransactions;
