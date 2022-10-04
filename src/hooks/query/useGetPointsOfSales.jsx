import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/queryKeys';
import { setShiftId } from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import { useZusStore } from '../../store/useStore';

export const useGetPointsOfSales = () => {
  return useQuery(
    [queryKeys.getPointsOfSales],
    () => {
      return axiosInstance().get('/pointOfSales');
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useCheckPointOfSales = () => {
  return useMutation((id) =>
    axiosInstance().get(`/checkSheetPointOfSale?point_id=${id}`)
  );
};

export const useStartSheet = () => {
  const setAuthSheet = useZusStore((state) => state.auth.setSheet);
  return useMutation(
    ({ id, startBalance }) => {
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
      },
    }
  );
};

export const useEndSheet = () => {
  const shiftId = useZusStore((state) => state.auth.sheet);
  return useMutation((endBalance) => {
    const body = new FormData();
    body.append('shift', shiftId);
    body.append('endBalance', endBalance);
    return axiosInstance().post('/endSheet', body);
  });
};
