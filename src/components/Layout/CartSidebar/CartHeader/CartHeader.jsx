import React from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { useRemoveAllCartItems } from '../../../../hooks/query/useCart';
import Flex from '../../../Flex/Flex';

import Spinner from '../../../Spinner/Spinner';
import { Popconfirm } from 'antd';
import Button from '../../../Button/Button';
import { useSaveOrder } from '../../../../hooks/query/useOrders';
import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';

const CartHeader = () => {
  const [currentLang] = useCurrentLang();
  const { isFetching: isCurrentCartFetching } = useCurrentCartItems();
  const cartLocale = locale.sidebar.cart;
  const { mutate: removeAllItems, isLoading } = useRemoveAllCartItems();
  const { mutate: saveOrder, isLoading: saveOrderLod } = useSaveOrder();
  return (
    <div className={classes.CartHeader}>
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
      <Button
        onClick={saveOrder}
        isLoading={saveOrderLod}
        className={classes.CartHeader__SaveBtn}
      >
        حفظ
      </Button>
    </div>
  );
};

export default CartHeader;
