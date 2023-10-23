import { css } from '@emotion/css';
import { Button, Col, Form, Radio, Row, Space } from 'antd';
import { useState } from 'react';
import InputField from '../components/InputField/InputField';
import PageLayout from '../components/PageLayout/PageLayout';
import RadioButton from '../components/RadioButton/RadioButton';
import Text from '../components/Text/Text';
import { useGetOrders } from '../hooks/query/useOrders';
import { useCurrentLang } from '../hooks/useCurrentLang';
import { locale } from '../locale';
import OrderResultsList from './Orders/OrderResultsList/OrderResultsList';

function CanceledOrders() {
  const CanceledOrdersStyles = css`
    label.label {
      display: block;
      font-weight: 500;
      font-size: 16px;
      color: #777;
      margin-inline-end: 8px;
      margin-bottom: 5px;
    }
    .radio-wrapper {
    }

    .search-form {
      margin: 20px 0;
      width: 493px;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;
      font-weight: 500;
      // justify-content: center;
      // align-items: center;

      .btn-wrapper {
        display: flex;
        width: 100%;

        .btn {
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
          margin-left: -10px;
          width: 103px !important;
          height: 44px !important;
        }
      }
    }
  `;

  const [searchBy, setSearchBy] = useState('orderId');
  const [currentLang] = useCurrentLang();
  const [searchForm] = Form.useForm();
  const [searchValue, setSearchValue] = useState(null);
  const [orderType, setOrderType] = useState(null);
  const orderLocale = locale.orders;

  const { data, isLoading } = useGetOrders(
    null, // for orders type ex: pending, ...etc, set to null to get all orders
    searchValue,
    orderType,
    true // for canceled orders
  );

  const ordersData = data?.orders;
  console.log('CanceledOrders  data:', data);
  console.log('CanceledOrders  ordersData:', ordersData);

  //   const onChangePagination = page => {
  //     console.log(page);
  //   };

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

  return (
    <PageLayout contentClassName={CanceledOrdersStyles} title="الطلبات الملغاة">
      <div className={CanceledOrdersStyles}>
        <Row gutter={[30, 20]} justify="space-between">
          <Col>
            <div className="radio-wrapper">
              <label className="label">{orderLocale.orderType[currentLang]}</label>
              <Radio.Group
                defaultValue={orderLocale.orderTypeLabelDelivery.en}
                buttonStyle="solid"
                onChange={e => setOrderType(e.target.value)}
                value={orderType}>
                <Space>
                  <RadioButton value={'delivery'} label="توصيل"></RadioButton>
                  <RadioButton value={'restaurant'} label="في المطعم"></RadioButton>
                </Space>
              </Radio.Group>
            </div>
          </Col>
          <Col>
            <div className="radio-wrapper">
              <label className="label">{orderLocale.sortBy[currentLang]}</label>
              <Radio.Group defaultValue={orderLocale.sortBy.en} buttonStyle="solid">
                <Space>
                  <RadioButton value={orderLocale.orderTypeLabelDelivery.en} label={orderLocale.orderTypeLabelDelivery[currentLang]} />
                  <RadioButton value={orderLocale.orderTypeLabelRestaurant.en} label={orderLocale.orderTypeLabelRestaurant[currentLang]} />
                </Space>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <div className="search-form">
          <label className="label">{orderLocale.searchForOrders[currentLang]}</label>
          <Form form={searchForm} onFinish={onSearchFormSubmit} className="btn-wrapper">
            <Form.Item name="search" noStyle>
              <InputField
                type={searchBy === 'orderId' ? 'number' : 'text'}
                placeholder={orderLocale.searchForOrdersPlaceholder[currentLang]}
                radius="md"
                value={searchValue}
                onChange={onSearchFieldEmpty}
              />
            </Form.Item>
            <Button htmlType="submit" type="primary" isLoading={isLoading} className="btn">
              {orderLocale.searchForOrdersPlaceholder[currentLang]}
            </Button>
          </Form>
        </div>

        <div className="orders-wrapper">
          <label className="label">{orderLocale.searchResult[currentLang]}</label>
          <OrderResultsList
            isLoading={isLoading}
            orders={ordersData}
            pagination={data?.pagination}
            canceledOrders
            //   onChangePagination={onChangePagination}
          />
        </div>
      </div>
    </PageLayout>
  );
}

export default CanceledOrders;
