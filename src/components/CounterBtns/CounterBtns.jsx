import { Button } from 'antd';
import React from 'react';
import PlusIcon from '../../assets/plus.png';
import MinusIcon from '../../assets/minus.png';
import classes from './CounterBtns.module.scss';

const CounterBtns = ({
  disableDecBtn,
  onIncrement,
  onDecrement,
  count,
  actionsLoading,
}) => {
  return (
    <div className={classes.CounterBtns}>
      <Button
        onClick={onDecrement}
        className={classes.CounterBtns__IncrementBtn}
        disabled={disableDecBtn}
        loading={actionsLoading?.decrease}
        icon={<img src={MinusIcon} alt="minus" />}
      />
      <p className={classes.CounterBtns__Count}>{count}</p>
      <Button
        onClick={onIncrement}
        className={classes.CounterBtns__IncrementBtn}
        icon={<img src={PlusIcon} alt="plus" />}
        loading={actionsLoading?.increase}
      />
    </div>
  );
};

export default CounterBtns;
