import { Button } from 'antd';
import React from 'react';
import PlusIcon from '../assets/plus.png';
import MinusIcon from '../assets/minus.png';
import classes from './CounterBtns.module.scss';

const CounterBtns = ({ onIncrement, onDecrement, count }) => {
  return (
    <div className={classes.CounterBtns}>
      <Button
        onClick={onDecrement}
        className={classes.CounterBtns__IncrementBtn}
      >
        <img src={MinusIcon} alt='minus' />
      </Button>
      <p className={classes.CounterBtns__Count}>{count}</p>
      <Button
        onClick={onIncrement}
        className={classes.CounterBtns__IncrementBtn}
      >
        <img src={PlusIcon} alt='plus' />
      </Button>
    </div>
  );
};

export default CounterBtns;
