import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/queryKeys';
import { getPointOfSale } from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';

export const useGetProducts = (categoryId) => {
  const body = new FormData();
  body.append('category', categoryId);
  body.append('point_of_sale_id', getPointOfSale());
  return useQuery([queryKeys.getProducts, categoryId], () =>
    axiosInstance().post('/getPoItems', body)
  );
};
