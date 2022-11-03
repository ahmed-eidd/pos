import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import { queryKeys } from '../../constants/queryKeys';
import { axiosInstance } from '../../service/api';

export const useAddToCart = () => {
  const posId = useSelector((state) => state.auth.posId);
  const showSavedOrder = useSelector((state) => state.cart.showSavedOrder);
  const queryClient = useQueryClient();
  return useMutation(
    (data) => {
      const body = new FormData();
      body.append('Id', data?.id);
      body.append('type', data?.type);
      body.append('quantity', data?.quantity);

      body.append('point_of_sale_id', posId);
      if (showSavedOrder) {
        body.append('order_id', data?.order_id);
      }
      return axiosInstance().post('/addToCart', body);
    },
    {
      onSuccess: (newData) => {
        const error = newData?.data?.validation;
        if (error?.length > 0) {
          message.error(error[0]);
          return;
        }
        if (showSavedOrder) {
          queryClient.invalidateQueries([queryKeys.getSavedOrder]);
        } else {
          queryClient.invalidateQueries([queryKeys.getCart]);
        }
        queryClient.invalidateQueries([queryKeys.getProducts]);
      },
    }
  );
};

export const useGetCart = (selectPrice) => {
  const posId = useSelector((state) => state.auth.posId);
  return useQuery(
    [queryKeys.getCart],
    () => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('/viewCart', body);
    },
    {
      select: (products) => {
        // TODO: Add toFixed(2) to the total price property
        return products.data?.data?.cart;
      },
    }
  );
};

export const useIncreaseQuantity = () => {
  const posId = useSelector((state) => state.auth.posId);
  const queryClient = useQueryClient();
  return useMutation(
    (itemId) => {
      const body = new FormData();
      body.append('itemId', itemId);
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('/increaseQuantity', body);
    },
    {
      onSuccess: (newData) => {
        const error = newData?.data?.validation;
        if (error?.length > 0) {
          message.error(error[0]);
          return;
        }
        queryClient.invalidateQueries([queryKeys.getCart]);
      },
    }
  );
};

export const useDecreaseQuantity = () => {
  const posId = useSelector((state) => state.auth.posId);
  const queryClient = useQueryClient();
  return useMutation(
    (itemId) => {
      const body = new FormData();
      body.append('itemId', itemId);
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('/decreaseQuantity', body);
    },
    {
      onSuccess: (newData) => {
        const error = newData?.data?.validation;
        if (error?.length > 0) {
          message.error(error[0]);
          return;
        }
        queryClient.invalidateQueries([queryKeys.getCart]);
      },
    }
  );
};

export const useRemoveAllCartItems = () => {
  const posId = useSelector((state) => state.auth.posId);
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      const body = new FormData();
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('/deleteAllCart', body);
    },
    {
      onSuccess: (newData) => {
        const error = newData?.data?.validation;
        if (error?.length > 0) {
          message.error(error[0]);
          return;
        }
        queryClient.invalidateQueries([queryKeys.getCart]);
        queryClient.invalidateQueries([queryKeys.getProducts]);
      },
    }
  );
};

export const useRemoveCartItem = () => {
  const posId = useSelector((state) => state.auth.posId);
  const queryClient = useQueryClient();
  return useMutation(
    (itemId) => {
      const body = new FormData();
      body.append('itemId', itemId);
      body.append('point_of_sale_id', posId);
      return axiosInstance().post('/removeItem', body);
    },
    {
      onSuccess: (newData) => {
        const error = newData?.data?.validation;
        if (error?.length > 0) {
          message.error(error[0]);
          return;
        }
        queryClient.invalidateQueries([queryKeys.getCart]);
      },
    }
  );
};
