import { Radio } from 'antd';
import React from 'react';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { useCurrentLoginType } from '../../../hooks/useCurrentLoginType';
import { locale } from '../../../locale';
import classes from './OrderType.module.scss';

const OrderType = ({ onChange, value }) => {
  const [currentLang] = useCurrentLang();
  const { isCashier } = useCurrentLoginType();
  return (
    <div className={classes.OrderType}>
      <p>:{locale.checkout.orderType.title[currentLang]}</p>
      <Radio.Group
        onChange={onChange}
        value={value}
        defaultValue="delivery"
        buttonStyle="solid"
      >
        {isCashier && (
          <RadioButton value={'delivery'} label="توصيل"></RadioButton>
        )}
        <RadioButton value={'restaurant'} label="في المطعم"></RadioButton>
      </Radio.Group>
    </div>
  );
};

export default OrderType;
