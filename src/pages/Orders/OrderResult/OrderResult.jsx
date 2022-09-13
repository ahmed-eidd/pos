import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../../components/Text/Text';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import OrderStatus from '../OrderStatus/OrderStatus';
import classes from './OrderResult.module.scss';

const OrderResult = ({ status }) => {
  const [currentLang] = useCurrentLang();
  const orderLocale = locale.orders;
  return (
    <div className={classes.OrderResult}>
      <div className={classes.OrderResult__Details}>
        <OrderStatus status={status} />
        <Text>في المطعم</Text>
        <Text
          className={classes.OrderResult__Details__OrderNumber}
          color='grey'
        >
          الطلب رقم 6598
        </Text>
      </div>

      <Text>10/05/2022 10:30 مساءً</Text>

      <Link to={`/order/33`} className={classes.OrderResult__Link}>
        {orderLocale.orderDetailsBtn[currentLang]}
      </Link>
    </div>
  );
};

export default OrderResult;
