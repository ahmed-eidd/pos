import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/queryKeys';
import { axiosInstance } from '../../service/api';

export const useGetCategories = () => {
  return useQuery([queryKeys.getCategories], () =>
    axiosInstance().get('/getItemCategory')
  );
};