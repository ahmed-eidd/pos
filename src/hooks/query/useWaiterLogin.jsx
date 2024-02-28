import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../../constants/queryKeys';
import { getPointOfSale } from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';

export const useGetActiveShifs = () => {
  const organizationId = useSelector((state) => state?.auth?.organizationId);
  const currentUser = useSelector((state) => state?.auth?.currentUser);
  const posId = getPointOfSale();
  const http = async () => {
    const res = await axiosInstance().get(
      `/activeShifts?admin_id=${currentUser?.id}&point_id=${posId}`,
    );
    return res;
  };
  return useQuery([queryKeys.getWaiterActiveShifts], http, {
    // ...Options
    select: (res) => res?.data,
  });
};

export const useGetStaff = () => {
  const http = async (code) => {
    const res = await axiosInstance().post('/getStaff', { code });
    return res;
  };
  return useMutation(http);
};
