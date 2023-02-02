import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import OrderResult from '../OrderResult/OrderResult';
import { NOTFOUND_ORDER } from '../OrderStatus/OrderStatus';
import classes from './OrderResultsList.module.scss';

const OrderResultsList = ({ orders, isLoading }) => {
  // console.log('OrderResultsList  orders', orders);
  if (isLoading) {
    return (
      <Spinner
        spinnerStyle={{
          margin: '0 auto',
        }}
      />
    );
  }

  if (orders?.length < 1) {
    return <OrderResult status={NOTFOUND_ORDER} />;
  }
  return (
    <div className={classes.OrderResultsList}>
      {orders?.map(el => (
        <OrderResult key={el?.id} order={el} />
      ))}
    </div>
  );
};

export default OrderResultsList;
