import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import QueryKeys from './QueryKeys';
import SavingsGoal from '../lib/entities/SavingsGoal';
import ApiRoutes from '../utils/ApiRoutes';

const useSavingsGoals = (initialData: SavingsGoal[]) =>
  useQuery(
    [QueryKeys.SavingsGoals],
    async () => {
      const response = await axios.get(ApiRoutes.SavingsGoals);

      return response.data as SavingsGoal[];
    },
    {
      initialData,
    }
  );

export default useSavingsGoals;
