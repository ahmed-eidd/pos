import { useMutation, useQueryClient } from '@tanstack/react-query';
import useApi from '../../api-hooks/useApi';
import { queryKeys } from '../../constants/queryKeys';

export const usePrintItem = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation((ids) => api.post('/print', { item_order: ids }), {
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.getOrders]);
    },
  });
};
