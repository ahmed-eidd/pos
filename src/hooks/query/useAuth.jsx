import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import {
  removePointOfSale,
  removeShifId,
  removeToken,
} from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';

// * add validation for res.data.validation in all auth
export const useLogin = () => {
  const setAuthToken = useZusStore((state) => state.auth.setToken);
  const { mutate, isLoading, isError } = useMutation(
    (body) => axiosInstance().post('/adminLogin', body),
    {
      onSuccess: (newData) => {
        if (newData.data.validation.length > 0) {
          message.error(newData.data.validation[0]);
          return;
        }

        setAuthToken(newData?.data.message);

        localStorage.setItem('user', JSON.stringify(newData?.data.data));
        localStorage.setItem('token', JSON.stringify(newData?.data.message));
      },
    }
  );

  return { mutate, isLoading, isError };
};

export const useLogOut = () => {
  const setAuthToken = useZusStore((state) => state.auth.setToken);
  const setAuthPosId = useZusStore((state) => state.auth.setPosId);
  const setAuthSheet = useZusStore((state) => state.auth.setSheet);
  const setCartSavedOrder = useZusStore(
    (state) => state.cart.setCartToShowSavedOrder
  );
  const setCurrentSavedOrderId = useZusStore(
    (state) => state.cart.setCurrentSavedOrderId
  );
  const { mutate, isLoading, isError } = useMutation(
    () => axiosInstance().get('/logout'),
    {
      onSuccess: () => {
        localStorage.removeItem('user');
        removeToken();
        removePointOfSale();
        removeShifId();
        setAuthToken(null);
        setAuthPosId(null);
        setAuthSheet(null);
        setCartSavedOrder(false);
        setCurrentSavedOrderId(null);
      },
    }
  );
  return { mutate, isLoading, isError };
};
