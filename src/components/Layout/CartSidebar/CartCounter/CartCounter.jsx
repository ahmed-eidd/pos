import React from 'react';
import classes from './CartCounter.module.scss';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';

const CartCounter = () => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  return (
    <div className={classes.CartCounter}>
      <p>
        {cartLocale.title[currentLang] +
          ' 2 ' +
          cartLocale.count[currentLang] +
          ' / ' +
          '0.00 ' +
          locale.global.currency[currentLang]}
      </p>
    </div>
  );
};

export default CartCounter;
