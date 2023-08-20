import React from 'react';
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
} from '../../../../hooks/query/useCart';
// import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';
import { useSelector } from 'react-redux';
import { useGetSavedOrder } from '../../../../hooks/query/useOrders';

const CartItems = ({ className, readOnlyData, isFetching }) => {
  const removeItem = useRemoveCartItem();
  const removeSavedItem = useRemoveSavedItem();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();
  const changeQuantity = useChangeQuantity();

  // const { data, isLoading: cartIsLoading } = useCurrentCartItems();
  const showSavedOrder = useSelector(state => state.cart.showSavedOrder);

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
      {showSavedOrder ? (
        <ItemAccordion
          // readOnly
          savedOrder
          items={readOnlyData ? readOnlyData : savedOrderItems?.items}
          loading={savedOrderItemsLod}
          onDelete={(itemId, password) =>
            removeSavedItem.mutate({ itemId, password })
          }
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
          onIncrement={data => increaseQuantity.mutate(data)}
          onDecrement={data => decreaseQuantity.mutate(data)}
          onChangeCount={(itemId, qty) =>
            changeQuantity.mutate({ itemId, qty })
          }
          onDelete={data => removeItem.mutate(data)}
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
