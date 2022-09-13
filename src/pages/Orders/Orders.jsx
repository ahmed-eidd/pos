import { Divider, Radio } from 'antd';
import React from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import PageLayout from '../../components/PageLayout/PageLayout';
import RadioButton from '../../components/RadioButton/RadioButton';
import Text from '../../components/Text/Text';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import OrderResultsList from './OrderResultsList/OrderResultsList';
import classes from './Orders.module.scss';

const Orders = () => {
  const [currentLang] = useCurrentLang();
  const orderLocale = locale.orders;
  return (
    <PageLayout
      contentClassName={classes.Orders}
      title={orderLocale.title[currentLang]}
    >
      <div className={classes.Orders__Radios}>
        <div className={classes.Orders__Radios__OrderType}>
          <Text label>{orderLocale.orderType[currentLang]}</Text>
          <Radio.Group
            defaultValue={orderLocale.orderTypeLabelDelivery.en}
            className={classes.Orders__Radios__OrderType__RadioContainer}
            buttonStyle='solid'
          >
            <RadioButton
              value={orderLocale.orderTypeLabelDelivery.en}
              label={orderLocale.orderTypeLabelDelivery[currentLang]}
            />
            <RadioButton
              value={orderLocale.orderTypeLabelRestaurant.en}
              label={orderLocale.orderTypeLabelRestaurant[currentLang]}
            />
          </Radio.Group>
        </div>
        <div className={classes.Orders__Radios__SortBy}>
          <Text label>{orderLocale.sortBy[currentLang]}</Text>
          <Radio.Group
            defaultValue={orderLocale.sortBy.en}
            className={classes.Orders__Radios__SortBy__RadioContainer}
            buttonStyle='solid'
          >
            <RadioButton
              value={orderLocale.sortBy.en}
              label={orderLocale.sortBy[currentLang]}
            />
            <RadioButton
              value={orderLocale.orderTypeLabelRestaurant.en}
              label={orderLocale.orderTypeLabelRestaurant[currentLang]}
            />
          </Radio.Group>
        </div>
      </div>
      <div className={classes.Orders__SearchForm}>
        <Text label>{orderLocale.searchForOrders[currentLang]}</Text>
        <div className={classes.Orders__SearchForm__BtnWrapper}>
          <InputField
            placeholder={orderLocale.searchForOrdersPlaceholder[currentLang]}
            radius='md'
          />
          <Button className={classes.Orders__SearchForm__BtnWrapper__Btn}>
            {orderLocale.searchForOrdersPlaceholder[currentLang]}
          </Button>
        </div>
      </div>
      <div className={classes.Orders__SearchWrapper}>
        <div className={classes.Orders__SearchWrapper__SearchBy}>
          <Text label>{orderLocale.searchBy[currentLang]}</Text>
          <div className={classes.Orders__SearchWrapper__SearchBy__Options}>
            <Radio>رقم إيصال </Radio>
          </div>
        </div>
        <Divider
          className={classes.Orders__SearchWrapper__Divider}
          type='vertical'
        />
        <div className={classes.Orders__SearchWrapper__SearchResults}>
          <Text label>{orderLocale.searchResult[currentLang]}</Text>
          <OrderResultsList />
        </div>
      </div>
      <Button type='danger'>الغاء</Button>
    </PageLayout>
  );
};

export default Orders;
