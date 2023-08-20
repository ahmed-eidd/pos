import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout/PageLayout';
import Text from '../../components/Text/Text';
import { useCurrentLang } from '../../hooks/useCurrentLang';
import { locale } from '../../locale';
import SingleSavedOrder from './SingleSavedOrder/SingleSavedOrder';
import classes from './SavedOrders.module.scss';
import { Modal } from 'antd';
import { useGetOrders } from '../../hooks/query/useOrders';
import { orderStatus } from '../../constants/orderStatus';
import CartIcon from '../../icons/SideMenuIcons/Cart/Cart';
import Spinner from '../../components/Spinner/Spinner';
import ModalShowCanceldOrder from '../../components/ModalShowCanceldOrder';
import SelectTable from '../Checkout/SelectTable';

const SavedOrders = () => {
  const [currentLang] = useCurrentLang();
  const [cancelOrderItems, setCancelOrderItems] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);

  const { data, isLoading } = useGetOrders(orderStatus.pending);
  const savedOrders = data?.orders;
  const savedOrderLocale = locale.savedOrders;

  useEffect(() => {
    if (!selectedTable) return setCurrentOrder(null);

    const order = savedOrders?.find(order => {
      return (
        order?.point_of_sale_place_id === selectedTable?.placeId &&
        order?.point_of_sale_table_id === selectedTable?.tableId
      );
    });
    if (!order) return console.log('💥 Order not found in savedOrders');
    setCurrentOrder(order);
  }, [selectedTable, savedOrders]);

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
              <SelectTable
                onHold
                selectedTable={selectedTable}
                setSelectedTable={setSelectedTable}
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
        visible={!!currentOrder}
        onCancel={() => setSelectedTable(null)}
        destroyOnClose
        footer={null}
      >
        <SingleSavedOrder
          key={currentOrder?.id}
          order={currentOrder}
          setCancelOrderItems={setCancelOrderItems}
          closeModal={() => setSelectedTable(null)}
        />
      </Modal>

      <ModalShowCanceldOrder
        open={!!cancelOrderItems}
        onCancel={() => {
          setCancelOrderItems(null);
        }}
        orderItems={cancelOrderItems}
      />
    </>
  );
};

export default SavedOrders;
