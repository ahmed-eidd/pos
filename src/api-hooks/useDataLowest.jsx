import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { queryKeys } from '../services/react-query/queryKeys';

export const useGetDataLowest = () => {
  const api = useApi();
  const http = async () => {
    // const res = await api.post(`getClientsForHotel`, fd);
    const res = await api.post(`/dataLowest`);
    return res;
  };

  return useQuery([queryKeys.getDataLowest], http, {
    onSuccess: (res) => {
      return res;
    },
  });
};
