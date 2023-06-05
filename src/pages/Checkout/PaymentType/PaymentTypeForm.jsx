import { Form, Radio } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button/Button';
import Flex from '../../../components/Flex/Flex';
import InputField from '../../../components/InputField/InputField';
import Text from '../../../components/Text/Text';
import { useGetCart } from '../../../hooks/query/useCart';
import { usePayOrder } from '../../../hooks/query/useCheckout';
import { useCurrentLang } from '../../../hooks/useCurrentLang';
import { locale } from '../../../locale';
import { currencyFormat } from '../../../services/utils';
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from '../../../store/cartSlice';
import DiscountInputs, { DISCOUNT_TYPE } from './DiscountInput';
import { PAYMENT_TYPE } from './PaymentType';
import classes from './PaymentTypeForm.module.scss';

const PaymentTypeForm = ({
  paymentValue,
  onChangeReceivedMoney,
  receivedValue,
  orderType,
  total,
  onSuccess,
  checkoutOrder,
}) => {
  const [currentLang] = useCurrentLang();
  const payOrder = usePayOrder();
  const { data: cart } = useGetCart();
  const dispatch = useDispatch();

  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState(DISCOUNT_TYPE.percentage);
  const [discountValue, setDiscountValue] = useState('');
  const onDiscoutTypChange = e => {
    setDiscountType(e.target.value);
    setDiscountValue('');
  };
  const onDiscountValueChange = e => {
    setDiscountValue(e.target.value);
  };
  const onFinishOrderHandler = values => {
    const data = {
      order_type: orderType,
      payment_type: paymentValue,
      paidAmount: values.paidAmount,
    };
    if (checkoutOrder) {
      data.order_id = checkoutOrder?.id;
      data.table_number = checkoutOrder?.tableNumber;
    }
    console.log('onFinishOrderHandler  data', data);
    // return null;
    payOrder.mutate(
      {
        ...data,
        ...(isDiscount
          ? { discount_type: discountType, discount: discountValue }
          : {}),
      },
      {
        onSuccess: res => {
          dispatch(setCartToShowSavedOrder(false));
          dispatch(setCurrentSavedOrderIdAction(null));
          onSuccess && onSuccess(res);
        },
      }
    );
  };
  return (
    <>
      {(paymentValue === PAYMENT_TYPE.cash ||
        paymentValue === PAYMENT_TYPE.visa ||
        paymentValue === PAYMENT_TYPE.creditCard) && (
        <Form
          onFinish={onFinishOrderHandler}
          dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
        >
          <Flex align="flex-start" direction="column" gap="20px">
            <h3>المبلغ المستلم</h3>
            {/* <Form.Item name="radioAmount">
              <Radio.Group
                onChange={value => onChangeReceivedMoney(value)}
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
            </Form.Item> */}
            <Form.Item
              name="paidAmount"
              rules={[{ required: true, message: 'الرجاء ادخال المبلغ' }]}
              style={{
                width: '100%',
                marginBottom: 0,
              }}
            >
              <InputField
                radius="md"
                type="number"
                placeholder="ادخال المبلغ"
              />
            </Form.Item>
            {/* <Form.Item
              name="table_number"
              rules={[{ required: true, message: 'ادخل رقم الطاوله' }]}
              style={{
                width: '100%',
                marginBottom: 0,
              }}
            >
              <InputField radius="md" type="number" placeholder="رقم الطاوله" />
            </Form.Item> */}

            <Flex
              style={{ marginBottom: '10px' }}
              gap="15px"
              direction="column"
            >
              <Flex justify="space-between">
                <Text label>
                  {locale.checkout.orderTotal.paid[currentLang]}
                </Text>
                <Text>{currencyFormat(total)} جنيه مصري</Text>
              </Flex>
              <Flex justify="space-between">
                <Text label>
                  {locale.checkout.orderTotal.onhold[currentLang]}
                </Text>
                <Text>{currencyFormat(total)} جنيه مصري</Text>
              </Flex>
              <Flex justify="space-between">
                <Text label>
                  {locale.checkout.orderTotal.nochange[currentLang]}
                </Text>
                <Text color="success">{currencyFormat(total)} جنيه مصري</Text>
              </Flex>
            </Flex>
          </Flex>
          <DiscountInputs
            discountType={discountType}
            discountValue={discountValue}
            isDiscount={isDiscount}
            onDiscountValueChange={onDiscountValueChange}
            onDiscoutTypeChange={onDiscoutTypChange}
            setIsDiscount={setIsDiscount}
          />
          <FormButtons isLoading={payOrder.isLoading} hideCancel />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.hotel && (
        <Form
          onFinish={values =>
            onFinishOrderHandler({
              payment_type: orderType,
              paidAmount: cart?.total,
              room_num: +values.room_num,
            })
          }
        >
          <h3 className={classes.PaymentTypeForm__Form__Label}>رقم الغرفة</h3>
          <Form.Item
            name="room_num"
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type="number" radius="md" />
          </Form.Item>
          <DiscountInputs
            discountType={discountType}
            discountValue={discountValue}
            isDiscount={isDiscount}
            onDiscountValueChange={onDiscountValueChange}
            onDiscoutTypeChange={onDiscoutTypChange}
            setIsDiscount={setIsDiscount}
          />
          <FormButtons isLoading={payOrder.isLoading} />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.employee && (
        <Form
          onFinish={values =>
            onFinishOrderHandler({
              payment_type: orderType,
              paidAmount: cart?.total,
              customer_id: +values.values.customer_id,
            })
          }
        >
          <h3 className={classes.PaymentTypeForm__Form__Label}>رقم الموظف</h3>
          <Form.Item
            name="customer_id"
            rules={[{ required: true, message: 'الرجاء ادخال رقم الموظف' }]}
          >
            <InputField type="number" radius="md" />
          </Form.Item>
          <DiscountInputs />
          <DiscountInputs
            discountType={discountType}
            discountValue={discountValue}
            isDiscount={isDiscount}
            onDiscountValueChange={onDiscountValueChange}
            onDiscoutTypeChange={onDiscoutTypChange}
            setIsDiscount={setIsDiscount}
          />
        </Form>
      )}
    </>
  );
};

export default PaymentTypeForm;

const FormButtons = ({ onCancel, isLoading, hideCancel }) => {
  const [currentLang] = useCurrentLang();
  return (
    <Flex gap="20px">
      <Button
        type="primary"
        htmlType="submit"
        fullwidth
        size="lg"
        isLoading={isLoading}
      >
        {locale.checkout.orderTotal.order[currentLang]}
      </Button>
      {!hideCancel && (
        <Button
          type="danger"
          htmlType="button"
          size="lg"
          onClick={onCancel}
          fullwidth
        >
          {locale.checkout.orderTotal.canelOrder[currentLang]}
        </Button>
      )}
    </Flex>
  );
};
