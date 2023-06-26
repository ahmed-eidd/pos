import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';
import useApi from './useApi';

function useTableChange() {
  const api = useApi();
  const client = useQueryClient();
  const http = async ({ data, onSuc }) => {
    try {
      const res = await api.post(`/changeTable`, data);
      console.log('http  res:', res);
      if (res?.code === 200) {
        onSuc && onSuc(res);
        return res;
      }
    } catch (error) {
      console.log('http  error:', error);
    }
  };
  const { mutate, isLoading } = useMutation(http, {
    onSuccess: res => {
      console.log('useTableChange  res:', res);
      if (res?.code === 200) {
        client.invalidateQueries([queryKeys.getOrders]);
        client.invalidateQueries([queryKeys.placesList]);
        return res;
      }
    },
  });
  return { tableChange: mutate, tableChangeLod: isLoading };
}

export default useTableChange;
