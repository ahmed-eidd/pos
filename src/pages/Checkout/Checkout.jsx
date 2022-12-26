import React, { useRef, useState } from 'react';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useCurrentCartItems } from '../../hooks/useCurrentCartItems';
import classes from './Checkout.module.scss';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';
import OrderType from './OrderType/OrderType';
import PaymentType, { PAYMENT_TYPE } from './PaymentType/PaymentType';

const Checkout = () => {
  // const dispatch = useDispatch();
  const [orderType, setOrderType] = useState('delivery');
  const [receivedValue, setReceivedValue] = useState('delivery');
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash);

  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });
  const { data: cart } = useCurrentCartItems();
  // console.log('Checkout  cart', cart);

  // const setPrintedOrder = useCallback(
  //   payload => {
  //     dispatch(setPrintedOrder(payload));
  //   },
  //   [dispatch]
  // );
  // const setPrintedOrder = payload => {
  //   dispatch(setPrintedOrder(payload));
  // };

  const onChangeOrderType = ({ target: { value: val } }) => {
    setOrderType(val);
  };
  const onChangePaymentType = ({ target: { value: val } }) => {
    setPaymentType(val);
  };
  const onChangeReceivedMoney = ({ target: { value: val } }) => {
    setReceivedValue(val);
  };

  // useEffect(() => {
  // //   console.log('first', cart);
  //   if (cart?.items?.length > 0) {
  //     // setPrintedOrder(cart);
  //     dispatch(setPrintedOrder(cart));
  //   }
  // }, []);

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
          onSuccessOrder={handlePrint}
        />
      </div>

      <div ref={orderRef} className={classes['col-2']}>
        <CheckoutItems />
        <CheckoutTotal total={cart?.total} />
      </div>
    </div>
  );
};

export default Checkout;
