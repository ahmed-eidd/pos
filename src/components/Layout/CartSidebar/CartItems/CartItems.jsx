import React from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';
import {
  useDecreaseQuantity,
  useGetCart,
  useIncreaseQuantity,
  useRemoveCartItem,
} from '../../../../hooks/query/useCart';

const CartItems = ({ className }) => {
  const { data, isLoading: cartIsloading } = useGetCart();
  const removeItem = useRemoveCartItem();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const cartItems = data?.items;
  return (
    <div
      className={classNames(classes.CartItems, className, {
        [classes.center]: cartItems?.length === 0,
      })}
    >
      <ItemAccordion
        loading={cartIsloading}
        onIncrement={(data) => increaseQuantity.mutate(data)}
        onDecrement={(data) => decreaseQuantity.mutate(data)}
        onDelete={(data) => removeItem.mutate(data)}
        items={cartItems}
        actionsLoading={[
          removeItem.isLoading,
          increaseQuantity.isLoading,
          decreaseQuantity.isLoading,
        ]}
      />
    </div>
  );
};

export default CartItems;
