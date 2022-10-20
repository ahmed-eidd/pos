import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCurrentCartItems } from '../../hooks/useCurrentCartItems';
import { useZusStore } from '../../store/useStore';
import classes from './Checkout.module.scss';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';
import OrderType from './OrderType/OrderType';
import PaymentType, { PAYMENT_TYPE } from './PaymentType/PaymentType';

const Checkout = () => {
  const [orderType, setOrderType] = useState('delivery');
  const [receivedValue, setReceivedValue] = useState('delivery');
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash);

  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });
  const { data: cart } = useCurrentCartItems();

  const setPrintedOrder = useZusStore((state) => state.order.setPrintedOrder);
  const onChangeOrderType = ({ target: { value: val } }) => {
    setOrderType(val);
  };
  const onChangePaymentType = ({ target: { value: val } }) => {
    setPaymentType(val);
  };
  const onChangeReceivedMoney = ({ target: { value: val } }) => {
    setReceivedValue(val);
  };

  useEffect(() => {
    if (cart?.items?.length > 0) {
      setPrintedOrder(cart);
    }
  }, [cart, setPrintedOrder]);

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
