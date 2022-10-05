import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/queryKeys';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';

export const usePayOrder = () => {
  const navigate = useNavigate();
  const posId = useZusStore((state) => state.auth.posId);
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      for (let [key, value] of Object.entries(data)) {
        body.append(key, value);
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
