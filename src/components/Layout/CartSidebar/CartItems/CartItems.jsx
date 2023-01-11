import React from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';
// import ItemAccordion from '../../../ItemAccordion/ItemAccordion copy';
import {
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveCartItem,
} from '../../../../hooks/query/useCart';
import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';
import { useSelector } from 'react-redux';

const CartItems = ({
  className,
  readOnlyData,
  isFetching,
  // data: currentCartItems,
  // cartIsloading: cartIsLoading,
}) => {
  const removeItem = useRemoveCartItem();
  const showSavedOrder = useSelector(state => state.cart.showSavedOrder);
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  const { data: currentCartItems, isLoading: cartIsLoading } =
    useCurrentCartItems();
  console.log('CartItems  currentCartItems>>>>>', currentCartItems);

  return (
    <div
      className={classNames(classes.CartItems, className, {
        [classes.center]: currentCartItems?.length === 0 || !currentCartItems,
      })}
    >
      {readOnlyData || showSavedOrder ? (
        <ItemAccordion
          readOnly
          items={readOnlyData ? readOnlyData : currentCartItems?.items}
        />
      ) : (
        <ItemAccordion
          loading={cartIsLoading || isFetching}
          onIncrement={data => increaseQuantity.mutate(data)}
          onDecrement={data => decreaseQuantity.mutate(data)}
          onDelete={data => removeItem.mutate(data)}
          items={currentCartItems?.items}
          // actionsLoading={[
          //   removeItem.isLoading,
          //   increaseQuantity.isLoading,
          //   decreaseQuantity.isLoading,
          // ]}
          actionsLoading={{
            remove: removeItem.isLoading,
            increase: increaseQuantity.isLoading,
            decrease: decreaseQuantity.isLoading,
          }}
        />
      )}
    </div>
  );
};

export default CartItems;
