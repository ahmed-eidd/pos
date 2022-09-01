import React from 'react';
import classes from './CartCounter.module.scss';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';

const CartCounter = ({ prices, count }) => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  return (
    <div className={classes.CartCounter}>
      <p>
        {cartLocale.title[currentLang] +
          ` ${count} ` +
          cartLocale.count[currentLang] +
          ' / ' +
          `${prices} ` +
          locale.global.currency[currentLang]}
      </p>
    </div>
  );
};

export default CartCounter;
