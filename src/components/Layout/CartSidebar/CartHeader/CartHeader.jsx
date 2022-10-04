import React from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import {
  useGetCart,
  useRemoveAllCartItems,
} from '../../../../hooks/query/useCart';
import Flex from '../../../Flex/Flex';

import Spinner from '../../../Spinner/Spinner';
import { Popconfirm } from 'antd';
import Button from '../../../Button/Button';
import { useSaveOrder } from '../../../../hooks/query/useOrders';

const CartHeader = ({ onDeleteAll }) => {
  const [currentLang] = useCurrentLang();
  const { isFetching } = useGetCart();
  const cartLocale = locale.sidebar.cart;
  const { mutate: removeAllItems } = useRemoveAllCartItems();
  const { mutate: saveOrder } = useSaveOrder();
  return (
    <div className={classes.CartHeader}>
      <Popconfirm
        title='هل انت متاكد من مسح كل المنتجات'
        okText='نعم'
        cancelText='لا'
        onConfirm={removeAllItems}
      >
        <img
          className={classes.CartHeader__TrashImg}
          src={TrashPng}
          alt='delete'
        />
      </Popconfirm>
      <Flex gap={10}>
        <Spinner style={{ opacity: isFetching ? '1' : '0' }} />
        <h3 className={classes.CartHeader__Title}>
          {cartLocale.title[currentLang]}
        </h3>
      </Flex>
      <Button onClick={saveOrder} className={classes.CartHeader__SaveBtn}>
        حفظ
      </Button>
    </div>
  );
};

export default CartHeader;
