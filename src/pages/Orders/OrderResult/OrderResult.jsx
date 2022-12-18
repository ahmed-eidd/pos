import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../../components/Text/Text';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import OrderStatus, { NOTFOUND_ORDER } from '../OrderStatus/OrderStatus';
import classes from './OrderResult.module.scss';

const OrderResult = ({ status, type, id, date }) => {
  const [currentLang] = useCurrentLang();
  const orderLocale = locale.orders;
  return (
    <div className={classes.OrderResult}>
      <div className={classes.OrderResult__Details}>
        <OrderStatus status={status} />
        <Text>{type?.toUpperCase()}</Text>
        <Text
          className={classes.OrderResult__Details__OrderNumber}
          color='grey'
        >
          الطلب رقم {id}
        </Text>
      </div>

      {status !== NOTFOUND_ORDER && (
        <>
          <Text>{date ?? '10/05/2022 10:30 مساءً'}</Text>
          <Link to={`/order/${id}`} className={classes.OrderResult__Link}>
            {orderLocale.orderDetailsBtn[currentLang]}
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderResult;
