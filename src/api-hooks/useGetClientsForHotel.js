import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';
import { queryKeys } from '../services/react-query/queryKeys';

export const useGetClientsForHotel = (room_num) => {
  const api = useApi();
  const http = async () => {
    // const res = await api.post(`getClientsForHotel`, fd);
    const res = await api.post(`/allClient`, { room_id: room_num });
    return res;
  };

  return useQuery([queryKeys.getClientsForHotels, room_num], http, {
    onSuccess: (res) => {
      return res;
    },
    enabled: !!room_num,
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
