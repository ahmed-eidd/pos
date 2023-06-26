import { Checkbox, Col, Divider, Form, Radio, Row } from 'antd';
import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import PageLayout from '../../components/PageLayout/PageLayout';
import RadioButton from '../../components/RadioButton/RadioButton';
import Text from '../../components/Text/Text';
import { useGetOrders } from '../../hooks/query/useOrders';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import OrderResultsList from './OrderResultsList/OrderResultsList';
import classes from './Orders.module.scss';

const Orders = () => {
  const [currentLang] = useCurrentLang();
  const [searchForm] = Form.useForm();
  const [searchBy, setSearchBy] = useState('orderId');
  const [searchValue, setSearchValue] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const orderLocale = locale.orders;
  const [isCanceldOrders, setIsCanceldOrders] = useState(false);
  const { data, isLoading } = useGetOrders(
    null, // for orders type ex: pending, ...etc, set to null to get all orders
    searchValue,
    orderType,
    isCanceldOrders
  );

  const ordersData = data?.orders;

  const onSearchFieldEmpty = e => {
    if (e.target.value === '') {
      setSearchValue('');
    }
  };

  const onSearchFormSubmit = values => {
    setSearchValue(values.search);
  };
  const onResetFilter = () => {
    setSearchValue(null);
    setOrderType(null);
  };

  const onChangeSearchBy = e => {
    setSearchBy(e.target.value);
  };

  return (
    <PageLayout
      contentClassName={classes.Orders}
      title={orderLocale.title[currentLang]}
    >
      <div className={classes.Orders__Radios}>
        <Row gutter={[30, 20]} justify="space-between">
          <Col>
            <div className={classes.Orders__Radios__OrderType}>
              <Text label>{orderLocale.orderType[currentLang]}</Text>
              <Radio.Group
                defaultValue={orderLocale.orderTypeLabelDelivery.en}
                className={classes.Orders__Radios__OrderType__RadioContainer}
                buttonStyle="solid"
                onChange={e => setOrderType(e.target.value)}
                value={orderType}
              >
                <RadioButton value={'delivery'} label="توصيل"></RadioButton>
                <RadioButton
                  value={'restaurant'}
                  label="في المطعم"
                ></RadioButton>
              </Radio.Group>
            </div>
          </Col>
          <Col>
            <div className={classes.Orders__Radios__SortBy}>
              <Text label>{orderLocale.sortBy[currentLang]}</Text>
              <Radio.Group
                defaultValue={orderLocale.sortBy.en}
                className={classes.Orders__Radios__SortBy__RadioContainer}
                buttonStyle="solid"
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
          </Col>
          <Col span={24}>
            <Checkbox
              style={{ fontSize: 18 }}
              checked={isCanceldOrders}
              onChange={({ target }) => setIsCanceldOrders(target.checked)}
            >
              الطلبات الملغاة
            </Checkbox>
          </Col>
        </Row>
      </div>
      <div className={classes.Orders__SearchForm}>
        <Text label>{orderLocale.searchForOrders[currentLang]}</Text>
        <Form
          form={searchForm}
          onFinish={onSearchFormSubmit}
          className={classes.Orders__SearchForm__BtnWrapper}
        >
          <Form.Item name="search" noStyle>
            <InputField
              type={searchBy === 'orderId' ? 'number' : 'text'}
              placeholder={orderLocale.searchForOrdersPlaceholder[currentLang]}
              radius="md"
              value={searchValue}
              onChange={onSearchFieldEmpty}
            />
          </Form.Item>
          <Button
            isLoading={isLoading}
            className={classes.Orders__SearchForm__BtnWrapper__Btn}
          >
            {orderLocale.searchForOrdersPlaceholder[currentLang]}
          </Button>
        </Form>
      </div>
      <div className={classes.Orders__SearchWrapper}>
        <div className={classes.Orders__SearchWrapper__SearchBy}>
          <Text label>{orderLocale.searchBy[currentLang]}</Text>
          <div className={classes.Orders__SearchWrapper__SearchBy__Options}>
            <Radio.Group value={searchBy} onChange={onChangeSearchBy}>
              <Radio value={'orderId'}>رقم إيصال </Radio>
            </Radio.Group>
          </div>
        </div>
        <Divider
          className={classes.Orders__SearchWrapper__Divider}
          type="vertical"
        />
        <div className={classes.Orders__SearchWrapper__SearchResults}>
          <Text label>{orderLocale.searchResult[currentLang]}</Text>
          <OrderResultsList isLoading={isLoading} orders={ordersData} />
        </div>
      </div>
      <Button type="danger" onClick={onResetFilter}>
        الغاء
      </Button>
    </PageLayout>
  );
};

export default Orders;
