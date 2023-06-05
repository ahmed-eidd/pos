import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../constants/queryKeys';
import useApi from './useApi';

function useSaveOrder() {
  const navigate = useNavigate();
  const { posId, sheet } = useSelector(state => state.auth);
  const api = useApi();
  const client = useQueryClient();
  const http = async ({ data, onSuc }) => {
    const body = new FormData();
    body.append('point_of_sale_place_id', data?.placeId);
    body.append('point_of_sale_table_id', data?.tableId);
    body.append('point_of_sale_id', posId);
    body.append('point_of_sale_order_sheet_id', sheet);

    const res = await api.post(`/saveOrder`, body);
    if (res?.code === 200 && onSuc) onSuc(res);
    return res;
  };

  const { mutate, isLoading } = useMutation(http, {
    onSuccess: res => {
      console.log('useSaveOrder  res:', res);
      if (res?.code !== 200) {
        res?.validation?.forEach(msg => message.error(msg));
        return;
      }

      client.invalidateQueries([queryKeys?.cartInfo]);
      navigate('/on-hold');
    },
  });

  return { saveOrder: mutate, saveOrderLod: isLoading };
}

export default useSaveOrder;
