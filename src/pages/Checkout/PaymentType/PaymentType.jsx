import { Radio } from 'antd';
import React from 'react';
import classes from './PaymentType.module.scss';
import WalletIcon from '../../../assets/checkout/empty-wallet.png';
import CardIcon from '../../../assets/checkout/card.png';
import GiftIcon from '../../../assets/checkout/gift.png';

const PaymentType = () => {
  return (
    <div className={classes.PaymentType}>
      <p>نوع الدفع</p>
      <Radio.Group className={classes.PaymentType__Tabs}>
        <Radio.Button value={'wallet'}>
          <div className={classes.PaymentType__Tabs__Tab}>
            <img src={WalletIcon} alt='wallet' />
            <p>نقدي</p>
          </div>
        </Radio.Button>
        <Radio.Button value={'card'}>
          <div className={classes.PaymentType__Tabs__Tab}>
            <img src={CardIcon} alt='card' />
            <p>بطاقة الائتمان</p>
          </div>
        </Radio.Button>
        <Radio.Button value={'gift'}>
          <div className={classes.PaymentType__Tabs__Tab}>
            <img src={GiftIcon} alt='gift' />
            <p>غرفة الفندق </p>
          </div>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default PaymentType;
