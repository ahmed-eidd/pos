import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { queryKeys } from '../constants/queryKeys';
import useApi from './useApi';

function useCancelOrder() {
  const client = useQueryClient();
  const api = useApi();
  const http = async ({ fd, onSuc }) => {
    const res = await api.post(`cancelOrder`, fd);
    if (res?.code === 200) {
      onSuc && onSuc(res);
      message.success(res?.message);
      return res;
    }
  };

  const { mutate, data, isLoading } = useMutation(http, {
    onSuccess: res => {
      client.invalidateQueries([queryKeys.getOrders]);
      client.invalidateQueries([queryKeys.placesList]);
      return res;
    },
  });
  console.log('useCancelOrder  data:', data);
  return {
    cancelOrder: mutate,
    cancelOrderLod: isLoading,
  };
}

export default useCancelOrder;
