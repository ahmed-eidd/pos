import { Col, Radio, Row } from 'antd';
import React from 'react';
import classes from './PaymentType.module.scss';
import WalletIcon from '../../../assets/checkout/empty-wallet.png';
import CardIcon from '../../../assets/checkout/card.png';
import GiftIcon from '../../../assets/checkout/gift.png';
import UsersIcon from '../../../assets/checkout/users.svg';
import Flex from '../../../components/Flex/Flex';
import PaymentTypeForm from './PaymentTypeForm';

// payment type constants
export const PAYMENT_TYPE = {
  cash: 'cash',
  visa: 'visa',
  creditCard: 'credit',
  hotel: 'hotel',
  employee: 'employee',
};

const PaymentType = ({
  paymentValue,
  receivedValue,
  orderType,
  onChangePaymentType,
  onChangeReceivedMoney,
  total,
  onSuccessOrder,
}) => {
  return (
    <div className={classes.PaymentType}>
      <Flex align="flex-start" gap="20px" direction="column">
        <h3>نوع الدفع</h3>
        <Radio.Group
          onChange={value => onChangePaymentType(value)}
          defaultValue={PAYMENT_TYPE.cash}
          className={classes.PaymentType__Tabs}
        >
          <Row gutter={[15, 15]}>
            <Col>
              <Radio.Button value={PAYMENT_TYPE.cash}>
                <div className={classes.PaymentType__Tabs__Tab}>
                  <img src={WalletIcon} alt="wallet" />
                  <p>نقدي</p>
                </div>
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button value={PAYMENT_TYPE.visa}>
                <div className={classes.PaymentType__Tabs__Tab}>
                  <img src={CardIcon} alt="wallet" />
                  <p>visa</p>
                </div>
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button value={PAYMENT_TYPE.creditCard}>
                <div className={classes.PaymentType__Tabs__Tab}>
                  <img src={CardIcon} alt="card" />
                  <p>بطاقة الائتمان</p>
                </div>
              </Radio.Button>
            </Col>
            <Col>
              {' '}
              <Radio.Button value={PAYMENT_TYPE.hotel}>
                <div className={classes.PaymentType__Tabs__Tab}>
                  <img src={GiftIcon} alt="gift" />
                  <p>غرفة الفندق </p>
                </div>
              </Radio.Button>
            </Col>
            <Col>
              <Radio.Button value={PAYMENT_TYPE.employee}>
                <div className={classes.PaymentType__Tabs__Tab}>
                  <img src={UsersIcon} alt="gift" />
                  <p>الموظفين</p>
                </div>
              </Radio.Button>
            </Col>
          </Row>
        </Radio.Group>
      </Flex>
      <PaymentTypeForm
        onChangeReceivedMoney={onChangeReceivedMoney}
        paymentValue={paymentValue}
        receivedValue={receivedValue}
        orderType={orderType}
        total={total}
        onSuccess={onSuccessOrder}
      />
    </div>
  );
};

export default PaymentType;
