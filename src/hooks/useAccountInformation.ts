import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AccountWithBalance from '../lib/entities/AccountWithBalance';
import ApiRoutes from '../utils/ApiRoutes';
import QueryKeys from './QueryKeys';

const useAccountInformation = (initialData: AccountWithBalance) =>
  useQuery(
    [QueryKeys.AccountInfo],
    async () => {
      const response = await axios.get(ApiRoutes.AccountInformation);

      return response.data as AccountWithBalance;
    },
    {
      initialData,
    }
  );

export default useAccountInformation;
