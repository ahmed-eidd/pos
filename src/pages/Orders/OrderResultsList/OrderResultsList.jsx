import React from 'react';
import OrderResult from '../OrderResult/OrderResult';
import classes from './OrderResultsList.module.scss';

const OrderResultsList = ({ items }) => {
  return (
    <div className={classes.OrderResultsList}>
      <OrderResult />
      <OrderResult status={'unpaid'} />
      <OrderResult />
      <OrderResult status={'unpaid'} />
      <OrderResult />
      <OrderResult status={'unpaid'} />
      <OrderResult />
    </div>
  );
};

export default OrderResultsList;
