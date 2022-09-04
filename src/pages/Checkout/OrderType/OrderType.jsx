import { Radio } from 'antd';
import React from 'react';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import classes from './OrderType.module.scss';

const OrderType = ({ onChange, value }) => {
  const [currentLang] = useCurrentLang();
  return (
    <div className={classes.OrderType}>
      <p>:{locale.checkout.orderType.title[currentLang]}</p>
      <Radio.Group
        onChange={onChange}
        value={value}
        defaultValue='delivery'
        buttonStyle='solid'
      >
        <Radio.Button value={'delivery'}>توصيل</Radio.Button>
        <Radio.Button value={'restaurant'}>في المطعم</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default OrderType;
