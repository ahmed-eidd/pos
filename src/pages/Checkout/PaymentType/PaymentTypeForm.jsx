import { Form, Input, message, Popconfirm, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button/Button";
import Flex from "../../../components/Flex/Flex";
import InputField from "../../../components/InputField/InputField";
import Text from "../../../components/Text/Text";
import { useGetCart } from "../../../hooks/query/useCart";
import { usePayOrder } from "../../../hooks/query/useCheckout";
import { useCurrentLang } from "../../../hooks/useCurrentLang";
import { locale } from "../../../locale";
import { currencyFormat } from "../../../services/utils";
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from "../../../store/cartSlice";
import DiscountInputs, { DISCOUNT_TYPE } from "./DiscountInput";
import { PAYMENT_TYPE } from "./PaymentType";
import classes from "./PaymentTypeForm.module.scss";
import {
  useGetClientsForHotel,
  useGetRoomsForHotel,
} from "../../../api-hooks/useGetClientsForHotel";

const PaymentTypeForm = ({
  paymentValue,
  onChangeReceivedMoney,
  receivedValue,
  orderType,
  total,
  onSuccess,
  checkoutOrder,
}) => {
  const [form] = Form.useForm();
  const [currentLang] = useCurrentLang();
  const payOrder = usePayOrder();
  const roomWatcher = Form.useWatch("room_num", form);
  const { data: cart } = useGetCart();
  const { data: clients } = useGetClientsForHotel(roomWatcher);
  const { data: rooms, isLoading: roomsIsLoading } = useGetRoomsForHotel(
    paymentValue === PAYMENT_TYPE.hotel,
  );
  const dispatch = useDispatch();

  const [isDiscount, setIsDiscount] = useState(false);
  const [discountType, setDiscountType] = useState(DISCOUNT_TYPE.value);
  const [discountValue, setDiscountValue] = useState("");
  const [passwordDiscount, setPasswordDiscount] = useState("");

  const onDiscoutTypChange = (e) => {
    setDiscountType(e.target.value);
    setDiscountValue("");
  };
  const onDiscountValueChange = (value) => {
    setDiscountValue(value);
  };
  // const onDiscountValueChange = e => {
  //   setDiscountValue(e.target.value);
  // };
  const onFinishOrderHandler = (values) => {
    // console.log('onFinishOrderHandler  values:', values);
    // console.log('onFinishOrderHandler  paymentValue:', paymentValue);
    // return;
    const data = {
      order_type: orderType,
      payment_type: paymentValue,
      ...values,
      // paidAmount: values.paidAmount,
    };
    if (checkoutOrder) {
      data.order_id = checkoutOrder?.id;
      data.table_number = checkoutOrder?.tableNumber;
    }
    if (paymentValue === "hotel") {
      data.room_id = values?.room_num;
      data.customer_id = values?.customer_id;
    }

    if (isDiscount) {
      data.discount_type = discountType;
      data.discount = discountValue;
      data.password = passwordDiscount;
    }

    // console.log('onFinishOrderHandler  data', data);
    // return null;
    payOrder.mutate(data, {
      onSuccess: (res) => {
        dispatch(setCartToShowSavedOrder(false));
        dispatch(setCurrentSavedOrderIdAction(null));
        onSuccess && onSuccess(res);
      },
    });
  };

  const onHospitality = () => {
    const values = form.getFieldsValue();
    // console.log('onHospitality  values:', values);
    const data = {
      order_type: orderType,
      payment_type: paymentValue,
      ...values,
      // paidAmount: values.paidAmount,
    };
    if (checkoutOrder) {
      data.order_id = checkoutOrder?.id;
      data.table_number = checkoutOrder?.tableNumber;
    }
    if (paymentValue === "hotel") {
      data.room_num = values?.room_num;
      data.customer_id = values?.customer_id;
    }

    data.discount_type = "percentage";
    data.discount = 100;
    data.password = passwordDiscount;

    // data.password = prompt('برجاء أدخل كلمة المرور');
    if (!data.password)
      return message.error("برجاء أدخل كلمة المرور بصورة صحيحة");
    // return null;
    payOrder.mutate(data, {
      onSuccess: (res) => {
        dispatch(setCartToShowSavedOrder(false));
        dispatch(setCurrentSavedOrderIdAction(null));
        onSuccess && onSuccess(res);
      },
    });
  };
  return (
    <>
      {(paymentValue === PAYMENT_TYPE.cash ||
        paymentValue === PAYMENT_TYPE.visa ||
        paymentValue === PAYMENT_TYPE.creditCard) && (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinishOrderHandler}
          dir={currentLang === "ar" ? "rtl" : "ltr"}
        >
          <Flex align="flex-start" direction="column" gap="20px">
            <Flex
              style={{ marginBottom: "10px" }}
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
            password={passwordDiscount}
            setPassword={setPasswordDiscount}
          />
          <Flex style={{ marginBottom: "10px" }} gap="15px" direction="column">
            <Form.Item
              name="multi_serials"
              label="الرقم التسلسلي"
              style={{
                width: "100%",
                marginBottom: 0,
              }}
            >
              <Input
                style={{ width: "100%", height: 50, borderRadius: 10 }}
                placeholder=" الرقم التسلسلي (اختياري)"
              />
            </Form.Item>
          </Flex>
          <FormButtons
            isLoading={payOrder.isLoading}
            hideCancel
            onHospitality={onHospitality}
            password={passwordDiscount}
            setPassword={setPasswordDiscount}
          />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.hotel && (
        <Form
          form={form}
          onFinish={(values) => {
            onFinishOrderHandler({
              paidAmount: cart?.total,
              room_num: values.room_num,
              customer_id: values.customer_id,
            });
          }}
          layout="vertical"
        >
          <Form.Item
            name="room_num"
            label="رقم الغرفة"
            rules={[{ required: true, message: "الرجاء ادخال رقم الغرفة" }]}
          >
            <Select
              loading={roomsIsLoading}
              options={rooms}
              fieldNames={{ label: "room_num", value: "id" }}
              showSearch
              size="large"
            />
            {/* <InputField type='number' radius='md' /> */}
          </Form.Item>
          <Form.Item
            label="رقم العميل"
            name="customer_id"
            rules={[{ required: true, message: "الرجاء ادخال رقم العميل" }]}
          >
            {/* <InputField type='number' radius='md' /> */}
            <Select
              size="large"
              options={clients}
              fieldNames={{ value: "id", label: "name" }}
              showSearch
            />
          </Form.Item>
          <DiscountInputs
            discountType={discountType}
            discountValue={discountValue}
            isDiscount={isDiscount}
            onDiscountValueChange={onDiscountValueChange}
            onDiscoutTypeChange={onDiscoutTypChange}
            setIsDiscount={setIsDiscount}
            password={passwordDiscount}
            setPassword={setPasswordDiscount}
          />

          <FormButtons
            isLoading={payOrder.isLoading}
            onHospitality={onHospitality}
            password={passwordDiscount}
            setPassword={setPasswordDiscount}
          />
        </Form>
      )}
      {paymentValue === PAYMENT_TYPE.employee && (
        <Form
          form={form}
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
            name="customer_id"
            rules={[{ required: true, message: "الرجاء ادخال رقم الموظف" }]}
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
            password={passwordDiscount}
            setPassword={setPasswordDiscount}
          />
        </Form>
      )}
    </>
  );
};

export default PaymentTypeForm;

const FormButtons = ({
  onCancel,
  isLoading,
  hideCancel,
  onHospitality,
  password,
  setPassword,
}) => {
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

      <Popconfirm
        title={
          <div>
            <h4 style={{ marginBottom: 5 }}>برجاء أدخل كلمة المرور</h4>
            <Input.Password
              value={password}
              onChange={({ target }) => setPassword(target?.value)}
              placeholder="أدخل كلمة المرور"
              className="InputNumber"
            />
          </div>
        }
        description={
          <Input.Password
            size="large"
            value={password}
            onChange={({ target }) => setPassword(target?.value)}
            placeholder="أدخل كلمة المرور"
            className="InputNumber"
          />
        }
        onConfirm={onHospitality}
      >
        <Button
          type="primary"
          ghost
          htmlType="button"
          fullwidth
          size="lg"
          isLoading={isLoading}
        >
          ضيافة
        </Button>
      </Popconfirm>
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
