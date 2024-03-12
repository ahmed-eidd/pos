import { DollarOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../../../components/Text/Text';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import OrderStatus, {
  CANCELED_ORDER_STATUS,
  NOTFOUND_ORDER,
} from '../OrderStatus/OrderStatus';
import classes from './OrderResult.module.scss';

const OrderResult = ({ order, canceledOrders }) => {
  console.log('OrderResult  canceledOrders:', canceledOrders);
  const [currentLang] = useCurrentLang();
  const orderLocale = locale.orders;
  return (
    <div className={classes.OrderResult}>
      <div className={classes.OrderResult__Details}>
        <Tag icon={<DollarOutlined />} style={{ padding: '.3rem .4rem' }} color='success' prefix='$'>{order?.total_amount} جم</Tag>
        <OrderStatus
          status={
            !canceledOrders
              ? order?.status
              : order?.canceled === 1
                ? CANCELED_ORDER_STATUS
                : order?.status
          }
        />
        <Text>{order?.order_payment?.toUpperCase()}</Text>
        <Text
          className={classes.OrderResult__Details__OrderNumber}
          size='small'
          color='grey'
        >
          الطلب رقم {order?.id} طاوله {order?.table_number}
        </Text>
      </div>

      {order?.status !== NOTFOUND_ORDER && (
        <>
          <Text size='small'>{order?.type}</Text>
          <Text size='small'>
            {order?.created_at + ' ' + order?.opening_time}
          </Text>
          <Link
            to={
              canceledOrders
                ? `/canceled-order/${order?.id}`
                : `/order/${order?.id}`
            }
            className={classes.OrderResult__Link}
          >
            {orderLocale.orderDetailsBtn[currentLang]}
          </Link>
        </>
      )}
    </div>
  );
};

export default OrderResult;
