import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../../constants/queryKeys';
import { setShiftId } from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import { setIsLogin, setSheet } from '../../store/authSlice';

export const useGetPointsOfSales = () => {
  return useQuery(
    [queryKeys.getPointsOfSales],
    () => {
      return axiosInstance().get('/pointOfSales');
    },
    {
      refetchOnWindowFocus: false,
    },
  );
};

export const useCheckPointOfSales = () => {
  return useMutation((id) =>
    axiosInstance().get(`/checkSheetPointOfSale?point_id=${id}`),
  );
};

export const useStartSheet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setAuthSheet = (sheet) => dispatch(setSheet(sheet));
  return useMutation(
    ({ id, startBalance }) => {
      // * add validation for res.data.validation in all auth
      const body = new FormData();
      body.append('startBalance', startBalance);
      body.append('point_id', id);
      return axiosInstance().post('/startSheet', body);
    },
    {
      onSuccess: (newData) => {
        const id = newData.data.item.shift_id;
        setShiftId(id);
        setAuthSheet(id);
        dispatch(setIsLogin(true));
        navigate('/categories');
      },
    },
  );
};

export const useEndSheet = () => {
  const shiftId = useSelector((state) => state.auth.sheet);
  return useMutation((endBalance) => {
    const body = new FormData();
    body.append('shift', shiftId);
    body.append('endBalance', endBalance);
    return axiosInstance().post('/endSheet', body);
  });
};
