import React, { useMemo } from 'react';
import CounterBtns from '../../CounterBtns/CounterBtns';
import classes from '../ItemAccordion.module.scss';
import TrashIcon from '../../../assets/trash.png';
import {
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveCartItem,
} from '../../../hooks/query/useCart';
import { Collapse } from 'antd';
import Spinner from '../../Spinner/Spinner';

const { Panel } = Collapse;

const Header = ({ text, count, loading }) => {
  return (
    <div className={classes.ItemAccordion__Header}>
      <p className={classes.ItemAccordion__Header__Count}>{count}</p>
      <p className={classes.ItemAccordion__Header__Text}>{text}</p>
      <Spinner
        spinning={loading}
        style={{
          marginLeft: 'auto',
          marginRight: '10px',
        }}
        size={20}
      />
    </div>
  );
};

const SingleCartItem = ({ item }) => {
  const removeItem = useRemoveCartItem();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  const actionsLoading = useMemo(() => {
    return [
      removeItem.isLoading,
      increaseQuantity.isLoading,
      decreaseQuantity.isLoading,
    ];
  }, [
    removeItem.isLoading,
    increaseQuantity.isLoading,
    decreaseQuantity.isLoading,
  ]);
  return (
    <Panel
      key={item?.id}
      header={
        <>
          <Header
            loading={actionsLoading.some((el) => el === true)}
            text={item.productName}
            count={item.quantity}
          />
        </>
      }
    >
      <div className={classes.ItemAccordion__Panel}>
        <div className={classes.ItemAccordion__Panel__CounterWrapper}>
          <CounterBtns
            onIncrement={() => increaseQuantity.mutate(item?.id)}
            onDecrement={() => decreaseQuantity.mutate(item?.id)}
            count={+item.quantity}
            disableDecBtn={+item.quantity < 2}
          />
          <p className={classes.ItemAccordion__Panel__CounterWrapper__Count}>
            {`${item.quantity}x${item.price * item.quantity}EGP`}
          </p>
        </div>
        <img
          className={classes.ItemAccordion__Panel__CounterWrapper__Delete}
          src={TrashIcon}
          alt='delete'
          onClick={() => removeItem.mutate(item?.id)}
        />
      </div>
    </Panel>
  );
};

export default SingleCartItem;
