import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { queryKeys } from '../services/react-query/queryKeys';

export const useGetClientsForHotel = (enabled) => {
  const api = useApi();
  const http = async () => {
    // const res = await api.post(`getClientsForHotel`, fd);
    const res = await api.get(`/allClient`);
    return res;
  };

  return useQuery([queryKeys.getClientsForHotels], http, {
    onSuccess: (res) => {
      return res;
    },
    enabled: enabled,
  });
};

export const useGetRoomsForHotel = (enabled) => {
  const api = useApi();
  const http = async () => {
    // const res = await api.post(`getClientsForHotel`, fd);
    const res = await api.get(`/allRooms`);
    return res;
  };

  return useQuery([queryKeys.getRoomsForHotels], http, {
    enabled: enabled,
  });
};
