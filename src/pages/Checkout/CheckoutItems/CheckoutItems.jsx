import React from 'react';
import CartHeader from '../../../components/Layout/CartSidebar/CartHeader/CartHeader';
import CartItems from '../../../components/Layout/CartSidebar/CartItems/CartItems';
import classes from './CheckoutItems.module.scss';

const CheckoutItems = () => {
  return (
    <div className={classes.CheckoutItems}>
      <CartHeader />
      <CartItems />
    </div>
  );
};

export default CheckoutItems;
