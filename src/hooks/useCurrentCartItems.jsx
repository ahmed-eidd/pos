import { useMemo } from 'react';
import { useZusStore } from '../store/useStore';
import { useGetCart } from './query/useCart';
import { useGetSavedOrder } from './query/useOrders';

export const useCurrentCartItems = () => {
  const showSavedOrder = useZusStore((state) => state.cart.showSavedOrder);
  const cartItems = useGetCart();
  const savedOrderItems = useGetSavedOrder();

  const currentCartItem = useMemo(() => {
    return showSavedOrder ? savedOrderItems : cartItems;
  }, [showSavedOrder, savedOrderItems, cartItems]);

  return currentCartItem;
};
