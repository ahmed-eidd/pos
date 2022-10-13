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

const ReceiptDetails = () => {
  const [currentLang] = useCurrentLang();
  const { id } = useParams();
  const { data: readOnlyData = [], isFetching } = useGetOrders(null, id);
  const reviewOrderLocale = locale.reviewOrder;
  return (
    <div className={classes.ReceiptDetails}>
      <Link className={classes.ReceiptDetails__Link} to='/orders'>
        <img src={LeftArrow} alt='left arrow' />
        العودة للطلبات
      </Link>
      <PageLayout contentClassName={classes.ReceiptDetails__ContentWrapper}>
        <Flex
          justify='space-between'
          align='center'
          className={classes.ReceiptDetails__ContentWrapper__Titles}
        >
          <Text color='grey'>الطلب رقم {id}</Text>
          <Text>10/05/2022 10:30 مساءً</Text>
        </Flex>
        <div className={classes.ReceiptDetails__ContentWrapper__OrderDetails}>
          <Flex direction='column' align='flex-start' gap='60px'>
            <Flex direction='column' align='flex-start' gap='10px'>
              <Text>عميل</Text>
              <Text>محمود سيف</Text>
              <Text>Msemail@gmail.com</Text>
              <Text>01234567899</Text>
            </Flex>
            <Flex direction='column' gap='10px' align='flex-start'>
              <Text color='grey'>
                {/* {reviewOrderLocale.check.title[currentLang]} */}
                المجموع
              </Text>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>مجموع المبالغ المدفوعة</Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]}{' '}
                  {readOnlyData[0]?.total_amount}
                </Text>
              </Flex>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>المبلغ المتبقي </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>المبلغ الذي تم إرجاعه </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150
                </Text>
              </Flex>
            </Flex>
            <Flex direction='column' gap='10px' align='flex-start'>
              <Text color='grey'>
                {/* {reviewOrderLocale.check.orderDetail[currentLang]} */}
                طرق الدفع
              </Text>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>
                  {reviewOrderLocale.check.cash[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>
                  {reviewOrderLocale.check.credit[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
              <Flex justify='space-between'>
                <Text weight='semi-bold'>
                  {reviewOrderLocale.check.changes[currentLang]}
                </Text>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
              </Flex>
            </Flex>

            <img style={{ margin: 'auto' }} src={FramerIcon} alt='framer' />
          </Flex>
        </div>
        <div className={classes.ReceiptDetails__ContentWrapper__CartItems}>
          <CartItems
            readOnlyData={readOnlyData[0]?.order_items}
            className={classes.ReceiptDetails__ContentWrapper__CartItems__Items}
            isFetching={isFetching}
          />
        </div>
      </PageLayout>
    </div>
  );
};

export default ReceiptDetails;
