import React from 'react';
import classes from './CartItems.module.scss';
import classNames from 'classnames';
import ItemAccordion from '../../../ItemAccordion/ItemAccordion';
import {
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveCartItem,
} from '../../../../hooks/query/useCart';
import { useCurrentCartItems } from '../../../../hooks/useCurrentCartItems';

const CartItems = ({ className, readOnlyData, isFetching }) => {
  // const { data, isLoading: cartIsloading } = useGetCart();
  const removeItem = useRemoveCartItem();
  const increaseQuantity = useIncreaseQuantity();
  const decreaseQuantity = useDecreaseQuantity();

  const { data: currentCartItems, isLoading: cartIsLoading } =
    useCurrentCartItems();
  return (
    <div
      className={classNames(classes.CartItems, className, {
        [classes.center]: currentCartItems?.length === 0 || !currentCartItems,
      })}
    >
      {readOnlyData ? (
        <ItemAccordion readOnly items={readOnlyData} />
      ) : (
        <ItemAccordion
          loading={cartIsLoading || isFetching}
          onIncrement={(data) => increaseQuantity.mutate(data)}
          onDecrement={(data) => decreaseQuantity.mutate(data)}
          onDelete={(data) => removeItem.mutate(data)}
          items={currentCartItems?.items}
          actionsLoading={[
            removeItem.isLoading,
            increaseQuantity.isLoading,
            decreaseQuantity.isLoading,
          ]}
        />
      )}
    </div>
  );
};

export default CartItems;
