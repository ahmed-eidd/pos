import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants/queryKeys';
import { getPointOfSale } from '../../helper/localStorage';
import { axiosInstance } from '../../service/api';
import useSearchQuery from '../useSearchQuery';

export const useGetProducts = categoryId => {
  const { searchQueryObj, searchQueryStr } = useSearchQuery();
  const body = new FormData();
  body.append('category', categoryId);
  body.append('point_of_sale_id', getPointOfSale());
  if (searchQueryObj.keyword) body.append('keyword', searchQueryObj.keyword);

  return useQuery([queryKeys.getProducts, categoryId, searchQueryStr], () =>
    axiosInstance().post('/getPoItems', body)
  );
};
