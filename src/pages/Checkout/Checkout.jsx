import { css } from '@emotion/css';
import { Button, Col, message, Row, Space } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSaveOrder from '../../api-hooks/useSaveOrder';

import { useCurrentCartItems } from '../../hooks/useCurrentCartItems';
import CheckoutItems from './CheckoutItems/CheckoutItems';
import CheckoutTotal from './CheckoutTotal/CheckoutTotal';
import OrderType from './OrderType/OrderType';
import PaymentType, { PAYMENT_TYPE } from './PaymentType/PaymentType';
import SelectTable from './SelectTable';

const Checkout = () => {
  const CheckoutStyles = css`
    .col-start {
    }
    .col-end {
      min-width: 21rem;
    }
  `;
  const { state } = useLocation();
  const checkoutOrder = state?.checkoutOrder;
  console.log('Checkout  checkoutOrder:', checkoutOrder);
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('restaurant');
  const [placeId, setPlaceId] = useState(null);
  const [tableId, setTableId] = useState(null);
  console.log('Checkout  orderType:', orderType);
  const [receivedValue, setReceivedValue] = useState('delivery');
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.cash);
  const { saveOrder, saveOrderLod } = useSaveOrder();

  const { data: cart } = useCurrentCartItems();

  const onChangeOrderType = ({ target: { value: val } }) => {
    setOrderType(val);
  };
  const onChangePaymentType = ({ target: { value: val } }) => {
    setPaymentType(val);
  };
  const onChangeReceivedMoney = ({ target: { value: val } }) => {
    setReceivedValue(val);
  };

  const handleSaveOrder = () => {
    if (!placeId || !tableId)
      return message.warning('برجاء اختيار الطاوله اولا');

    const data = { placeId, tableId };
    saveOrder({ data });
  };

  return (
    <div className={CheckoutStyles}>
      <Row gutter={20}>
        <Col span={15}>
          <div className="col-start">
            {!checkoutOrder && (
              <OrderType value={orderType} onChange={onChangeOrderType} />
            )}
            {checkoutOrder || orderType === 'delivery' ? (
              <PaymentType
                total={cart?.total}
                orderType={orderType}
                paymentValue={paymentType}
                onChangePaymentType={onChangePaymentType}
                receivedValue={receivedValue}
                onChangeReceivedMoney={onChangeReceivedMoney}
                checkoutOrder={checkoutOrder}
              />
            ) : (
              <div>
                <SelectTable
                  placeId={placeId}
                  setPlaceId={setPlaceId}
                  tableId={tableId}
                  setTableId={setTableId}
                />
                <Space
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 30,
                  }}
                >
                  <Button
                    type="primary"
                    size="large"
                    style={{ minHeight: 50, minWidth: 150 }}
                    block
                    danger
                    onClick={() => navigate(-1)}
                  >
                    رجوع
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{ minHeight: 50, minWidth: 150 }}
                    block
                    loading={saveOrderLod}
                    onClick={handleSaveOrder}
                  >
                    حفظ
                  </Button>
                </Space>
              </div>
            )}
          </div>
        </Col>
        <Col span={9}>
          <div className="col-end">
            <CheckoutItems />
            <CheckoutTotal total={cart?.total} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
