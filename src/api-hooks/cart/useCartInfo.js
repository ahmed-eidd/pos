import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../../constants/queryKeys';
import useApi from '../useApi';

function useCartInfo() {
  const posId = useSelector(state => state.auth.posId);
  const api = useApi();
  const http = async () => {
    const body = new FormData();
    body.append('point_of_sale_id', posId);
    const res = await api.post(`/viewCart`, body);
    return res;
  };

  const { data, isLoading } = useQuery([queryKeys.cartInfo], http, {
    // onSuccess: ()=>{
    // },
  });

  const cartInfo = data?.data?.cart;

  return { cartInfo, cartInfoLod: isLoading };
}

export default useCartInfo;
