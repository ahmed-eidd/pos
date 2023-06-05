import React, { useState } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import Text from '../../components/Text/Text';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import SingleSavedOrder from './SingleSavedOrder/SingleSavedOrder';
import classes from './SavedOrders.module.scss';
import { Modal, Pagination } from 'antd';
import Button from '../../components/Button/Button';
import { useGetOrders } from '../../hooks/query/useOrders';
import { orderStatus } from '../../constants/orderStatus';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CartIcon from '../../icons/SideMenuIcons/Cart/Cart';
import Spinner from '../../components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { setCurrentSavedOrderIdAction } from '../../store/cartSlice';

const SavedOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const [currentLang] = useCurrentLang();
  const setCurrentSavedOrderId = id =>
    dispatch(setCurrentSavedOrderIdAction(id));
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading } = useGetOrders(orderStatus.pending);
  const savedOrders = data?.orders;
  const pagination = data?.pagination;
  console.log('SavedOrders  pagination:', pagination);

  console.log('SavedOrders  savedOrders:', savedOrders);
  const savedOrderLocale = locale.savedOrders;
  const [savedOrderId, setSavedOrderId] = useState(null);

  const navigate = useNavigate();
  const onModalClose = () => {
    setModalOpen(false);
  };
  const onModalOk = () => {
    setCurrentSavedOrderId(savedOrderId);
    navigate('/categories');
  };

  const onSavedOrderClickHandler = id => {
    setModalOpen(true);
    setSavedOrderId(id);
  };

  return (
    <>
      <PageLayout title={savedOrderLocale.title[currentLang]}>
        <div className={classes.SavedOrders} style={{ direction: 'rtl' }}>
          {isLoading ? (
            <Spinner style={{ display: 'block' }} />
          ) : savedOrders?.length > 0 ? (
            <>
              <Text className={classes.SavedOrders__Title}>
                لديك {savedOrders?.length} طلبات جاريه
              </Text>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {savedOrders?.map(order => (
                  <SingleSavedOrder
                    key={order?.id}
                    order={order}
                    onClick={() => {
                      onSavedOrderClickHandler(order?.id);
                    }}
                  />
                ))}
              </div>
              <Pagination
                current={pagination?.current}
                total={pagination?.total}
                pageSize={pagination?.size}
                onChange={page => setSearchParams({ page })}
                hideOnSinglePage
              />
            </>
          ) : (
            <div
              className={classes.SavedOrders__NoItems}
              style={{ margin: '50px auto' }}
            >
              <CartIcon style={{ width: '50px', height: '50px' }} />
              <p>{locale.savedOrders.noItems[currentLang]}</p>
            </div>
          )}
        </div>
      </PageLayout>

      <Modal
        onCancel={onModalClose}
        destroyOnClose
        footer={null}
        closable={false}
        visible={modalOpen}
        zIndex={10000}
      >
        <p className={classes.SavedOrders__Modal__Title}>
          {savedOrderLocale.modalTitle[currentLang]}
        </p>
        <p className={classes.SavedOrders__Modal__Label}>
          {savedOrderLocale.modalLabel[currentLang]}
        </p>
        <div className={classes.SavedOrders__Modal__Actions}>
          <Button onClick={onModalClose} type="default" fullwidth>
            {savedOrderLocale.modalClose[currentLang]}
          </Button>
          <Button onClick={onModalOk} fullwidth>
            {savedOrderLocale.modalOk[currentLang]}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SavedOrders;
