import React from 'react';
import classes from './CartCounter.module.scss';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from '../../../../services/utils';

const CartCounter = ({ prices, count }) => {
  const [currentLang] = useCurrentLang();
  const cartLocale = locale.sidebar.cart;
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (!prices || !count) {
      message.error(cartLocale.validation.emptyCart[currentLang]);
      return;
    }
    navigate('/checkout');
  };
  return (
    <Button onClick={onClickHandler} className={classes.CartCounter}>
      <p>
        {cartLocale.title[currentLang] +
          ` ${count ?? 0} ` +
          cartLocale.count[currentLang] +
          ' / ' +
          `${currencyFormat(prices)} ` +
          locale.global.currency[currentLang]}
      </p>
    </Button>
  );
};

export default CartCounter;
