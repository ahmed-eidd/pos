import React, { useState } from 'react';
import classes from './Checkout.module.scss';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';
import OrderType from './OrderType/OrderType';
import PaymentType from './PaymentType/PaymentType';

const Checkout = () => {
  // const [currentLang] = useCurrentLang();
  const [orderType, setOrderType] = useState('delivery');
  const onChangeOrderType = ({ target: { value: val } }) => {
    console.log(val);
    setOrderType(val);
  };
  return (
    <div className={classes.Checkout}>
      <div className={classes['col-1']}>
        <OrderType value={orderType} onChange={onChangeOrderType} />
        <PaymentType />
      </div>

      <div className={classes['col-2']}>
        <CheckoutItems />
        <CheckoutTotal />
      </div>
    </div>
  );
};

export default Checkout;
