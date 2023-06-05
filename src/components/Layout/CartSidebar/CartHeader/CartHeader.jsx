import React, { useState } from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { useRemoveAllCartItems } from '../../../../hooks/query/useCart';
import Flex from '../../../Flex/Flex';

import Spinner from '../../../Spinner/Spinner';
import { Popconfirm, Button as ButtonAnt } from 'antd';
import Button from '../../../Button/Button';
import { useSaveOrder } from '../../../../hooks/query/useOrders';
import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../../service/api';
import { currencyFormat } from '../../../../services/utils';

const CartHeader = () => {
  const [currentLang] = useCurrentLang();
  const { sheet } = useSelector(s => s.auth);
  const { showSavedOrder } = useSelector(s => s.cart);
  const { isFetching: isCurrentCartFetching } = useCurrentCartItems();
  const cartLocale = locale.sidebar.cart;
  const { mutate: removeAllItems, isLoading } = useRemoveAllCartItems();
  // const { mutate: saveOrder, isLoading: saveOrderLod } = useSaveOrder();
  const [currentBalance, setCurrentBalance] = useState(null);
  const [getBalanceLod, setGetBalanceLod] = useState(false);

  const handelShowCurrentBalance = async () => {
    const body = new FormData();
    body.append('point_of_sale_order_sheet_id', sheet);
    setGetBalanceLod(true);
    try {
      const { data } = await axiosInstance().post('/checkLockerBalance', body);
      if (data?.code === 200) {
        setCurrentBalance(data?.data?.amount);
        setTimeout(() => {
          setCurrentBalance(null);
        }, 1000 * 10);
      }
      console.log('handelShowCurrentBalance  data:', data);
    } catch (error) {
      console.log('handelShowCurrentBalance  error:', error);
    }
    setGetBalanceLod(false);
  };
  return (
    <div className={classes.CartHeader}>
      {showSavedOrder ? (
        <p style={{ whiteSpace: 'nowrap', color: 'red', fontWeight: 600 }}>
          طلب جاري
        </p>
      ) : (
        <Popconfirm
          title="هل انت متاكد من مسح كل المنتجات"
          okText="نعم"
          cancelText="لا"
          onConfirm={removeAllItems}
        >
          <Button
            type="link"
            icon={<img src={TrashPng} alt="delete" width={24} />}
            isLoading={isLoading}
          />
        </Popconfirm>
      )}
      <Flex gap={10}>
        <Spinner
          style={{
            opacity: isCurrentCartFetching ? '1' : '0',
          }}
        />
        <h3 className={classes.CartHeader__Title}>
          {cartLocale.title[currentLang]}
        </h3>
      </Flex>
      <ButtonAnt
        onClick={handelShowCurrentBalance}
        loading={getBalanceLod}
        // className={classes.CartHeader__SaveBtn}
        size="large"
        disabled={currentBalance}
        style={currentBalance && { color: '#fff', backgroundColor: '#12b76a' }}
        type="primary"
      >
        {currentBalance
          ? `جم ${currencyFormat(currentBalance)}`
          : ' الرصيد الحالي'}
      </ButtonAnt>
      {/* <Button
        onClick={saveOrder}
        isLoading={saveOrderLod}
        className={classes.CartHeader__SaveBtn}
      >
        حفظ
      </Button> */}
    </div>
  );
};

export default CartHeader;
