import React, { useState } from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';
// import ItemAccordion from '../../../ItemAccordion/ItemAccordion copy';
import {
  useChangeQuantity,
  useDecreaseQuantity,
  useGetCart,
  useIncreaseQuantity,
  useRemoveCartItem,
  useRemoveSavedItem,
  useTransferItem,
} from '../../../../hooks/query/useCart';
// import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';
import { useSelector } from 'react-redux';
import { useGetSavedOrder } from '../../../../hooks/query/useOrders';
import ModalSelectTable from '../../../ModalSelectTable';
import { message } from 'antd';

const CartItems = ({ className, readOnlyData, isFetching }) => {
  const removeItem = useRemoveCartItem();
  const removeSavedItem = useRemoveSavedItem();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const changeQuantity = useChangeQuantity();
  const transferItem = useTransferItem();

  // state
  const [selectedTableOpen, setSelectTableOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  console.log({ selectedTable, selectedTableOpen, selectedItem });
  // const { data, isLoading: cartIsLoading } = useCurrentCartItems();
  const showSavedOrder = useSelector((state) => state.cart.showSavedOrder);

  const { data: cartItems, isLoading: cartItemsLod } = useGetCart();
  // console.log('CartItems  cartItems:', cartItems);
  const { data: savedOrderItems, isLoading: savedOrderItemsLod } =
    useGetSavedOrder();

  return (
    <div
      className={classNames(classes.CartItems, className, {
        // [classes.center]: cartItems?.items?.length === 0 || !cartItems,
      })}
    >
      <ModalSelectTable
        selectedTableProps={{
          onlySelectedTableMode: true,
        }}
        open={selectedTableOpen}
        onCancel={() => setSelectTableOpen(false)}
        onSumbit={() => {
          console.log('here');
          transferItem.mutate(
            {
              orderItemId: selectedItem,
              toOrderId: selectedTable?.orderId,
            },
            {
              onSuccess: (res) => {
                if (res?.data?.validation?.length > 0) return;
                console.log({ res });
                message.success('تم نقل الطلب بنجاح');
                setSelectTableOpen(false);
              },
            },
          );
        }}
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
      />
      {showSavedOrder ? (
        <ItemAccordion
          // readOnly
          savedOrder
          onSwap={(itemId) => {
            setSelectTableOpen(true);
            setSelectedItem(itemId);
          }}
          items={readOnlyData ? readOnlyData : savedOrderItems?.items}
          loading={savedOrderItemsLod}
          onDelete={(itemId, password) => {
            console.log('onDelete  itemId, password:', itemId, password);
            // return {};
            removeSavedItem.mutate({ itemId, password });
          }}
          actionsLoading={{
            remove: removeSavedItem.isLoading,
          }}
        />
      ) : readOnlyData ? (
        <ItemAccordion
          readOnly
          items={readOnlyData ? readOnlyData : cartItems?.items}
        />
      ) : (
        <ItemAccordion
          loading={cartItemsLod || isFetching}
          onIncrement={(data) => increaseQuantity.mutate(data)}
          onDecrement={(data) => decreaseQuantity.mutate(data)}
          onChangeCount={(itemId, qty) =>
            changeQuantity.mutate({ itemId, qty })
          }
          onDelete={(data) => removeItem.mutate(data)}
          items={cartItems?.items}
          actionsLoading={{
            remove: removeItem.isLoading,
            increase: increaseQuantity.isLoading,
            decrease: decreaseQuantity.isLoading,
            change: changeQuantity.isLoading,
          }}
        />
      )}
    </div>
  );
};

export default CartItems;
