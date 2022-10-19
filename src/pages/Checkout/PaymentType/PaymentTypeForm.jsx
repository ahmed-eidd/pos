import { Checkbox, Form, Radio } from 'antd';
import React from 'react';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Flex from '../../../components/Flex/Flex';
import InputField from '../../../components/InputField/InputField';
import Text from '../../../components/Text/Text';
import { useGetCart } from '../../../hooks/query/useCart';
import { usePayOrder } from '../../../hooks/query/useCheckout';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import { PAYMENT_TYPE } from './PaymentType';
import classes from './PaymentTypeForm.module.scss';

const PaymentTypeForm = ({
  paymentValue,
  onChangeReceivedMoney,
  receivedValue,
  orderType,
  total,
  onSuccess,
}) => {
  const [currentLang] = useCurrentLang();
  const payOrder = usePayOrder();
  const { data: cart } = useGetCart();

  console.log(payOrder.isLoading, 'loading');
  const onFinishOrderHandler = (data) => {
    payOrder.mutate(data, {
      onSuccess: onSuccess,
    });
  };
  return (
    <>
      {(paymentValue === PAYMENT_TYPE.cash ||
        paymentValue === PAYMENT_TYPE.creditCard) && (
        <Form
          onFinish={(values) =>
            onFinishOrderHandler({
              payment_type: orderType,
              paidAmount: values.paidAmount,
            })
          }
        >
          <Flex align='flex-start' direction='column' gap='20px'>
            <h3>المبلغ المستلم</h3>
            <Form.Item name='radioAmount'>
              <Radio.Group
                onChange={(value) => onChangeReceivedMoney(value)}
                value={receivedValue}
                className={classes.PaymentTypeForm__ReceivedMoney}
              >
                <Radio.Button value={'150'}>
                  <p>150ج</p>
                </Radio.Button>
                <Radio.Button value={'120'}>
                  <p>120ج</p>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='paidAmount'
              rules={[{ required: true, message: 'الرجاء ادخال المبلغ' }]}
              style={{
                width: '100%',
                marginBottom: 0,
              }}
            >
              <InputField radius='md' type='number' />
            </Form.Item>

            <Flex
              style={{ marginBottom: '10px' }}
              gap='15px'
              direction='column'
            >
              <Flex justify='space-between'>
                <Text label>
                  {locale.checkout.orderTotal.paid[currentLang]}
                </Text>
                <Text>{total} جنيه مصري</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text label>
                  {locale.checkout.orderTotal.onhold[currentLang]}
                </Text>
                <Text>{total} جنيه مصري</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text label>
                  {locale.checkout.orderTotal.nochange[currentLang]}
                </Text>
                <Text color='success'>{total} جنيه مصري</Text>
              </Flex>
            </Flex>
          </Flex>
          <DiscountInputs />
          <FormButtons isLoading={payOrder.isLoading} />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.hotel && (
        <Form
          onFinish={(values) =>
            onFinishOrderHandler({
              payment_type: orderType,
              paidAmount: cart?.total,
              room_num: +values.room_num,
            })
          }
        >
          <h3 className={classes.PaymentTypeForm__Form__Label}>رقم الغرفة</h3>
          <Form.Item
            name='room_num'
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type='number' radius='md' />
          </Form.Item>
          <DiscountInputs />
          <FormButtons isLoading={payOrder.isLoading} />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.employee && (
        <Form
          onFinish={(values) =>
            onFinishOrderHandler({
              payment_type: orderType,
              paidAmount: cart?.total,
              customer_id: +values.values.customer_id,
            })
          }
        >
          <h3 className={classes.PaymentTypeForm__Form__Label}>رقم الموظف</h3>
          <Form.Item
            name='customer_id'
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type='number' radius='md' />
          </Form.Item>
          <DiscountInputs />
          <FormButtons isLoading={payOrder.isLoading} />
        </Form>
      )}
    </>
  );
};

export default PaymentTypeForm;

const FormButtons = ({ onCancel, isLoading }) => {
  const [currentLang] = useCurrentLang();
  return (
    <Flex gap='20px'>
      <Button
        type='primary'
        htmlType='submit'
        fullwidth
        size='lg'
        isLoading={isLoading}
      >
        {locale.checkout.orderTotal.order[currentLang]}
      </Button>
      <Button
        type='danger'
        htmlType='button'
        size='lg'
        onClick={onCancel}
        fullwidth
      >
        {locale.checkout.orderTotal.canelOrder[currentLang]}
      </Button>
    </Flex>
  );
};

const DiscountInputs = () => {
  const [isDiscount, setIsDiscount] = useState(false);
  return (
    <>
      <Form.Item
        onChange={(e) => setIsDiscount(e.target.checked)}
        label='تخفيض'
        name='discount'
      >
        <Checkbox checked={isDiscount} />
      </Form.Item>
      {isDiscount && (
        <Form.Item name='discount-amount'>
          <InputField />
        </Form.Item>
      )}
    </>
  );
};
