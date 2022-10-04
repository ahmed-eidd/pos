import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../service/api';

export const usePayOrder = () => {
  const navigate = useNavigate();
  return useMutation(
    (data) => {
      const body = new FormData();
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
      },
    }
  );
};
