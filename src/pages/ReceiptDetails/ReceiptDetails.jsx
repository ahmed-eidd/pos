import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageLayout from '../../components/PageLayout/PageLayout';
import classes from './ReceiptDetails.module.scss';
import LeftArrow from '../../assets/arrow-left.png';
import Text from '../../components/Text/Text';
import CartItems from '../../components/Layout/CartSidebar/CartItems/CartItems';
import Flex from '../../components/Flex/Flex';
import { locale } from '../../locale';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import FramerIcon from '../../assets/receipt-details/Frame.png';
import { useGetOrders } from '../../hooks/query/useOrders';
import OrderStatus from '../Orders/OrderStatus/OrderStatus';
import { currencyFormat } from '../../services/utils';

const ReceiptDetails = () => {
  const [currentLang] = useCurrentLang();
  const { id } = useParams();
  const { data: orderData = [], isFetching } = useGetOrders(null, id);
  console.log('ReceiptDetails  orderData', orderData);
  const reviewOrderLocale = locale.reviewOrder;
  const currentOrderData = orderData[0];
  return (
    <div className={classes.ReceiptDetails}>
      <Link className={classes.ReceiptDetails__Link} to="/orders">
        <img src={LeftArrow} alt="left arrow" />
        العودة للطلبات
      </Link>
      <PageLayout contentClassName={classes.ReceiptDetails__ContentWrapper}>
        <Flex
          justify="space-between"
          align="center"
          className={classes.ReceiptDetails__ContentWrapper__Titles}
        >
          <Text color="grey">
            الطلب رقم {currentOrderData?.id} طاوله رقم{' '}
            {currentOrderData?.table_number}
          </Text>
          {/* <Text>{currentOrderData?.created_at}</Text> */}
          <Text size="small">
            {currentOrderData?.created_at +
              ' ' +
              currentOrderData?.opening_time}
          </Text>
        </Flex>
        <div className={classes.ReceiptDetails__ContentWrapper__OrderDetails}>
          <Flex direction="column" align="flex-start" gap="60px">
            {/* <Flex direction="column" align="flex-start" gap="10px">
              <Text>عميل</Text>
              <Text>محمود سيف</Text>
              <Text>Msemail@gmail.com</Text>
              <Text>01234567899</Text>
            </Flex> */}
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
              <Text color="grey">
                {/* {reviewOrderLocale.check.title[currentLang]} */}
                المجموع
              </Text>
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
              {/* <Flex justify="space-between">
                <Text weight="semi-bold">المبلغ الذي تم إرجاعه </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150
                </Text>
              </Flex> */}
            </Flex>
            <Flex direction="column" gap="10px" align="flex-start">
              <Text color="grey">
                {/* {reviewOrderLocale.check.orderDetail[currentLang]} */}
                طريقة الدفع
              </Text>
              <Text>{currentOrderData?.order_payment}</Text>
              {/* <Flex justify="space-between">
                <Text weight="semi-bold">
                  {reviewOrderLocale.check.cash[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text weight="semi-bold">
                  {reviewOrderLocale.check.credit[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
              <Flex justify="space-between">
                <Text weight="semi-bold">
                  {reviewOrderLocale.check.changes[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex> */}
            </Flex>

            {/* <img style={{ margin: 'auto' }} src={FramerIcon} alt="framer" /> */}
          </Flex>
        </div>
        <div className={classes.ReceiptDetails__ContentWrapper__CartItems}>
          <Text color="grey">
            {/* {reviewOrderLocale.check.orderDetail[currentLang]} */}
            عناصر الطلب
          </Text>
          <CartItems
            readOnlyData={orderData[0]?.order_items}
            className={classes.ReceiptDetails__ContentWrapper__CartItems__Items}
            isFetching={isFetching}
          />
        </div>
      </PageLayout>
    </div>
  );
};

export default ReceiptDetails;
