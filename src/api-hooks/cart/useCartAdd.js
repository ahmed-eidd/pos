import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { queryKeys } from '../../constants/queryKeys';
import useApi from '../useApi';

function useCartAdd() {
  const posId = useSelector(state => state.auth.posId);
  const api = useApi();
  const client = useQueryClient();
  const http = async ({ data, onSuc }) => {
    const body = new FormData();
    body.append('Id', data?.id);
    body.append('type', data?.type);
    body.append('quantity', data?.quantity);
    body.append('point_of_sale_id', posId);

    const res = await api.post(`/addToCart`, body);
    if (res?.code === 200 && onSuc) onSuc();
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSuccess: () => {
      client.invalidateQueries([queryKeys?.cartInfo]);
    },
  });

  return { cartAdd: mutate, cartAddLod: isLoading };
}

export default useCartAdd;
