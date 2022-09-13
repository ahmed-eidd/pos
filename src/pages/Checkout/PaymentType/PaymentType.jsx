import { Radio } from 'antd';
import React from 'react';
import classes from './PaymentType.module.scss';
import WalletIcon from '../../../assets/checkout/empty-wallet.png';
import CardIcon from '../../../assets/checkout/card.png';
import GiftIcon from '../../../assets/checkout/gift.png';
import UsersIcon from '../../../assets/checkout/users.svg';
import InputField from '../../../components/InputField/InputField';
import Flex from '../../../components/Flex/Flex';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
import { locale } from '../../../locale';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { useNavigate } from 'react-router-dom';

const PaymentType = ({
  paymentValue,
  receivedValue,
  onChangePaymentType,
  onChangeReceivedMoney,
}) => {
  const [currentLang] = useCurrentLang();
  const navigate = useNavigate();
  return (
    <div className={classes.PaymentType}>
      <Flex align='flex-start' gap='20px' direction='column'>
        <h3>نوع الدفع</h3>
        <Radio.Group
          onChange={(value) => onChangePaymentType(value)}
          defaultValue={'wallet'}
          className={classes.PaymentType__Tabs}
        >
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
          <Radio.Button value={'hotel'}>
            <div className={classes.PaymentType__Tabs__Tab}>
              <img src={GiftIcon} alt='gift' />
              <p>غرفة الفندق </p>
            </div>
          </Radio.Button>
          <Radio.Button value={'users'}>
            <div className={classes.PaymentType__Tabs__Tab}>
              <img src={UsersIcon} alt='gift' />
              <p>الموظفين</p>
            </div>
          </Radio.Button>
        </Radio.Group>
      </Flex>

      {paymentValue !== 'hotel' ? (
        <Flex align='flex-start' direction='column' gap='20px'>
          <h3>المبلغ المستلم</h3>
          <Radio.Group
            onChange={(value) => onChangeReceivedMoney(value)}
            defaultValue='150'
            value={receivedValue}
            className={classes.PaymentType__ReceivedMoney}
          >
            <Radio.Button value={'150'}>
              <p>150ج</p>
            </Radio.Button>
            <Radio.Button value={'120'}>
              <p>120ج</p>
            </Radio.Button>
          </Radio.Group>
          <InputField radius='md' />

          <Flex gap='15px' direction='column'>
            <Flex justify='space-between'>
              <Text label>{locale.checkout.orderTotal.paid[currentLang]}</Text>
              <Text>150 جنيه مصري</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text label>
                {locale.checkout.orderTotal.onhold[currentLang]}
              </Text>
              <Text>150 جنيه مصري</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text label>
                {locale.checkout.orderTotal.nochange[currentLang]}
              </Text>
              <Text color='success'>150 جنيه مصري</Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <>
          <h3>رقم الغرفة</h3>
          <InputField radius='md' />
        </>
      )}

      <Flex gap='20px'>
        <Button
          type='primary'
          onClick={() => navigate('/review-order')}
          fullwidth
          size='lg'
        >
          {locale.checkout.orderTotal.order[currentLang]}
        </Button>
        <Button type='danger' size='lg' fullwidth>
          {locale.checkout.orderTotal.canelOrder[currentLang]}
        </Button>
      </Flex>
    </div>
  );
};

export default PaymentType;
