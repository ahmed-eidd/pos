import React from 'react';
import classes from './OrderPlaced.module.scss';
import SuccessIcon from '../../assets/order-placed/successIcon.png';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const OrderPlaced = () => {
  const [currentLang] = useCurrentLang();
  const orderPlacedLocale = locale.orderPlaced;
  const navigate = useNavigate();
  const onNewOrderHandler = () => {
    navigate('/');
  };
  return (
    <div className={classes.OrderPlaced}>
      <div className={classes.OrderPlaced__Wrapper}>
        <h3 className={classes.OrderPlaced__Wrapper__Title}>
          {orderPlacedLocale.orderDone[currentLang]}
        </h3>
        <img
          className={classes.OrderPlaced__Wrapper__Icon}
          src={SuccessIcon}
          alt='success'
        />
        <div className={classes.OrderPlaced__Wrapper__TextWrapper}>
          <p>{orderPlacedLocale.orderDone[currentLang]}</p>
          <p>{orderPlacedLocale.orderSuccess[currentLang]}</p>
        </div>
        <Button
          type='primary'
          onClick={onNewOrderHandler}
          className={classes.OrderPlaced__Wrapper__Btn}
        >
          {orderPlacedLocale.newOrder[currentLang]}
        </Button>
      </div>
    </div>
  );
};

export default OrderPlaced;
