import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from './ReceiptDetails.module.scss';
import LeftArrow from '../../assets/arrow-left.png';
import { useGetOrders } from '../../hooks/query/useOrders';
import { useReactToPrint } from 'react-to-print';
import { Button, Spin } from 'antd';
import InvoiceCopy from '../../components/InvoiceCopy/InvoiceCopy';

const ReceiptDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetOrders(null, id);
  console.log('ReceiptDetails  data:', data);
  const orderData = data?.orders || [];

  const currentOrderData = orderData[0];
  console.log('ReceiptDetails  currentOrderData:', currentOrderData);

  const orderRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => orderRef.current,
  });

  return (
    <div className={classes.ReceiptDetails}>
      <Link className={classes.ReceiptDetails__Link} to="/orders">
        <img src={LeftArrow} alt="left arrow" />
        العودة للطلبات
      </Link>
      <Spin spinning={isLoading}>
        <div
          style={{
            padding: 20,
            marginTop: 20,
            minHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 25,
            background: '#fff',
          }}
        >
          <div
            style={{
              border: '1px solid #bbb',
              borderRadius: 4,
            }}
          >
            <div ref={orderRef}>
              <InvoiceCopy invoice={currentOrderData} />
            </div>
          </div>
          <Button
            type="primary"
            size="large"
            style={{ minWidth: 250 }}
            onClick={() => {
              handlePrint();
            }}
          >
            اطبع
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default ReceiptDetails;
