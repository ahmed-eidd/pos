import React from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import { useZusStore } from '../../../../store/useStore';
import shallow from 'zustand/shallow';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';

const CartItems = ({ className }) => {
  const increaseQuantity = useZusStore(
    (state) => state.products.increaseQuantity
  );
  const decreaseQuantity = useZusStore(
    (state) => state.products.decreaseQuantity
  );
  const deleteFromCart = useZusStore((state) => state.products.deleteFromCart);
  const cartItems = useZusStore((state) => state.products.cart, shallow);
  return (
    <div
      className={classNames(classes.CartItems, className, {
        [classes.center]: cartItems.length === 0,
      })}
    >
      <ItemAccordion
        onIncrement={increaseQuantity}
        onDecrement={decreaseQuantity}
        onDelete={deleteFromCart}
        items={cartItems}
      />
    </div>
  );
};

export default CartItems;
