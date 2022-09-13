import classNames from 'classnames';
import React from 'react';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import classes from './OrderStatus.module.scss';

export const DONE_ORDER_STATUS = 'done';
export const UNPAID_ORDER_STATUS = 'unpaid';

const OrderStatus = ({ status = DONE_ORDER_STATUS }) => {
  const [currentLang] = useCurrentLang();
  const orderStatusLocale = locale.global.orderStatus;
  return (
    <div
      className={classNames(classes.OrderStatus, {
        [classes['OrderStatus__Done']]: status === DONE_ORDER_STATUS,
        [classes['OrderStatus__Unpaid']]: status === UNPAID_ORDER_STATUS,
      })}
    >
      {status === DONE_ORDER_STATUS && orderStatusLocale.done[currentLang]}
      {status === UNPAID_ORDER_STATUS && orderStatusLocale.unpaid[currentLang]}
    </div>
  );
};

export default OrderStatus;
