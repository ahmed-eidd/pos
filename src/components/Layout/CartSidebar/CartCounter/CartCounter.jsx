import React from 'react';
import classes from './CartCounter.module.scss';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const CartCounter = ({ prices, count }) => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/checkout');
  };
  return (
    <Button onClick={onClickHandler} className={classes.CartCounter}>
      <p>
        {cartLocale.title[currentLang] +
          ` ${count} ` +
          cartLocale.count[currentLang] +
          ' / ' +
          `${prices} ` +
          locale.global.currency[currentLang]}
      </p>
    </Button>
  );
};

export default CartCounter;
