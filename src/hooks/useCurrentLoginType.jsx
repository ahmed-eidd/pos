import { useSelector } from 'react-redux';
import { loginTypeEnum } from '../store/authSlice';

export const useCurrentLoginType = () => {
  const currentloginType = useSelector((state) => state.auth.loginType);

  return {
    isCashier: currentloginType === loginTypeEnum.cashier,
    isWaiter: currentloginType === loginTypeEnum.waiter,
  };
};
