import React from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import { useProductsStore } from '../../../../store/useStore';
import shallow from 'zustand/shallow';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';

const CartItems = ({ className }) => {
  const increaseQuantity = useProductsStore((state) => state.increaseQuantity);
  const decreaseQuantity = useProductsStore((state) => state.decreaseQuantity);
  const deleteFromCart = useProductsStore((state) => state.deleteFromCart);
  const cartItems = useProductsStore((state) => state.cart, shallow);
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
