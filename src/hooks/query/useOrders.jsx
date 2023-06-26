import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { queryKeys } from '../../constants/queryKeys';
import { locale } from '../../locale';
import { axiosInstance } from '../../service/api';
import { setCartToShowSavedOrder } from '../../store/cartSlice';
import { useCurrentLang } from '../useCurrentLang';

export const useSaveOrder = () => {
  const dispatch = useDispatch();
  const posId = useSelector(state => state.auth.posId);
  const shiftId = useSelector(state => state.auth.sheet);
  const setShowSavedOrder = payload => {
    dispatch(setCartToShowSavedOrder(payload));
  };
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

export const useGetOrders = (orderStatus, id, type, isCanceldOrders) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const posId = useSelector(state => state.auth.posId);
  // TODO: add queryClient.invalidateQuery
  const queryClient = useQueryClient();
  return useQuery(
    [
      queryKeys.getOrders,
      page,
      orderStatus ?? '',
      id ?? '',
      type ?? '',
      isCanceldOrders,
    ],
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

      body.append('canceled', isCanceldOrders ? 1 : 0);
      return axiosInstance().post(`/orders?page=${page}`, body);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.getCart]);
      },
      select: data => {
        // return data?.data?.data?.orders;
        return data?.data?.data;
      },
    }
  );
};

export const useGetSavedOrder = () => {
  const dispatch = useDispatch();
  const posId = useSelector(state => state.auth.posId);
  const currentSavedOrderId = useSelector(
    state => state.cart.currentSavedOrderId
  );
  const setShowSavedOrder = payload => {
    dispatch(setCartToShowSavedOrder(payload));
  };
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
      select: products => {
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
