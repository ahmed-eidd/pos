import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../../constants/queryKeys';
import { axiosInstance } from '../../service/api';

export const useGetCategories = () => {
  // const posId = useSelector(state => state.auth.posId);

  return useQuery([queryKeys.getCategories], () => {
    return axiosInstance().get(`/getItemCategory`);
    // return axiosInstance().get(`/getItemCategory?point_of_sale_id=${posId}`);
  });
};
