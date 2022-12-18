import classNames from 'classnames';
import React from 'react';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import classes from './OrderStatus.module.scss';

export const DONE_ORDER_STATUS = 'closed';
export const UNPAID_ORDER_STATUS = 'pending';
export const sentToPrepration_ORDER_STATUS = 'sentToPrepration';
export const NOTFOUND_ORDER = 'NOTFOUND_ORDER';

const OrderStatus = ({ status = DONE_ORDER_STATUS }) => {
  const [currentLang] = useCurrentLang();
  const orderStatusLocale = locale.global.orderStatus;
  return (
    <div
      className={classNames(classes.OrderStatus, {
        [classes['OrderStatus__Done']]: status === DONE_ORDER_STATUS,
        [classes['OrderStatus__Unpaid']]:
          status === UNPAID_ORDER_STATUS ||
          status === sentToPrepration_ORDER_STATUS,
        [classes['OrderStatus__NotFound']]: status === NOTFOUND_ORDER,
      })}
    >
      {status === DONE_ORDER_STATUS && orderStatusLocale.done[currentLang]}
      {(status === UNPAID_ORDER_STATUS ||
        status === sentToPrepration_ORDER_STATUS) &&
        orderStatusLocale.unpaid[currentLang]}
      {status === NOTFOUND_ORDER && 'لا يوجد'}
    </div>
  );
};

export default OrderStatus;
