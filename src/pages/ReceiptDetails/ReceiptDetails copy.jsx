import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import classes from './ReceiptDetails.module.scss';
import LeftArrow from '../../assets/arrow-left.png';
import Text from '../../components/Text/Text';
import CartItems from '../../components/Layout/CartSidebar/CartItems/CartItems';
import Flex from '../../components/Flex/Flex';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
// import FramerIcon from '../../assets/receipt-details/Frame.png';
import { useGetOrders } from '../../hooks/query/useOrders';
import OrderStatus from '../Orders/OrderStatus/OrderStatus';
import { currencyFormat } from '../../services/utils';
import { useReactToPrint } from 'react-to-print';
import { Button, Spin } from 'antd';
import InvoiceCopy from '../../components/InvoiceCopy/InvoiceCopy';

const ReceiptDetails = () => {
  const [currentLang] = useCurrentLang();
  const { id } = useParams();
  const { data, isFetching, isLoading } = useGetOrders(null, id);
  const orderData = data?.orders || [];

  // console.log('ReceiptDetails  orderData', orderData);
  const reviewOrderLocale = locale.reviewOrder;
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
      {/* <PageLayout contentClassName={classes.ReceiptDetails__ContentWrapper}> */}
      <Spin spinning={isLoading}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            background: '#fff',
            padding: 20,
            marginTop: 20,
          }}
        >
          <div
            style={{
              border: '1px solid #bbb',
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
      {/* <Flex
        justify="space-between"
        align="center"
        className={classes.ReceiptDetails__ContentWrapper__Titles}
      >
        <Text color="grey">
          الطلب رقم {currentOrderData?.id} طاوله رقم{' '}
          {currentOrderData?.table_number}
        </Text>
        <Text size="small">
          {currentOrderData?.created_at + ' ' + currentOrderData?.opening_time}
        </Text>
      </Flex>
      <div className={classes.ReceiptDetails__ContentWrapper__OrderDetails}>
        <Flex direction="column" align="flex-start" gap="60px">
          <Flex direction="column" align="flex-start" gap="10px">
            <OrderStatus status={currentOrderData?.status} />

            <Text>
              <span>Order Type:</span> <span>{currentOrderData?.type}</span>
            </Text>
            <Text>
              <span>Taken By:</span>{' '}
              <span>{currentOrderData?.organization_admin}</span>
            </Text>
            <Text>
              <span>Shift:</span> <span>{currentOrderData?.shift}</span>
            </Text>
          </Flex>
          <Flex direction="column" gap="10px" align="flex-start">
            <Text color="grey">المجموع</Text>
            <Flex justify="space-between">
              <Text weight="semi-bold">مجموع المبالغ المدفوعة</Text>
              <Text>
                {locale.global.currencyWithEgyptian[currentLang]}{' '}
                {currencyFormat(currentOrderData?.total_amount)}
              </Text>
            </Flex>
            <Flex justify="space-between">
              <Text weight="semi-bold">المبلغ المتبقي </Text>
              <Text>
                {locale.global.currencyWithEgyptian[currentLang]}{' '}
                {currencyFormat(currentOrderData?.remainingAmount)}{' '}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column" gap="10px" align="flex-start">
            <Text color="grey">طريقة الدفع</Text>
            <Text>{currentOrderData?.order_payment}</Text>
          </Flex>
        </Flex>
      </div>
      <div className={classes.ReceiptDetails__ContentWrapper__CartItems}>
        <Text color="grey">عناصر الطلب</Text>
        <CartItems
          readOnlyData={orderData[0]?.order_items}
          className={classes.ReceiptDetails__ContentWrapper__CartItems__Items}
          isFetching={isFetching}
        />
      </div> */}
      {/* </PageLayout> */}
    </div>
  );
};

export default ReceiptDetails;
