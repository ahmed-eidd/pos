import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetCart } from './query/useCart';
import { useGetSavedOrder } from './query/useOrders';

export const useCurrentCartItems = () => {
  const showSavedOrder = useSelector(state => state.cart.showSavedOrder);
  const savedOrderItems = useGetSavedOrder();
  const cartItems = useGetCart();

  const currentCartItem = useMemo(() => {
    return showSavedOrder ? savedOrderItems : cartItems;
  }, [showSavedOrder, savedOrderItems, cartItems]);

  return currentCartItem;

  // return showSavedOrder ? savedOrderItems : cartItems;
};
