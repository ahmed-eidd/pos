import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/queryKeys';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';

export const usePayOrder = () => {
  const navigate = useNavigate();
  const posId = useZusStore((state) => state.auth.posId);
  const sheetId = useZusStore((state) => state.auth.sheet);
  const currentSavedOrderId = useZusStore(
    (state) => state.cart.currentSavedOrderId
  );
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      body.append('point_of_sale_order_sheet_id', sheetId);
      for (let [key, value] of Object.entries(data)) {
        body.append(key, value);
      }
      if (currentSavedOrderId) {
        body.append('order_id', currentSavedOrderId);
        console.log('payed saved order');
      }
      return axiosInstance().post('/payOrder', body);
    },
    {
      onSuccess: (data) => {
        if (data.data.validation.length > 0) {
          message.error(data.data.validation[0]);
          return;
        }
        navigate('/order-placed');
        queryClient.invalidateQueries([queryKeys.getCart]);
        queryClient.invalidateQueries([queryKeys.getProducts]);
      },
    }
  );
};
