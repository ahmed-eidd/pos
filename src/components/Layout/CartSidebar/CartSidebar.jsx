import React from 'react';
import classes from './CartSidebar.module.scss';
import CartHeader from './CartHeader/CartHeader';
import CartCounter from './CartCounter/CartCounter';
import ItemAccordion from '../../ItemAccordion/ItemAccordion';

const CartSidebar = () => {
  return (
    <div className={classes.CartSidebar}>
      <CartHeader />
      <div className={classes.CartSidebar__Items}>
        <ItemAccordion
          items={[{ text: 'بيتزا كواترو ستاجيوني', id: 12321, count: 2 }]}
        />
      </div>
      <CartCounter />
    </div>
  );
};

export default CartSidebar;
