import { useMutation } from '@tanstack/react-query';
import {
  removePointOfSale,
  removeShifId,
  removeToken,
} from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';

export const useLogin = () => {
  // const queryClient = useQueryClient();
  const setAuthToken = useZusStore((state) => state.auth.setToken);
  const { mutate, isLoading, isError } = useMutation(
    (body) => axiosInstance().post('/adminLogin', body),
    {
      onSuccess: (newData) => {
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
      },
    }
  );
  return { mutate, isLoading, isError };
};
