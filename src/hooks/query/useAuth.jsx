import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import {
  removePointOfSale,
  removeShifId,
  removeToken,
} from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import {
  setCurrentUser,
  setIsLogin,
  setOrganizationId,
  setPosId,
  setSheet,
  setToken,
} from '../../store/authSlice';
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from '../../store/cartSlice';
import { useCurrentLoginType } from '../useCurrentLoginType';

// * add validation for res.data.validation in all auth
export const useLogin = () => {
  const dispatch = useDispatch();
  const { isWaiter } = useCurrentLoginType();
  const setAuthToken = (token) => dispatch(setToken(token));
  const { mutate, isLoading, isError } = useMutation(
    (body) => axiosInstance().post('/adminLogin', body),
    {
      onSuccess: (newData) => {
        // console.log('useLogin  newData:', newData);
        if (newData.data.validation.length > 0) {
          message.error(newData.data.validation[0]);
          return;
        }

        dispatch(
          setOrganizationId(
            newData.data?.data?.organization_admin?.organization_id,
          ),
        );
        setAuthToken(newData?.data.message);
        dispatch(setCurrentUser(newData.data?.data?.organization_admin));

        localStorage.setItem('user', JSON.stringify(newData?.data.data));
        localStorage.setItem('token', JSON.stringify(newData?.data.message));
        localStorage.setItem(
          'organizationId',
          JSON.stringify(
            newData.data?.data?.organization_admin?.organization_id,
          ),
        );
      },
    },
  );

  return { mutate, isLoading, isError };
};

export const useLogOut = () => {
  const dispatch = useDispatch();
  const setAuthToken = (token) => dispatch(setToken(token));
  const setAuthPosId = (id) => dispatch(setPosId(id));
  const setAuthSheet = (sheet) => dispatch(setSheet(sheet));
  const setCartSavedOrder = (payload) =>
    dispatch(setCartToShowSavedOrder(payload));
  const setCurrentSavedOrderId = (id) =>
    dispatch(setCurrentSavedOrderIdAction(id));
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
        // dispatch(setOrganizationId(null));
        dispatch(setCurrentUser(null));
        dispatch(setIsLogin(false));
      },
    },
  );
  return { mutate, isLoading, isError };
};
