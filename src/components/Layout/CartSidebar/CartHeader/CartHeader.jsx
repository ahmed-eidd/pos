import React, { useState } from 'react';
import classes from './CartHeader.module.scss';
import TrashPng from '../../../../assets/trash.png';
import { locale } from '../../../../locale';
import { useCurrentLang } from '../../../../hooks/useCurrentLang';
import { useRemoveAllCartItems } from '../../../../hooks/query/useCart';
import Flex from '../../../Flex/Flex';
import Spinner from '../../../Spinner/Spinner';
import { Popconfirm, Button as ButtonAnt, Space } from 'antd';
import Button from '../../../Button/Button';
import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../../service/api';
import { currencyFormat } from '../../../../services/utils';
import DataLowestModal from './DataLowestModal';
import BalanceModal from './BalanceModal';

const CartHeader = () => {
  const [currentLang] = useCurrentLang();
  const [productDataModal, setProductDataModal] = useState(false);
  const { sheet } = useSelector((s) => s.auth);
  const showSavedOrder = useSelector((s) => s?.cart?.showSavedOrder);
  const { isFetching: isCurrentCartFetching } = useCurrentCartItems();
  const cartLocale = locale.sidebar.cart;
  const { mutate: removeAllItems, isLoading } = useRemoveAllCartItems();
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);

  const handleShowProductData = () => {
    setProductDataModal(true);
  };

  return (
    <div className={classes.CartHeader}>
      <BalanceModal open={balanceModalOpen} setOpen={setBalanceModalOpen} />
      <DataLowestModal open={productDataModal} setOpen={setProductDataModal} />
      {showSavedOrder ? (
        <p style={{ whiteSpace: 'nowrap', color: 'red', fontWeight: 600 }}>
          طلب جاري
        </p>
      ) : (
        <Popconfirm
          title='هل انت متاكد من مسح كل المنتجات'
          okText='نعم'
          cancelText='لا'
          onConfirm={removeAllItems}
        >
          <Button
            type='link'
            icon={<img src={TrashPng} alt='delete' width={24} />}
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
      <Space direction='vertical'>
        <ButtonAnt
          size='large'
          onClick={() => setBalanceModalOpen(true)}
          type='primary'
        >
          الرصيد الحالي
        </ButtonAnt>
        <ButtonAnt
          onClick={handleShowProductData}
          // loading={getBalanceLod}
          size='large'
          // disabled={!!currentBalance}
          style={{ color: '#fff', backgroundColor: '#12b76a' }}
          type='primary'
        >
          قائمة المنتجات
        </ButtonAnt>
      </Space>
    </div>
  );
};

export default CartHeader;
