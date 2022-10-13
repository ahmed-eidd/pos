import React, { useState } from 'react';
import { useCurrentCartItems } from '../../hooks/useCurrentCartItems';
import classes from './Checkout.module.scss';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';
import OrderType from './OrderType/OrderType';
import PaymentType, { PAYMENT_TYPE } from './PaymentType/PaymentType';

const Checkout = () => {
  // const [currentLang] = useCurrentLang();
  const { data: cart } = useCurrentCartItems();
  const [orderType, setOrderType] = useState('delivery');
  const [receivedValue, setReceivedValue] = useState('delivery');
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash);
  const onChangeOrderType = ({ target: { value: val } }) => {
    setOrderType(val);
  };
  const onChangePaymentType = ({ target: { value: val } }) => {
    setPaymentType(val);
  };
  const onChangeReceivedMoney = ({ target: { value: val } }) => {
    setReceivedValue(val);
  };
  return (
    <div className={classes.Checkout}>
      <div className={classes['col-1']}>
        <OrderType value={orderType} onChange={onChangeOrderType} />
        <PaymentType
          total={cart?.total}
          orderType={orderType}
          paymentValue={paymentType}
          onChangePaymentType={onChangePaymentType}
          receivedValue={receivedValue}
          onChangeReceivedMoney={onChangeReceivedMoney}
        />
      </div>

      <div className={classes['col-2']}>
        <CheckoutItems />
        <CheckoutTotal total={cart?.total} />
      </div>
    </div>
  );
};

export default Checkout;
