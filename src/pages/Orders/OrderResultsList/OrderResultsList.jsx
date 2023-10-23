import { Pagination, Result } from 'antd';
import React from 'react';
import Spinner from '../../../components/Spinner/Spinner';
import useSearchQuery from '../../../hooks/useSearchQuery';
import OrderResult from '../OrderResult/OrderResult';
import { NOTFOUND_ORDER } from '../OrderStatus/OrderStatus';
import classes from './OrderResultsList.module.scss';

const OrderResultsList = ({ orders, pagination, isLoading, canceledOrders }) => {
  // console.log('OrderResultsList  orders', orders);
  const { searchQueryObj, setSearchQuery } = useSearchQuery();
  if (isLoading) {
    return (
      <Spinner
        spinnerStyle={{
          margin: '0 auto',
        }}
      />
    );
  }

  const onChangePagination = page => {
    console.log(page);
    const query = { ...searchQueryObj };

    query.page = page;
    setSearchQuery(query);
  };

  if (!orders?.length) {
    return <Result title="لا يوجد طلبات" />;
    // return <OrderResult status={NOTFOUND_ORDER} />;
  }
  return (
    <div className={classes.OrderResultsList}>
      {orders?.map(el => (
        <OrderResult key={el?.id} order={el} canceledOrders={canceledOrders} />
      ))}
      <Pagination current={pagination?.current} total={pagination?.total} pageSize={pagination?.size} onChange={onChangePagination} hideOnSinglePage />
    </div>
  );
};

export default OrderResultsList;
