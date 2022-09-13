import { Divider } from 'antd';
import React from 'react';
import Button from '../../components/Button/Button';
import Flex from '../../components/Flex/Flex';
import CartItems from '../../components/Layout/CartSidebar/CartItems/CartItems';
import Text from '../../components/Text/Text';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import classes from './ReviewOrder.module.scss';

const ReviewOrder = () => {
  const [currentLang] = useCurrentLang();
  const reviewOrderLocale = locale.reviewOrder;
  return (
    <div className={classes.ReviewOrder}>
      <h3>مراجعة الطلب</h3>
      <div className={classes.ReviewOrder__Wrapper}>
        <div className={classes.ReviewOrder__Wrapper__Content}>
          <div className={classes.ReviewOrder__Wrapper__Content__CartItems}>
            <CartItems
              className={
                classes.ReviewOrder__Wrapper__Content__CartItems__Items
              }
            />
          </div>
          <div className={classes.ReviewOrder__Wrapper__Content__Check}>
            <Flex direction='column' gap='15px' align='flex-end'>
              <Text label>{reviewOrderLocale.check.title[currentLang]}</Text>
              <Flex justify='space-between'>
                <Text color='primary'>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>{reviewOrderLocale.check.total[currentLang]}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>
                  {reviewOrderLocale.check.shipping[currentLang]}
                </Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>12%</Text>
                <Text label>{reviewOrderLocale.check.tax[currentLang]}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text color='success'>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>
                  {reviewOrderLocale.check.discount[currentLang]}
                </Text>
              </Flex>
            </Flex>
            <Divider
              style={{
                marginBottom: '15px !important',
              }}
            />
            <Flex direction='column' gap='15px' align='flex-end'>
              <Text label>
                {reviewOrderLocale.check.orderDetail[currentLang]}
              </Text>
              <Flex justify='space-between'>
                <Text color='primary'>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>{reviewOrderLocale.check.cash[currentLang]}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>{reviewOrderLocale.check.credit[currentLang]}</Text>
              </Flex>
              <Flex justify='space-between'>
                <Text>
                  {locale.global.currencyWithEgyptian[currentLang]} 150{' '}
                </Text>
                <Text label>
                  {reviewOrderLocale.check.changes[currentLang]}
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
        <div className={classes.ReviewOrder__Wrapper__Actions}>
          <Button type='primary' fullwidth>
            {reviewOrderLocale.actions.printCheck[currentLang]}
          </Button>
          <Button type='primary' fullwidth>
            {reviewOrderLocale.actions.email[currentLang]}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
