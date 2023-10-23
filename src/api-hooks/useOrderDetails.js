import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants/queryKeys';
import useApi from './useApi';

function useOrderDetails(orderId) {
  const api = useApi();
  const httpFunc = async () => {
    const fd = new FormData();
    fd.append('order_id', orderId);

    const res = await api.post('orderDetail', fd);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.orderDetails, orderId], httpFunc, {
    enabled: !!orderId,
  });
  console.log('useOrderDetails  data:', data);

  const orderDetail = data?.data?.order;
  return { orderDetail, orderDetailLod: isLoading };
}

export default useOrderDetails;
