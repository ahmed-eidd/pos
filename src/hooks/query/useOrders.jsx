import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { queryKeys } from '../../constants/queryKeys';
import { locale } from '../../locale';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';
import { useCurrentLang } from '../useCurrentLang';

export const useSaveOrder = () => {
  const posId = useZusStore((state) => state.auth.posId);
  const shiftId = useZusStore((state) => state.auth.sheet);
  const setShowSavedOrder = useZusStore(
    (state) => state.cart.setCartToShowSavedOrder
  );
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
        queryClient.invalidateQueries([queryKeys.getOrders]);
        queryClient.invalidateQueries([queryKeys.getProducts]);
        message.success(locale.sidebar.cart.orderSavedSuccess[currentLang]);
        setShowSavedOrder(false);
      },
    }
  );
};

export const useGetOrders = (orderStatus, id, type) => {
  const posId = useZusStore((state) => state.auth.posId);
  // TODO: add queryClient.invalidateQuery
  const queryClient = useQueryClient();
  return useQuery(
    [queryKeys.getOrders, orderStatus ?? '', id ?? '', type ?? ''],
    () => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      if (orderStatus) {
        body.append('status', orderStatus);
      }
      if (id) {
        body.append('id', id);
      }

      if (type) {
        body.append('type', type);
      }
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

export const useGetSavedOrder = () => {
  const posId = useZusStore((state) => state.auth.posId);
  const currentSavedOrderId = useZusStore(
    (state) => state.cart.currentSavedOrderId
  );
  const setShowSavedOrder = useZusStore(
    (state) => state.cart.setCartToShowSavedOrder
  );
  return useQuery(
    [queryKeys.getSavedOrder, currentSavedOrderId],
    () => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      body.append('status', 'pending');
      body.append('id', currentSavedOrderId);

      return axiosInstance().post('/orders', body);
    },

    {
      enabled: !!currentSavedOrderId,
      onSuccess: () => {
        if (currentSavedOrderId) {
          setShowSavedOrder(true);
        }
      },
      select: (products) => {
        if (currentSavedOrderId) {
          const currentOrder = products?.data?.data?.orders[0];
          return {
            items: currentOrder.order_items,
            total: currentOrder.total_amount,
            ...currentOrder,
          };
        }
      },
    }
  );
};
