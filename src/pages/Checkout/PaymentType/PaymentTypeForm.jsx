import { Form, Radio } from 'antd';
import React from 'react';
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
}) => {
  const [currentLang] = useCurrentLang();
  const payOrder = usePayOrder();
  const { data: cart } = useGetCart();
  return (
    <>
      {(paymentValue === PAYMENT_TYPE.cash ||
        paymentValue === PAYMENT_TYPE.creditCard) && (
        <Form
          onFinish={(values) =>
            payOrder.mutate({
              pyament_type: orderType,
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

            <Flex gap='15px' direction='column'>
              <Flex justify='space-between'>
                <Text label>
                  {locale.checkout.orderTotal.paid[currentLang]}
                </Text>
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

          <FormButtons />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.hotel && (
        <Form
          onFinish={(values) =>
            payOrder.mutate({
              payment_type: orderType,
              paidAmount: cart?.total,
              room_num: +values.room_num,
            })
          }
        >
          <h3>رقم الغرفة</h3>
          <Form.Item
            name='room_num'
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type='number' radius='md' />
          </Form.Item>
          <FormButtons />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.employee && (
        <Form
          onFinish={(values) =>
            payOrder.mutate({
              payment_type: orderType,
              paidAmount: cart?.total,
              customer_id: +values.values.customer_id,
            })
          }
        >
          <h3>رقم الموظف</h3>
          <Form.Item
            name='customer_id'
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type='number' radius='md' />
          </Form.Item>
          <FormButtons />
        </Form>
      )}
    </>
  );
};

export default PaymentTypeForm;

const FormButtons = ({ onCancel }) => {
  const [currentLang] = useCurrentLang();
  const payOrder = usePayOrder();
  return (
    <Flex gap='20px'>
      <Button
        type='primary'
        // onClick={() => navigate('/review-order')}
        htmlType='submit'
        fullwidth
        size='lg'
        isLoading={payOrder.isLoading}
      >
        {locale.checkout.orderTotal.order[currentLang]}
      </Button>
      <Button type='danger' size='lg' onClick={onCancel} fullwidth>
        {locale.checkout.orderTotal.canelOrder[currentLang]}
      </Button>
    </Flex>
  );
};
