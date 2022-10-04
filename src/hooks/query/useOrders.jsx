import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { queryKeys } from '../../constants/queryKeys';
import { getPointOfSale, getShiftId } from '../../helper/localStorage';
import { locale } from '../../locale';
import { axiosInstance } from '../../service/api';
import { useCurrentLang } from '../useCurrentLang';

const posId = getPointOfSale();
const shiftId = getShiftId();

export const useSaveOrder = () => {
  // TODO: add queryClient.invalidateQuery
  const queryClient = useQueryClient();
  const [currentLang] = useCurrentLang();
  return useMutation(
    () => {
      const body = new FormData();
      body.append('point_of_sale_order_sheet_id', shiftId);
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('saveOrder', body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.getCart]);
        message.success(locale.sidebar.cart.orderSavedSuccess[currentLang]);
      },
    }
  );
};

export const useGetOrders = (orderStatus) => {
  // TODO: add queryClient.invalidateQuery
  const queryClient = useQueryClient();
  return useQuery(
    [queryKeys.getOrders, orderStatus],
    () => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      body.append('status', orderStatus);
      return axiosInstance().post('/orders', body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.getCart]);
      },
      select: (data) => {
        return data?.data?.data?.orders;
      },
    }
  );
};
