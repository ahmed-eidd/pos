import { SwapOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Button, Descriptions, Input, message, Popconfirm, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import useCancelOrder from '../../../api-hooks/useCancelOrder';
import InvoiceCopy from '../../../components/InvoiceCopy/InvoiceCopy';
import ModalSelectTable from '../../../components/ModalSelectTable';
import { currencyFormat } from '../../../services/utils';
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from '../../../store/cartSlice';

const SingleSavedOrder = ({ order, setCancelOrderItems, closeModal }) => {
  const SingleSavedOrderStyles = css`
    border-radius: 4px;
    direction: rtl;
    &:not(:first-child) {
      padding-top: 20px;
      border-top: 1px solid #ddd;
    }

    .ant-descriptions-item-label {
      white-space: nowrap;
    }
    .ant-descriptions-item-content {
      white-space: nowrap;
      font-size: 12px;
      font-weight: 600;
      &.big {
        font-size: 16px;
      }
    }
  `;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cancelOrder, cancelOrderLod } = useCancelOrder();
  const [isSelectTableModal, setIsSelectTableModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [password, setPassword] = useState('');

  const handleCancelOrder = () => {
    console.log('password:', password);
    if (!password) return message.warning('الرجاء إدخال كلمة مرور');

    const fd = new FormData();
    fd.append('order_id', order?.id);
    fd.append('password', password);

    cancelOrder({
      fd,
      onSuc: res => {
        setCancelOrderItems(res?.data?.order_items);
        handleCloseModal();
      },
    });
    setPassword('');
  };

  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });

  const handleCloseModal = () => {
    if (closeModal) closeModal();
  };

  return (
    <>
      <div className={SingleSavedOrderStyles}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="رقم الطلب" className="big">
            {order?.id}
          </Descriptions.Item>
          <Descriptions.Item label="رقم الطاوله" className="big">
            {String(order?.table_number)}
            <Button
              type="link"
              icon={<SwapOutlined />}
              onClick={() => setIsSelectTableModal(true)}
            />
          </Descriptions.Item>
          <Descriptions.Item label="الوقت">
            {order?.opening_time}
          </Descriptions.Item>
          <Descriptions.Item label="التاريخ">
            {order?.created_at}
          </Descriptions.Item>
          <Descriptions.Item label="الاجمالي" className="big">
            {currencyFormat(order?.total_amount)} LE
          </Descriptions.Item>
        </Descriptions>
        <Space
          style={{ marginTop: 10, width: '100%', justifyContent: 'center' }}
        >
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 'auto' }}
            onClick={() => {
              dispatch(setCartToShowSavedOrder(true));
              dispatch(setCurrentSavedOrderIdAction(order?.id));
              handleCloseModal();
              navigate('/checkout', {
                state: {
                  checkoutOrder: {
                    id: order?.id,
                    tableNumber: order?.table_number,
                  },
                },
              });
            }}
          >
            ادفع
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 'auto' }}
            ghost
            onClick={() => {
              dispatch(setCartToShowSavedOrder(true));
              dispatch(setCurrentSavedOrderIdAction(order?.id));
              handleCloseModal();
            }}
          >
            وضع الطلب للتعديل
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 'auto' }}
            onClick={() => {
              handlePrint();
              handleCloseModal();
            }}
          >
            اطبع
          </Button>
          <Popconfirm
            title={
              <div>
                <h4 style={{ marginBottom: 4 }}>هل تريد حذف الطلب؟</h4>
                <Input.Password
                  value={password}
                  onChange={({ target }) => setPassword(target?.value)}
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            }
            okText="نعم"
            cancelText="لا"
            onConfirm={handleCancelOrder}
          >
            <Button
              type="primary"
              size="large"
              danger
              style={{ minWidth: 'auto' }}
              loading={cancelOrderLod}
            >
              الغاء
            </Button>
          </Popconfirm>
        </Space>
      </div>
      {/* <div style={{ position: 'fixed', zIndex: -9 }}> */}
      <div style={{ position: 'fixed', zIndex: -9, visibility: 'hidden' }}>
        <div ref={orderRef}>
          <InvoiceCopy invoice={order} />
        </div>
      </div>
      <ModalSelectTable
        open={isSelectTableModal}
        onCancel={() => setIsSelectTableModal(false)}
        orderId={order?.id}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
      />
    </>
  );
};

export default SingleSavedOrder;
