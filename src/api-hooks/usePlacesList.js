import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../constants/queryKeys';
import useApi from './useApi';

function usePlacesList() {
  const posId = useSelector(state => state.auth.posId);
  const api = useApi();
  const http = async () => {
    const body = new FormData();
    body.append('point_of_sale_id', posId);
    const res = await api.post(`/pointOfSalePlaces`, body);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.placesList], http, {
    staleTime: Infinity,
    // onSuccess: ()=>{
    // },
  });

  const placesList = data?.data?.pointOfSales;

  return { placesList, placesListLod: isLoading };
}

export default usePlacesList;
