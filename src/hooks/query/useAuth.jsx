import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import {
  removePointOfSale,
  removeShifId,
  removeToken,
} from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import { setPosId, setSheet, setToken } from '../../store/authSlice';
import { setCartToShowSavedOrder, setCurrentSavedOrderIdAction } from '../../store/cartSlice';

// * add validation for res.data.validation in all auth
export const useLogin = () => {
  const dispatch = useDispatch();
  const setAuthToken = (token) => dispatch(setToken(token));
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
  const dispatch = useDispatch();
  const setAuthToken = (token) => dispatch(setToken(token));
  const setAuthPosId = (id) => dispatch(setPosId(id));
  const setAuthSheet = (sheet) => dispatch(setSheet(sheet));
  const setCartSavedOrder =  (payload) => dispatch(setCartToShowSavedOrder(payload))
  const setCurrentSavedOrderId =  (id) => dispatch(setCurrentSavedOrderIdAction(id))
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
