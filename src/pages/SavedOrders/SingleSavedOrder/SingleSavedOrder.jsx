import { css } from '@emotion/css';
import { Button, Descriptions, Space } from 'antd';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import InvoiceCopy from '../../../components/InvoiceCopy/InvoiceCopy';
import { currencyFormat } from '../../../services/utils';
import {
  setCartToShowSavedOrder,
  setCurrentSavedOrderIdAction,
} from '../../../store/cartSlice';

const SingleSavedOrder = ({ onClick, order }) => {
  console.log('SingleSavedOrder  order:', order);
  const SingleSavedOrderStyles = css`
    border-radius: 4px;
    direction: rtl;
    &:not(:first-child) {
      padding-top: 20px;
      border-top: 1px solid #ddd;
      /* border-top: none; */
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

  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });

  return (
    <>
      <div className={SingleSavedOrderStyles}>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="رقم الطلب" className="big">
            {order?.id}
          </Descriptions.Item>
          <Descriptions.Item label="رقم الطاوله" className="big">
            {String(order?.table_number)}
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
            style={{ minWidth: 100 }}
            onClick={() => {
              dispatch(setCartToShowSavedOrder(true));
              dispatch(setCurrentSavedOrderIdAction(order?.id));
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
            ghost
            size="large"
            style={{ minWidth: 100 }}
            onClick={() => {
              dispatch(setCartToShowSavedOrder(true));
              dispatch(setCurrentSavedOrderIdAction(order?.id));
            }}
          >
            وضع الطلب للتعديل
          </Button>
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 100 }}
            onClick={handlePrint}
          >
            اطبع
          </Button>
        </Space>
      </div>
      <div style={{ position: 'fixed', zIndex: -9 }}>
        <div ref={orderRef}>
          <InvoiceCopy invoice={order} />
        </div>
      </div>
    </>
  );
};

export default SingleSavedOrder;
