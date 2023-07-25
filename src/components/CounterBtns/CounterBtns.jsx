import { Button, InputNumber, Spin } from 'antd';
import React from 'react';
import PlusIcon from '../../assets/plus.png';
import MinusIcon from '../../assets/minus.png';
import classes from './CounterBtns.module.scss';
import debounce from 'debounce';

const CounterBtns = ({
  disableDecBtn,
  onIncrement,
  onDecrement,
  onChangeCount,
  count,
  actionsLoading,
}) => {
  const handleOnChange = debounce(value => {
    // console.log('handleOnChange  value:', value);
    onChangeCount(value);
  }, 800);
  return (
    <Spin spinning={actionsLoading?.change}>
      <div className={classes.CounterBtns}>
        <Button
          onClick={onDecrement}
          className={classes.CounterBtns__IncrementBtn}
          disabled={disableDecBtn}
          loading={actionsLoading?.decrease}
          icon={<img src={MinusIcon} alt="minus" />}
        />
        {/* <p className={classes.CounterBtns__Count}>{count}</p> */}
        <InputNumber
          controls={false}
          min={1}
          value={count}
          onChange={handleOnChange}
          className={classes.CounterBtns__Count_input}
          onFocus={e => {
            e.target.select();
          }}
        />
        <Button
          onClick={onIncrement}
          className={classes.CounterBtns__IncrementBtn}
          icon={<img src={PlusIcon} alt="plus" />}
          loading={actionsLoading?.increase}
        />
      </div>
    </Spin>
  );
};

export default CounterBtns;
